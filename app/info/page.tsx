import type { Metadata } from "next";
import { Stellina } from "@/components/pixel/doodles";

export const metadata: Metadata = {
  title: "Info, regole e privacy",
  description:
    "Cos'è il Gayometro, perché è satira, come segnalare contenuti e come trattiamo i (pochissimi) dati.",
};

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

function Sezione({
  titolo,
  children,
}: {
  titolo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card flex flex-col gap-3 px-6 py-6">
      <h2 className="flex items-center gap-2 font-display text-2xl font-black">
        <Stellina className="w-4 text-rust" />
        {titolo}
      </h2>
      {children}
    </section>
  );
}

export default function Info() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-4xl font-black tracking-tight">
          Cos&rsquo;è il Gayometro
        </h1>
        <p className="text-lg">
          Un sito satirico che misura, con falsissima precisione scientifica,
          quanto è gay un comportamento, un oggetto o un&rsquo;abitudine.
        </p>
      </header>

      <Sezione titolo="La battuta, spiegata">
        <p>
          Il bersaglio comico non sono mai le persone omosessuali: è
          l&rsquo;assurdità stessa di misurare la mascolinità delle cose, e
          l&rsquo;ansia da maschio alfa di chi gioca. Le percentuali sono
          verdetti comici arbitrari dentro la finzione del sito, non opinioni
          reali su niente e nessuno. Se la lancetta dice che la birra al limone
          è gay al 74%, l&rsquo;unica cosa misurata davvero è quanto sia
          ridicolo misurarla.
        </p>
      </Sezione>

      <Sezione titolo="Le regole">
        <ul className="flex flex-col gap-2">
          <li>
            <strong>Niente persone reali.</strong> Frasi e commenti con nomi o
            riferimenti a persone identificabili vengono rifiutati. I marchi e
            i nomi non di persona (la Fiat Panda, il Gin Tonic) sono benvenuti.
          </li>
          <li>
            <strong>Niente cattiveria.</strong> Slur, insulti, attacchi a
            gruppi di persone, violenza e contenuti espliciti vengono rifiutati
            da un doppio filtro, automatico e con moderazione manuale.
          </li>
          <li>
            <strong>È autoironia collettiva.</strong> Se una battuta deride
            qualcuno invece di far ridere tutti, non appartiene a questo sito.
          </li>
        </ul>
      </Sezione>

      <Sezione titolo="Segnalazioni e rimozioni">
        <p>
          Vedi un contenuto che non rispetta le regole, o una frase che ti
          riguarda e vuoi far rimuovere? Scrivi e verrà gestita in fretta:
          {" "}
          {EMAIL ? (
            <a
              href={`mailto:${EMAIL}`}
              className="font-bold underline underline-offset-4"
            >
              {EMAIL}
            </a>
          ) : (
            <em>indirizzo di contatto in attivazione, torna a breve.</em>
          )}
        </p>
      </Sezione>

      <Sezione titolo="Privacy, in breve e per davvero">
        <ul className="flex flex-col gap-2">
          <li>Nessun account, nessuna registrazione, nessun dato anagrafico.</li>
          <li>
            Nessun cookie di profilazione: esiste un solo cookie tecnico
            anonimo (un identificatore casuale) che serve al sistema antispam.
          </li>
          <li>
            Le statistiche di visita usano Vercel Analytics, senza cookie e
            senza tracciamento individuale.
          </li>
          <li>
            Per l&rsquo;antispam conserviamo un hash irreversibile
            dell&rsquo;indirizzo IP, mai l&rsquo;IP in chiaro, cancellato
            automaticamente entro 30 giorni.
          </li>
          <li>
            Le frasi inviate e i commenti pubblicati sono pubblici per natura
            del sito. Le frasi rifiutate non vengono salvate in chiaro.
          </li>
        </ul>
      </Sezione>

      <Sezione titolo="Trasparenza tecnica">
        <p>
          I verdetti e le motivazioni sono generati da un modello di
          intelligenza artificiale istruito al registro comico del sito, con
          regole di sicurezza non negoziabili. Sono finzione umoristica: non
          descrivono persone e non esprimono giudizi reali.
        </p>
      </Sezione>
    </div>
  );
}
