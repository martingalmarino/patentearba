import type { Metadata } from "next";
import {
  AUTHOR_NAME,
  CONTACT_EMAIL,
  GOOGLE_PARTNER_DATA_URL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata este sitio los datos, las cookies y la publicidad de Google AdSense.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[68ch] px-4 py-14">
      <h1 className="title title-page">
        <span className="block">Política de</span>
        <span className="title-accent">privacidad.</span>
      </h1>
      <p className="mt-3 text-sm text-muted">Última actualización: 3 de septiembre de 2026.</p>
      <p className="mt-5 leading-relaxed text-ink-soft">
        {SITE_NAME} es un sitio informativo mantenido por {AUTHOR_NAME}. El cálculo
        de la patente se hace en tu navegador. No enviamos la valuación, el año ni
        el resultado a un servidor propio.
      </p>

      <h2 className="mt-10 heading">Datos que no guardamos</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        No pedimos cuenta, no hay registro y no hay base de datos de vehículos. Lo
        que cargás en el formulario queda en la sesión de la página. Si recargás,
        se borra. El aviso de privacidad se recuerda en el almacenamiento local de
        tu navegador para no mostrarlo otra vez.
      </p>

      <h2 className="mt-10 heading">Contacto</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Si nos escribís a {CONTACT_EMAIL}, recibimos el nombre, el correo y el
        mensaje que elijas enviar por tu cliente de correo. Esa información se usa
        solo para responder. No la vendemos ni la usamos para publicidad propia.
      </p>

      <h2 className="mt-10 heading">Google AdSense y cookies</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Este sitio usa Google AdSense para mostrar anuncios. Terceros, incluido
        Google, pueden colocar y leer cookies en tu navegador, usar balizas web o
        recopilar la dirección IP y otros identificadores como resultado de la
        publicidad. Google puede usar esos datos para personalizar anuncios según
        las políticas vigentes.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Para saber cómo Google trata los datos cuando visita sitios de sus socios,
        leé{" "}
        <a
          href={GOOGLE_PARTNER_DATA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          Cómo usa Google los datos cuando usás sitios o aplicaciones de nuestros socios
        </a>
        .
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Podés controlar cookies desde la configuración del navegador y, cuando
        Google lo ofrezca, desde las preferencias de anuncios. Si bloqueás cookies,
        algunas funciones de publicidad pueden dejar de estar disponibles. El
        contenido editorial y la calculadora siguen funcionando.
      </p>

      <h2 className="mt-10 heading">Datos de menores</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        El sitio no está dirigido a menores de 13 años y no busca recopilar datos
        de menores a propósito.
      </p>

      <h2 className="mt-10 heading">Cambios</h2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Si cambia la forma de recolectar datos o los servicios de publicidad, vamos a
        actualizar esta página y la fecha de arriba.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Consultas de privacidad:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:text-accent-hover">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </article>
  );
}
