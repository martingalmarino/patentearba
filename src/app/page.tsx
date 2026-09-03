import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Calculator } from "@/components/Calculator";
import { PopularModelPills } from "@/components/PopularModelPills";
import { guides } from "@/lib/guides";
import { SITE_NAME } from "@/lib/site";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  JsonLd,
  buildPageMetadata,
  faqPageJsonLd,
  webApplicationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "simulador patente ARBA 2026",
    "calculadora patente PBA",
    "impuesto automotor Buenos Aires",
    "patente auto ARBA",
    "calcular patente 2026",
  ],
});

const faqItems = [
  {
    question: `${SITE_NAME} es oficial?`,
    answer:
      "No. Es un sitio independiente. ARBA no respalda ni audita esta estimación.",
  },
  {
    question: "Qué número cargo?",
    answer:
      "La valuación fiscal. Si no la tenés, hay una estimación por antigüedad, menos precisa.",
  },
  {
    question: "Puedo pagar acá?",
    answer:
      "No. El pago se hace en ARBA o en recaudadores habilitados. Acá solo estimás el monto.",
  },
  {
    question: "Sirve para motos?",
    answer:
      "Sí. Las motocicletas usan la misma escala de tramos. Cambiá el tipo de vehículo y cargá la valuación fiscal de la moto.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={webApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(faqItems)} />

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-4 pb-16 pt-10 lg:grid-cols-2 lg:gap-16 lg:pt-14">
        <div className="max-w-xl pt-2">
          <h1 className="title">
            <span className="block">Calculá la patente</span>
            <span className="title-accent">de tu auto en Buenos Aires.</span>
          </h1>
          <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-muted md:text-lg">
            Estimación independiente con la escala progresiva 2026. No es un sitio oficial.
          </p>
          <div className="mt-6">
            <Link href="/guia/como-se-calcula/" className="cta">
              Cómo se calcula
              <ArrowRight size={14} weight="bold" />
            </Link>
            <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              {["Escala 2026", "Sin registro", "Estimación gratuita"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft"
                  >
                    <CheckCircle
                      size={16}
                      weight="regular"
                      className="shrink-0 text-[#0f766e]"
                    />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <PopularModelPills />
          </div>
        </div>
        <Calculator />
      </section>

      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="title title-page max-w-[16ch]">
            <span className="block">Guías para</span>
            <span className="title-accent">entender la boleta.</span>
          </h2>
          <p className="mt-3 max-w-[60ch] text-muted">
            Textos propios sobre valuación, pago, motos y vencimientos. Pensados para complementar la calculadora, no para reemplazar a ARBA.
          </p>
          <ul className="mt-10 divide-y border-y border-line">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guia/${guide.slug}/`}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <span>
                    <span className="block font-medium text-foreground group-hover:text-accent">
                      {guide.title}
                    </span>
                    <span className="mt-1 block max-w-[62ch] text-sm text-muted">
                      {guide.description}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-muted group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 pb-16">
        <h2 className="heading">
          Preguntas <span className="text-accent">cortas.</span>
        </h2>
        <dl className="mt-8 max-w-3xl divide-y border-y border-line">
          {faqItems.slice(0, 3).map((item) => (
            <div key={item.question} className="py-5">
              <dt className="font-medium">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
