import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribile a Martín Galmarino por errores de la calculadora, consultas o problemas con el sitio.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-[68ch] px-4 py-14">
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
