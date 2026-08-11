/*
  Doodle 8 bit originali del design system: disegnati come griglie di
  rettangoli SVG, contorni spessi, massimo 3 colori per soggetto.
  Colori presi dai token del design system via CSS variables.
*/

type Px = readonly [x: number, y: number, w: number, h: number, fill: string];

const INK = "var(--color-ink)";
const LIME = "var(--color-lime)";
const RUST = "var(--color-rust)";
const SAGE = "var(--color-sage)";
const CREAM = "var(--color-card)";

function PixelArt({
  px,
  w,
  h,
  className,
}: {
  px: readonly Px[];
  w: number;
  h: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {px.map(([x, y, pw, ph, fill], i) => (
        <rect key={i} x={x} y={y} width={pw} height={ph} fill={fill} />
      ))}
    </svg>
  );
}

/* Stellina scintillante, un colore solo: eredita currentColor */
export function Stellina({ className }: { className?: string }) {
  const px: Px[] = [
    [4, 0, 1, 9, "currentColor"],
    [0, 4, 9, 1, "currentColor"],
    [3, 3, 3, 3, "currentColor"],
  ];
  return <PixelArt px={px} w={9} h={9} className={className} />;
}

export function Sigaretta({ className }: { className?: string }) {
  const px: Px[] = [
    [1, 2, 14, 4, INK],
    [2, 3, 1, 2, LIME],
    [3, 3, 8, 2, CREAM],
    [11, 3, 3, 2, RUST],
    [2, 0, 1, 1, SAGE],
    [0, 0, 1, 1, SAGE],
  ];
  return <PixelArt px={px} w={16} h={8} className={className} />;
}

export function Boccale({ className }: { className?: string }) {
  const px: Px[] = [
    [1, 3, 8, 10, INK],
    [2, 4, 6, 8, RUST],
    [1, 2, 8, 2, CREAM],
    [2, 1, 2, 1, CREAM],
    [6, 1, 2, 1, CREAM],
    [3, 7, 1, 1, CREAM],
    [5, 9, 1, 1, CREAM],
    [9, 5, 2, 1, INK],
    [10, 6, 1, 4, INK],
    [9, 10, 2, 1, INK],
  ];
  return <PixelArt px={px} w={12} h={14} className={className} />;
}

export function Profumo({ className }: { className?: string }) {
  const px: Px[] = [
    [2, 5, 8, 8, INK],
    [3, 6, 6, 6, SAGE],
    [5, 3, 2, 2, INK],
    [4, 1, 4, 2, RUST],
    [8, 1, 2, 1, INK],
    [10, 0, 1, 1, LIME],
    [11, 2, 1, 1, LIME],
    [4, 7, 1, 3, CREAM],
  ];
  return <PixelArt px={px} w={12} h={14} className={className} />;
}

export function Fiamma({ className }: { className?: string }) {
  const px: Px[] = [
    [4, 1, 2, 2, RUST],
    [3, 3, 4, 2, RUST],
    [2, 5, 6, 5, RUST],
    [3, 10, 4, 2, RUST],
    [4, 7, 2, 4, LIME],
  ];
  return <PixelArt px={px} w={10} h={14} className={className} />;
}
