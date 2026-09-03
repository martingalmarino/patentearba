import type { Metadata } from "next";
import { AUTHOR_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Límites de la estimación, fuentes y responsabilidad sobre el impuesto automotor.",
};

export default function LegalPage() {
  return (
    <article className="mx-auto max-w-[68ch] px-4 py-14">
      <h1 className="title title-page">Aviso legal</h1>
      <p className="mt-5 leading-relaxed text-ink-soft">
        {SITE_NAME} publica una estimación del impuesto automotor de la Provincia de
        Buenos Aires. No es un organismo público, no emite liquidaciones y no
        sustituye la boleta de ARBA.
      </p>
      <h2 className="mt-10 heading">Naturaleza de la información</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Los tramos, alícuotas y el factor de antigüedad se documentan en el propio
        cálculo para que puedas auditarlos. El factor de antigüedad (5% por año
        desde 2026, con un mínimo del 30%) es un atajo de esta herramienta cuando
        no conocés la valuación fiscal. No es el método de valuación de DNRPA ni
        de ARBA.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        El ahorro por pago anual que se muestra es ilustrativo. Los beneficios
        vigentes, las fechas y los porcentajes los define ARBA cada período.
      </p>
      <h2 className="mt-10 heading">Fuentes</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Para información oficial consultá{" "}
        <a
          href="https://www.arba.gob.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          arba.gob.ar
        </a>{" "}
        y las valuaciones de{" "}
        <a
          href="https://www.dnrpa.gov.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          DNRPA
        </a>
        . Si hay contradicción, prevalece el acto administrativo o la boleta.
      </p>
      <h2 className="mt-10 heading">Responsabilidad</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        {AUTHOR_NAME} no se hace responsable por pagos, recargos, transferencias o
        decisiones tomadas solo con esta estimación. El contenido es informativo y
        no constituye asesoramiento legal, contable ni fiscal.
      </p>
      <h2 className="mt-10 heading">Marcas</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        ARBA, DNRPA y Provincia de Buenos Aires son denominaciones de sus
        titulares. Se usan para describir el impuesto al que se refiere la
        calculadora, no para sugerir respaldo, licencia ni asociación.
      </p>
    </article>
  );
}
