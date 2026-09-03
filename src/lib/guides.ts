export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  sources: { label: string; href: string }[];
};

export const guides: Guide[] = [
  {
    slug: "como-se-calcula",
    title: "Cómo se calcula la patente en la Provincia de Buenos Aires",
    description:
      "Explicación de la escala progresiva del impuesto automotor de ARBA y cómo leer cada tramo.",
    updated: "2026-01-15",
    intro:
      "La patente no es un porcentaje único sobre el valor del auto. ARBA usa tramos: cuanto más alta es la valuación fiscal, más alta es la alícuota que se aplica sobre el excedente.",
    sections: [
      {
        heading: "Qué grava el impuesto",
        paragraphs: [
          "El impuesto automotor de la Provincia de Buenos Aires se calcula sobre la valuación fiscal del vehículo, no sobre el precio de mercado ni sobre lo que pagaste al comprarlo. Esa valuación la publica el Registro Nacional de la Propiedad Automotor y la usa ARBA para liquidar.",
          "Esta calculadora replica esa lógica de tramos para que puedas estimar el monto anual antes de recibir la boleta. El número final de ARBA puede diferir si hay descuentos, recargos, cambios de valuación o deudas previas.",
        ],
      },
      {
        heading: "Cómo leer un tramo",
        paragraphs: [
          "Cada tramo tiene un piso, una base fija y una alícuota. Si tu valuación cae en el primer tramo, se aplica el 1% sobre el valor total. En los tramos siguientes se suma una base y un porcentaje solo sobre lo que supera el piso.",
          "Ejemplo: una valuación de $20.000.000 cae en el tramo que va de $18.700.001 a $26.100.000. La base es $233.000 y se suma el 3% de $1.300.000 (el excedente sobre $18.700.000). El impuesto estimado queda en $272.000.",
          "Por eso dos autos con valuaciones parecidas pueden pagar montos distintos si cruzan el límite de un tramo. Conviene mirar el tramo, no solo el porcentaje más alto de la tabla.",
          "La tabla completa está en la calculadora. Los montos de piso ($14.100.000, $18.700.000, $26.100.000 y $53.900.000) y las bases ($141.000, $233.000, $455.000 y $1.567.000) son los que usa esta herramienta para 2026. Si ARBA publica una escala nueva, hay que actualizar esos números. El porcentaje de cada tramo (1%, 2%, 3%, 4% y 4,5%) se aplica solo sobre el excedente, salvo el primer tramo, que se aplica sobre el valor entero.",
        ],
      },
      {
        heading: "Cuotas y pago anual",
        paragraphs: [
          "ARBA suele permitir pagar el año completo o dividirlo en cuotas. En esta herramienta mostramos 10 cuotas iguales y un ahorro ilustrativo del 10% si se paga el año adelantado. Ese porcentaje no está garantizado: depende del calendario y de los beneficios que ARBA publique cada año.",
          "Si necesitás el desglose, usá el detalle del cálculo en la calculadora. Ahí aparece la base, la alícuota, el excedente y el impuesto anual estimado.",
        ],
      },
    ],
    sources: [
      { label: "ARBA", href: "https://www.arba.gob.ar" },
      { label: "DNRPA", href: "https://www.dnrpa.gov.ar" },
    ],
  },
  {
    slug: "valuacion-fiscal",
    title: "Dónde consultar la valuación fiscal de tu vehículo",
    description:
      "Pasos para encontrar la valuación fiscal que ARBA usa para liquidar la patente.",
    updated: "2026-01-15",
    intro:
      "Si cargás el precio de Mercado Libre o el valor de reventa, el resultado va a estar mal. La patente se calcula con la valuación fiscal del año.",
    sections: [
      {
        heading: "En la boleta",
        paragraphs: [
          "La vía más simple es la última boleta del impuesto automotor. Ahí figura la valuación fiscal del período. Si tenés la boleta 2026, ese es el número que tenés que cargar en la calculadora.",
        ],
      },
      {
        heading: "En ARBA y en Mi Argentina",
        paragraphs: [
          "En arba.gob.ar podés consultar tu cuenta con dominio y patente. También suele aparecer en la app Mi Argentina, en la sección de vehículos. Si el sitio pide Clave ARBA, es el mismo acceso que usás para otras deudas provinciales.",
          "La Dirección Nacional de los Registros Nacionales de la Propiedad Automotor publica las tablas de valuación. Es la fuente que después usa la provincia. Si hay diferencia entre lo que ves en DNRPA y lo que figura en la boleta, priorizá el valor de la liquidación de ARBA.",
          "La valuación cambia cada año. Un auto 2022 no tiene el mismo valor fiscal en 2025 y en 2026. Si usás un número viejo, el tramo puede ser otro y la diferencia no es menor: pasar de 1% a 2% o de 3% a 4% sobre el excedente mueve la cuota entera. Por eso la calculadora pide el año del vehículo aparte: sirve para el factor opcional, no reemplaza la tabla oficial.",
        ],
      },
      {
        heading: "Si no encontrás el número",
        paragraphs: [
          "La calculadora tiene una opción de estimar por antigüedad. Reduce un 5% por cada año desde 2026, con un piso del 30%. Sirve solo como orden de magnitud. No es el método de ARBA y no debería usarse para decidir un pago.",
          "Para transferir, regularizar o impugnar una liquidación, necesitás el valor oficial. Un estimado de mercado no alcanza.",
        ],
      },
    ],
    sources: [
      { label: "ARBA", href: "https://www.arba.gob.ar" },
      { label: "DNRPA", href: "https://www.dnrpa.gov.ar" },
    ],
  },
  {
    slug: "como-pagar",
    title: "Cómo pagar la patente del auto en Buenos Aires",
    description:
      "Canales habituales para pagar el impuesto automotor de ARBA y qué conviene revisar antes de pagar.",
    updated: "2026-01-15",
    intro:
      "Calcular el monto es el primer paso. El segundo es pagar en un canal que acredite a ARBA y conserve el comprobante. Los plazos de acreditación no son iguales en todos lados.",
    sections: [
      {
        heading: "Canales habituales",
        paragraphs: [
          "Home banking y Pago Mis Cuentas: es el medio más usado si ya tenés el impuesto adherido. Guardá el ticket digital.",
          "Débito automático: evita olvidos y a veces entra en beneficios de cumplimiento. Revisá el CBU y el monto antes del primer descuento.",
          "Rapipago, Pago Fácil y redes similares: sirven para pagar en efectivo con el código de barras o el VEP. Pedí el ticket y controlá que figure ARBA.",
          "Cajeros Link o Banelco: suelen aceptar el pago con débito. El comprobante del cajero es tu respaldo.",
          "Web de ARBA y oficinas: el sitio oficial permite pago con tarjeta en muchos casos. Las sucursales sirven si necesitás regularizar una deuda o un plan.",
        ],
      },
      {
        heading: "Antes de pagar",
        paragraphs: [
          "Confirmá dominio, período y que no haya una boleta más nueva. Un pago a un período viejo no cancela el actual.",
          "Si estás transferiendo el auto, pedí un informe de deudas. El escribano o el registro van a exigir que el impuesto esté al día.",
          "Esta web no procesa pagos. Solo estima el impuesto. El pago se hace en ARBA o en los recaudadores habilitados.",
        ],
      },
    ],
    sources: [{ label: "ARBA", href: "https://www.arba.gob.ar" }],
  },
  {
    slug: "descuentos",
    title: "Descuentos y beneficios de la patente en ARBA",
    description:
      "Qué descuentos suele ofrecer ARBA y por qué esta calculadora no los aplica en automático.",
    updated: "2026-01-15",
    intro:
      "El impuesto base no es siempre lo que termina pagando un contribuyente cumplidor. ARBA publica beneficios que cambian de un año a otro. Por eso la calculadora muestra el impuesto sin descuento, y un ahorro ilustrativo aparte.",
    sections: [
      {
        heading: "Beneficios que conviene revisar",
        paragraphs: [
          "Pago anual anticipado: en varios períodos ARBA ofreció alrededor del 10% si se cancela el año al inicio del calendario. El porcentaje exacto y la fecha de vencimiento salen en la resolución o en la web oficial de ese año.",
          "Buen cumplimiento: quienes no tienen deuda suelen acceder a una bonificación extra. No es automática si hay períodos impagos o un plan vigente.",
          "Débito automático: a veces suma una bonificación menor. Vale la pena adherirlo si el CBU está a tu nombre y el vehículo no se va a transferir en el corto plazo.",
        ],
      },
      {
        heading: "Qué no asume esta herramienta",
        paragraphs: [
          "No restamos recargos, intereses ni planes de pago. Tampoco restamos exenciones puntuales (discapacidad, cuerpo diplomático u otros regímenes) porque requieren acreditación en ARBA.",
          "Si tu boleta dice un número distinto al de la calculadora, primero compará la valuación fiscal. Si coincide y el monto no, es muy probable que la diferencia sea un beneficio, un recargo o un ajuste de período.",
        ],
      },
    ],
    sources: [{ label: "ARBA", href: "https://www.arba.gob.ar" }],
  },
  {
    slug: "patente-motos",
    title: "Patente de motos en la Provincia de Buenos Aires",
    description:
      "Las motocicletas también pagan impuesto automotor. Qué cambia y qué no respecto de los autos.",
    updated: "2026-01-15",
    intro:
      "Las motos radicadas en la provincia pagan el mismo impuesto, con la misma escala de tramos. La diferencia está en la valuación fiscal, que suele ser más baja.",
    sections: [
      {
        heading: "Misma escala, otra valuación",
        paragraphs: [
          "No hay una tabla especial de alícuotas para motocicletas en esta estimación. Se usa el mismo sistema de cinco tramos. Lo que cambia es el valor fiscal que publica DNRPA para cada marca, modelo y año.",
          "Una moto de baja cilindrada suele caer en el primer tramo (1%). Una moto importada o de alta cilindrada puede subir de tramo igual que un auto.",
          "El dominio, la radicación y el título son los que definen si pagás en la provincia. Si la moto está radicada en CABA u otra provincia, esta escala de ARBA no aplica. Confirmá el asiento en el registro antes de usar el número que te da esta herramienta.",
        ],
      },
      {
        heading: "Cómo usarla en la calculadora",
        paragraphs: [
          "Elegí Motocicleta, cargá el año y la valuación fiscal. El tipo de vehículo se guarda en el detalle para que sepas qué simulaste, pero no altera la fórmula.",
          "Para transferir una moto también hace falta estar al día. La deuda viaja con el vehículo: el comprador puede exigir el libre de deuda antes de escriturar en el registro.",
        ],
      },
    ],
    sources: [
      { label: "ARBA", href: "https://www.arba.gob.ar" },
      { label: "DNRPA", href: "https://www.dnrpa.gov.ar" },
    ],
  },
  {
    slug: "vencimientos",
    title: "Vencimientos y qué pasa si no pagás la patente",
    description:
      "Cómo se organiza el calendario de ARBA y las consecuencias habituales de dejar el impuesto impago.",
    updated: "2026-01-15",
    intro:
      "Las fechas exactas las publica ARBA cada año. Acá explicamos la lógica del calendario y el costo de no pagar, sin inventar un cronograma que puede cambiar.",
    sections: [
      {
        heading: "Cómo se organiza el año",
        paragraphs: [
          "Suele haber un vencimiento temprano para el pago anual, un esquema de cuotas bimestrales y otro de cuotas mensuales. El descuento más alto, cuando existe, está en el pago anual. Las cuotas mensuales normalmente no tienen esa bonificación.",
          "No uses un calendario de un año anterior. Entrá a arba.gob.ar o a la boleta del período. El vencimiento está impreso en cada cuota.",
        ],
      },
      {
        heading: "Si no pagás",
        paragraphs: [
          "La deuda genera intereses resarcitorios y punitorios. Con el tiempo ARBA puede iniciar apremio fiscal, trabar medidas sobre cuentas o bienes y bloquear la transferencia del vehículo.",
          "También puede complicar la VTV y cualquier trámite en el registro. Regularizar con un plan de pagos suele salir más barato que esperar a la ejecución.",
          "Si la deuda es de varios períodos, pedí en ARBA un detalle por cuota. Pagar una sola cuota reciente no borra las anteriores. Un plan unifica, pero puede caerse si se deja de pagar una cuota del plan.",
          "Esta guía no es asesoramiento jurídico. Si ya hay un juicio de apremio, consultá a un profesional o a la oficina de ARBA que figure en la intimación.",
        ],
      },
    ],
    sources: [{ label: "ARBA", href: "https://www.arba.gob.ar" }],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

const guideTopics: Record<string, string[]> = {
  "como-se-calcula": ["calculo", "tramos", "valuacion", "cuotas", "descuentos"],
  "valuacion-fiscal": ["valuacion", "boleta", "dnrpa", "calculo"],
  "como-pagar": ["pago", "canales", "deuda", "transferencia"],
  descuentos: ["descuentos", "cuotas", "pago", "cumplimiento", "calculo"],
  "patente-motos": ["motos", "calculo", "valuacion", "transferencia"],
  vencimientos: ["vencimientos", "deuda", "pago", "cuotas", "descuentos"],
};

const preferredRelated: Record<string, string[]> = {
  "como-se-calcula": ["valuacion-fiscal", "descuentos", "patente-motos"],
  "valuacion-fiscal": ["como-se-calcula", "patente-motos", "descuentos"],
  "como-pagar": ["vencimientos", "descuentos", "como-se-calcula"],
  descuentos: ["como-se-calcula", "vencimientos", "como-pagar"],
  "patente-motos": ["como-se-calcula", "valuacion-fiscal", "como-pagar"],
  vencimientos: ["como-pagar", "descuentos", "como-se-calcula"],
};

function topicScore(fromSlug: string, toSlug: string): number {
  const from = new Set(guideTopics[fromSlug] ?? []);
  const to = guideTopics[toSlug] ?? [];
  return to.filter((topic) => from.has(topic)).length;
}

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  const current = getGuide(slug);
  if (!current) return [];

  const picked = new Set<string>([slug]);
  const related: Guide[] = [];

  for (const nextSlug of preferredRelated[slug] ?? []) {
    const guide = getGuide(nextSlug);
    if (!guide || picked.has(nextSlug)) continue;
    related.push(guide);
    picked.add(nextSlug);
    if (related.length >= limit) return related;
  }

  const scored = guides
    .filter((guide) => !picked.has(guide.slug))
    .map((guide) => ({
      guide,
      score: topicScore(slug, guide.slug),
    }))
    .sort((a, b) => b.score - a.score);

  for (const item of scored) {
    related.push(item.guide);
    if (related.length >= limit) break;
  }

  return related;
}
