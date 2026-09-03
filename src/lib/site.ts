export const SITE_NAME = "Patente PBA";
export const SITE_TAGLINE = "Calculadora independiente del impuesto automotor";
export const AUTHOR_NAME = "Martín Galmarino";
export const CONTACT_EMAIL = "m.galmarino@gmail.com";
export const PUBLISHER_ID = "ca-pub-6771833588582297";
export const ARBA_URL = "https://www.arba.gob.ar";
export const GOOGLE_PARTNER_DATA_URL =
  "https://policies.google.com/technologies/partner-sites";
export const YEAR = 2026;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.patentearba.com";

export const navItems = [
  { href: "/", label: "Calculadora" },
  { href: "/modelos/", label: "Modelos" },
  { href: "/guia/", label: "Guías" },
  { href: "/acerca/", label: "Acerca" },
  { href: "/contacto/", label: "Contacto" },
] as const;

export const footerLegal = [
  { href: "/privacidad/", label: "Privacidad" },
  { href: "/aviso-legal/", label: "Aviso legal" },
] as const;

export const otherCalculators = [
  {
    href: "https://www.calculadorapatentes.ar/",
    label: "Calculadora de Patentes",
  },
  {
    href: "https://www.calculadoralaboral.com.ar/",
    label: "Calculadora de Indemnización",
  },
] as const;
