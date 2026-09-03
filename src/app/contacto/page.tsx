import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacto del simulador de patente ARBA",
  description:
    "Contactá al equipo de Patente PBA por errores de la calculadora, consultas técnicas o problemas con el sitio del impuesto automotor.",
  path: "/contacto/",
  keywords: ["contacto patente ARBA", "soporte calculadora patente", SITE_NAME],
});

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto",
  url: `${SITE_URL}/contacto/`,
  description:
    "Canal de contacto para correcciones y consultas sobre la estimación de patente.",
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    email: CONTACT_EMAIL,
    url: SITE_URL,
  },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-[68ch] px-4 py-14">
      <JsonLd data={contactLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto/" },
        ])}
      />
      <h1 className="title title-page">Contacto</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        Para correcciones, dudas sobre la estimación o problemas técnicos.
        No puedo tramitar deudas, planes de pago ni transferencias: eso se hace
        en ARBA.
      </p>
      <p className="mt-4 text-sm">
        Correo directo:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:text-accent-hover">
          {CONTACT_EMAIL}
        </a>
      </p>
      <ContactForm />
    </article>
  );
}
