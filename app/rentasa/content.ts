export const FOLIO = "WB-136";
export const ISSUED = "2026-06-08";
export const VALID = "2026-06-15";

export const PRICE_SITIO = 10500;
export const PRICE_HOSTING = 1500;
export const PRICE_DOMINIO = 1000;

export const CONTENT = {
  locale: "es-MX",
  htmlLang: "es",
  provider: {
    name: "Bravo Publicidad",
    tagline: "Estrategia digital y desarrollo web.",
    lead: "Oscar Amayoral",
    email: "oscar.amayoral@gmail.com",
    roleLabel: "Responsable",
  },
  client: {
    name: "Rentasa, Proyectos Inmobiliarios",
    short: "Rentasa",
    descriptor:
      "Grupo inmobiliario mexicano. Desarrollo, adquisición, administración y comercialización de activos inmobiliarios.",
  },
  relatedQuote: {
    href: "/inmobiliaria",
    name: "Portal Inmobiliaria Vértice",
  },
  labels: {
    quote: "Cotización",
    quoteNumber: "N.º",
    issued: "Emitida",
    validUntil: "Vigencia",
    from: "De",
    preparedFor: "Preparado para",
    printPdf: "Imprimir / PDF",
    pageOf: (cur: number, total: number) => `Página ${cur} · ${total}`,
    toolbarLabel: (folio: string, client: string) => `Cotización ${folio} · ${client}`,
    plusVat: "+ IVA",
    pendingPrice: "Por definir",
    perYear: "/ año",
    signatureOf: (name: string) => `Firma de ${name}`,
    acceptance: "Aceptación",
  },
  phases: [
    { num: "01", name: "Propuesta" },
    { num: "02", name: "El sitio" },
    { num: "03", name: "Inversión" },
  ],
  intro: {
    eyebrow: "Propuesta · Sitio web informativo",
    titleLead: "Sitio web",
    titleEmphasis: "informativo",
    titleSuffix: "para",
    paragraph:
      "Propuesta para construir el sitio web institucional de Rentasa: un sitio de 5 páginas que presenta al grupo, sus servicios y sus proyectos, con galería de proyectos y formulario de contacto que envía cada solicitud directo al correo de ventas.",
  },
  before: {
    heading: "Hoy",
    items: [
      "Rentasa no tiene un sitio web propio que presente al grupo y sus proyectos.",
      "Cada solicitud de información se atiende por canales personales, sin un formulario que ordene los datos del prospecto.",
      "Los proyectos no se muestran en línea con fotografías y descripción en un solo lugar.",
    ],
  },
  after: {
    heading: "Con el sitio nuevo",
    items: [
      "Un sitio que presenta al grupo, sus servicios y sus proyectos con una imagen profesional.",
      "Galería de proyectos con fotografías y descripción, accesible desde cualquier dispositivo.",
      "Formulario de contacto que llega al correo de ventas con los datos del prospecto listos para responder.",
      "Medición de visitas en Google Analytics para saber qué consultan los visitantes.",
    ],
  },
  benefits: {
    title: "Cómo les ayuda",
    meta: "3 puntos",
    items: [
      {
        icon: "verified",
        title: "Presencia profesional",
        detail:
          "Un sitio propio que respalda al grupo frente a prospectos, socios e inversionistas, con dominio a nombre de Rentasa.",
      },
      {
        icon: "mark_email_read",
        title: "Solicitudes ordenadas al correo",
        detail:
          "Cada formulario captura nombre, forma de contacto y mensaje. El correo llega completo al equipo de ventas.",
      },
      {
        icon: "insights",
        title: "Datos de quién los visita",
        detail:
          "Acceso a Google Analytics para revisar cuántas visitas recibe el sitio y qué secciones consultan.",
      },
    ],
  },
  features: {
    title: "Qué incluye el sitio",
    meta: "5 puntos",
    items: [
      {
        icon: "design_services",
        title: "Diseño profesional y responsive",
        detail:
          "Funciona correctamente en computadoras y dispositivos móviles. Refleja la seriedad del grupo.",
      },
      {
        icon: "photo_library",
        title: "Galería de proyectos",
        detail:
          "Sección que presenta los proyectos con fotografías y descripción. La carga inicial de proyectos está incluida.",
      },
      {
        icon: "description",
        title: "Formulario de contacto",
        detail:
          "Los datos del prospecto llegan al correo de ventas listos para responder.",
      },
      {
        icon: "call",
        title: "Medios de contacto visibles",
        detail:
          "Teléfono, WhatsApp y correo fijos en el encabezado. Desde móvil basta un toque para activarlos.",
      },
      {
        icon: "monitoring",
        title: "Medición de visitas",
        detail:
          "Google Analytics conectado desde el primer día para conocer el tráfico del sitio.",
      },
    ],
  },
  pages: {
    items: [
      { num: "01", name: "Inicio", detail: "Presentación del grupo, propuesta de valor y accesos a las secciones." },
      { num: "02", name: "Nosotros", detail: "Historia del grupo, trayectoria y filosofía de operación." },
      { num: "03", name: "Servicios", detail: "Qué hace el grupo: desarrollo, adquisición, administración y comercialización." },
      { num: "04", name: "Proyectos", detail: "Galería de proyectos con fotografías y descripción." },
      { num: "05", name: "Contacto", detail: "Formulario, mapa, WhatsApp y datos de contacto." },
    ],
  },
  investment: {
    title: "Inversión",
    totalLabel: "Total primer año",
    totalCaption: "MXN · sitio + hosting y dominio del primer año",
    recurringNote: "Hosting y dominio se renuevan cada año.",
    depositLabel: "Anticipo · al aprobar",
    depositCaption: "50% del sitio, para iniciar",
    finalLabel: "Liquidación · al entregar",
    finalCaption: "50% del sitio + hosting y dominio del primer año",
    pagesLabel: "Las 5 páginas",
    lines: {
      sitio: {
        title: "Sitio web informativo",
        detail:
          "Diseño, desarrollo y publicación del sitio de 5 páginas. Incluye galería de proyectos con carga inicial, formulario de contacto y medición de visitas.",
      },
      hosting: {
        title: "Hosting del sitio",
        detail: "Servicio que mantiene el sitio publicado y accesible las 24 horas, cobrado por año.",
      },
      dominio: {
        title: "Dominio",
        detail: "Registro y renovación anual del dominio a nombre de Rentasa.",
      },
    },
    notes: [
      "Todos los precios son más IVA (16%).",
      "Precios en pesos mexicanos (MXN).",
      "Formas de pago: transferencia o tarjeta.",
      "Factura disponible a solicitud.",
    ],
    validityNote: (date: string) => `Vigencia de la cotización: hasta el ${date}.`,
  },
  nextStep: {
    label: "Siguiente paso",
    textBefore: "Aprobar la presente cotización y cubrir el anticipo de",
    textAfter:
      "para agendar la reunión de arranque. En dicha reunión se definirán los materiales disponibles (logotipo, fotografías y textos), los proyectos a publicar y el dominio.",
  },
} as const;

export const fmtMxn = (n: number | null) => {
  if (n === null) return CONTENT.labels.pendingPrice;
  return `$${n.toLocaleString("es-MX", { maximumFractionDigits: 0 })} MXN`;
};


export const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(CONTENT.locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
