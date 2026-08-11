/*
  Il misuratore: gauge a lancetta in pixel art 8 bit, elemento firma del sito.
  Arco di blocchi quadrati su griglia, lancetta che ruota da 0 a 100.
  La zona alta dell'arco usa il rust, come da design system.
*/

const CX = 32;
const CY = 34;
const RADIUS = 26;
const BLOCKS = 13;

/* Blocchi dell'arco, agganciati a una griglia da 2 unita' per il look 8 bit */
const ARC = Array.from({ length: BLOCKS }, (_, i) => {
  const angle = Math.PI - (i * Math.PI) / (BLOCKS - 1);
  return {
    x: Math.round((CX + RADIUS * Math.cos(angle)) / 2) * 2,
    y: Math.round((CY - RADIUS * Math.sin(angle)) / 2) * 2,
    high: i >= 9,
  };
});

export default function Gauge({
  percent,
  smooth = true,
  className,
}: {
  percent: number;
  smooth?: boolean;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const angle = -90 + clamped * 1.8;

  return (
    <svg
      viewBox="0 0 64 44"
      role="img"
      aria-label={`Lancetta del misuratore al ${Math.round(clamped)} per cento`}
      className={className}
      shapeRendering="crispEdges"
    >
      {ARC.map((b, i) => (
        <g key={i}>
          <rect x={b.x - 3} y={b.y - 3} width={6} height={6} fill="var(--color-ink)" />
          <rect
            x={b.x - 2}
            y={b.y - 2}
            width={4}
            height={4}
            fill={b.high ? "var(--color-rust)" : "var(--color-lime)"}
          />
        </g>
      ))}

      {/* Lancetta: colonna di pixel che ruota attorno al perno */}
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: "32px 34px",
        }}
        className={
          smooth
            ? "transition-transform duration-700 ease-out motion-reduce:transition-none"
            : undefined
        }
      >
        <rect x={30} y={12} width={4} height={4} fill="var(--color-ink)" />
        <rect x={31} y={14} width={2} height={20} fill="var(--color-ink)" />
      </g>

      {/* Perno e linea di base */}
      <rect x={29} y={31} width={6} height={6} fill="var(--color-ink)" />
      <rect x={30} y={32} width={4} height={4} fill="var(--color-rust)" />
      <rect x={6} y={40} width={52} height={2} fill="var(--color-ink)" />
    </svg>
  );
}
