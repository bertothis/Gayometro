import GaugeDemo from "@/components/GaugeDemo";
import {
  Boccale,
  Fiamma,
  Profumo,
  Sigaretta,
  Stellina,
} from "@/components/pixel/doodles";

/*
  Home page. In questa fase mostra hero e misuratore: il form di
  valutazione arriva con la fase 4, insieme all'API /api/valuta.
*/
export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="grid items-center gap-10 sm:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <p className="pixel-label text-xs uppercase text-rust">
            Precisione certificata 73%
          </p>
          <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            Quanto è <em className="text-rust">gay</em>?
          </h1>
          <p className="max-w-prose text-lg">
            Scrivi un comportamento, un oggetto, un&rsquo;abitudine. Il
            Gayometro emette il verdetto: percentuale esatta, motivazione
            fulminante, zero possibilità di ricorso.
          </p>
          <div className="flex items-center gap-4 text-ink/80">
            <Sigaretta className="w-10" />
            <Boccale className="w-8" />
            <Profumo className="w-8" />
            <Fiamma className="w-7" />
            <Stellina className="w-5 text-rust" />
          </div>
        </div>
        <div className="card px-6 py-8">
          <GaugeDemo />
        </div>
      </section>

      <section className="card px-6 py-6">
        <h2 className="mb-2 font-display text-2xl font-black">
          Il misuratore si sta scaldando
        </h2>
        <p className="max-w-prose">
          Siamo in fase di taratura: gli ingegneri stanno calibrando la
          lancetta su campioni di birra al limone e sigarette slim. Il form di
          valutazione, la bacheca e il quiz arrivano nelle prossime fasi di
          sviluppo.
        </p>
      </section>
    </div>
  );
}
