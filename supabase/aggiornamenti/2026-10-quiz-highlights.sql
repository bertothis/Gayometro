-- Da eseguire UNA volta nel SQL Editor di Supabase sui progetti gia' creati
-- (i progetti nuovi ricevono la colonna direttamente da migration.sql).
-- Serve alle battute personalizzate del risultato del quiz. E' sicuro
-- rieseguirlo: non fa nulla se la colonna esiste gia'.
alter table quiz_sessions
  add column if not exists highlights text[] not null default '{}';
