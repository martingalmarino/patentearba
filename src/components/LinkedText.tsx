import { ReactNode } from "react";
import Link from "next/link";

const phrases: { phrase: string; slug: string }[] = [
  { phrase: "valuación fiscal", slug: "valuacion-fiscal" },
  { phrase: "escala progresiva", slug: "como-se-calcula" },
  { phrase: "tramos progresivos", slug: "como-se-calcula" },
  { phrase: "pago anual", slug: "descuentos" },
  { phrase: "débito automático", slug: "como-pagar" },
  { phrase: "motocicletas", slug: "patente-motos" },
  { phrase: "plan de pagos", slug: "vencimientos" },
  { phrase: "canales de pago", slug: "como-pagar" },
];

export function LinkedText({
  text,
  currentSlug,
  used,
}: {
  text: string;
  currentSlug: string;
  used: Set<string>;
}) {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let match: { phrase: string; slug: string; index: number } | null = null;
    for (const item of phrases) {
      if (item.slug === currentSlug || used.has(item.slug)) continue;
      const index = remaining.toLowerCase().indexOf(item.phrase);
      if (index === -1) continue;
      if (!match || index < match.index) {
        match = { ...item, index };
      }
    }

    if (!match) {
      nodes.push(remaining);
      break;
    }

    if (match.index > 0) {
      nodes.push(remaining.slice(0, match.index));
    }
    const actual = remaining.slice(match.index, match.index + match.phrase.length);
    nodes.push(
      <Link
        key={`${match.slug}-${key++}`}
        href={`/guia/${match.slug}/`}
        className="font-medium text-accent hover:text-accent-hover"
      >
        {actual}
      </Link>,
    );
    used.add(match.slug);
    remaining = remaining.slice(match.index + match.phrase.length);
  }

  return <>{nodes}</>;
}
