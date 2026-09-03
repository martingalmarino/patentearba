import Link from "next/link";
import { guides } from "@/lib/guides";

export default function GuidesIndexPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="title title-page">
        <span className="block">Guías del</span>
        <span className="title-accent">impuesto automotor.</span>
      </h1>
      <p className="mt-4 max-w-[62ch] text-muted">
        Explicaciones propias, con enlaces a ARBA y DNRPA. Sirven para usar la
        calculadora con el dato correcto y para entender la boleta.
      </p>
      <ul className="mt-10 grid gap-6">
        {guides.map((guide) => (
          <li key={guide.slug} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
            <Link href={`/guia/${guide.slug}/`} className="group">
              <h2 className="text-xl font-semibold group-hover:text-accent">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {guide.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
