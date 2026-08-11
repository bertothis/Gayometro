-- ============================================================
-- Gayometro: migration iniziale per Supabase (Postgres)
-- Da eseguire nella dashboard Supabase: SQL Editor > New query.
-- Prima di eseguirla, attiva l'estensione pg_cron da
-- Database > Extensions (serve per la pulizia automatica).
-- ============================================================

create table phrases (
  id uuid primary key default gen_random_uuid(),
  normalized text unique not null,
  original text not null,
  slug text unique not null,
  percent int not null check (percent between 0 and 100),
  verdict text not null,
  motivation text not null,
  flagged boolean not null default false,
  created_at timestamptz not null default now()
  -- v2: qui si aggiungera' una colonna "embedding vector" per la
  -- similarita' semantica, senza migrazioni dolorose sul resto
);

create table rejected_phrases (
  normalized_hash text primary key, -- SHA-256 della frase normalizzata, mai il testo in chiaro
  rejection_message text not null,
  created_at timestamptz not null default now()
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  phrase_id uuid not null references phrases(id) on delete cascade,
  nickname text not null,
  body text not null,
  stance text check (stance in ('confermo','contesto')),
  is_ai boolean not null default false,
  flagged boolean not null default false,
  created_at timestamptz not null default now()
);

create table quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  score int not null check (score between 0 and 100),
  band_title text not null,
  paid boolean not null default false,
  created_at timestamptz not null default now()
);

create table rate_limits (
  ip_hash text not null,
  client_id text not null default '',
  action text not null,
  window_start timestamptz not null,
  count int not null default 1,
  primary key (ip_hash, client_id, action, window_start)
);

-- Indici per bacheca (ordinamenti e thread) oltre agli unique gia' impliciti
create index phrases_created_at_idx on phrases (created_at desc);
create index phrases_percent_idx on phrases (percent);
create index comments_phrase_idx on comments (phrase_id, created_at);

-- ============================================================
-- Rate limiting su Postgres.
-- Incrementa il contatore della coppia (hash IP + client id) e quello
-- aggregato del solo IP (riga con client_id = ''), nella finestra oraria
-- corrente, e risponde se l'azione e' consentita. Con client_id vuoto
-- (cookie assente o cancellato) conta una sola volta sull'aggregato IP.
-- ============================================================
create or replace function check_rate_limit(
  p_ip_hash text,
  p_client_id text,
  p_action text,
  p_pair_limit int,
  p_ip_limit int
) returns boolean
language plpgsql
as $$
declare
  v_window timestamptz := date_trunc('hour', now());
  v_pair_count int;
  v_ip_count int;
begin
  if p_client_id <> '' then
    insert into rate_limits (ip_hash, client_id, action, window_start, count)
    values (p_ip_hash, p_client_id, p_action, v_window, 1)
    on conflict (ip_hash, client_id, action, window_start)
    do update set count = rate_limits.count + 1
    returning count into v_pair_count;
  end if;

  insert into rate_limits (ip_hash, client_id, action, window_start, count)
  values (p_ip_hash, '', p_action, v_window, 1)
  on conflict (ip_hash, client_id, action, window_start)
  do update set count = rate_limits.count + 1
  returning count into v_ip_count;

  if p_client_id = '' then
    v_pair_count := v_ip_count;
  end if;

  return v_pair_count <= p_pair_limit and v_ip_count <= p_ip_limit;
end;
$$;

-- ============================================================
-- Row Level Security: attiva su tutto, nessuna policy pubblica.
-- Il server usa la service role key, che bypassa RLS. Se l'anon key
-- finisse esposta, non potrebbe leggere ne' scrivere nulla.
-- ============================================================
alter table phrases enable row level security;
alter table rejected_phrases enable row level security;
alter table comments enable row level security;
alter table quiz_sessions enable row level security;
alter table rate_limits enable row level security;

revoke execute on function check_rate_limit(text, text, text, int, int) from anon, authenticated;

-- ============================================================
-- Pulizia automatica, coerente con l'informativa privacy della
-- pagina /info (hash IP conservati al massimo 30 giorni).
-- pg_cron va attivata dalla dashboard (Database > Extensions)
-- se non gia' disponibile.
-- ============================================================
create extension if not exists pg_cron;

select cron.schedule(
  'cleanup-rate-limits',
  '0 4 * * *',
  $$delete from rate_limits where window_start < now() - interval '30 days'$$
);
