import type { Metadata } from "next";
import { AUTHOR_NAME, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acerca de este sitio",
  description:
    "Quién mantiene la calculadora de patente, por qué existe y por qué no es un sitio oficial de ARBA.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `Acerca de ${SITE_NAME}`,
  url: `${SITE_URL}/acerca/`,
  mainEntity: {
    "@type": "Person",
    name: AUTHOR_NAME,
    email: CONTACT_EMAIL,
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[68ch] px-4 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="title title-page">
        <span className="block">Acerca de</span>
        <span className="title-accent">{SITE_NAME}.</span>
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        Esta calculadora es un proyecto independiente de {AUTHOR_NAME}. No pertenece
        a ARBA, a la Provincia de Buenos Aires ni a ningún organismo público.
      </p>
      <h2 className="mt-10 heading">Para qué existe</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        La boleta del impuesto automotor llega con un número ya liquidado, pero mucha
        gente quiere anticipar el monto con la valuación fiscal. Armé esta herramienta
        para aplicar la escala progresiva de forma transparente: ves el tramo, la
        base, la alícuota y el excedente.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        No cobro por calcular. El sitio puede mostrar publicidad de Google AdSense
        para cubrir el hosting. Eso no cambia el resultado ni crea una relación con
        ARBA.
      </p>
      <h2 className="mt-10 heading">Quién lo mantiene</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        {AUTHOR_NAME}. Si encontrás un error en la fórmula, un tramo desactualizado o
        un enlace roto, escribime a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:text-accent-hover">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <h2 className="mt-10 heading">Qué no es</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        No es una liquidación oficial, no emite boletas, no recibe pagos y no
        representa a la Agencia de Recaudación de la Provincia de Buenos Aires. Para
        trámites, deudas y planes de pago, usá{" "}
        <a
          href="https://www.arba.gob.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          arba.gob.ar
        </a>
        .
      </p>
    </article>
  );
}
