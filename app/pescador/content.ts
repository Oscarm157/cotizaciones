export const FOLIO = "WB-134";
export const ISSUED = "2026-05-29";
export const VALID = "2026-06-15";

export const PRICE_SITIO = 6500;
export const PRICE_REDES = 3900;
export const TOTAL = PRICE_SITIO + PRICE_REDES;
export const DEPOSIT = Math.round(TOTAL * 0.5);

export const CONTENT = {
  locale: "es-MX",
  htmlLang: "es",
  provider: {
    name: "Bravo Publicidad",
    tagline: "Estrategia digital y desarrollo web.",
    lead: "Oscar Amayoral",
    email: "oscar.amayoral@gmail.com",
    roleLabel: "Responsable",
    site: "bravopublicidad.webflow.io",
    siteUrl: "https://bravopublicidad.webflow.io/",
    qrCaption: "Escanea para ver el sitio",
  },
  client: {
    name: "Daniel Alejandro Pescador Silva",
    short: "Daniel Pescador",
    descriptor:
      "Arquitecto. Inicio de práctica profesional y presencia digital.",
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
    included: "Incluido",
    complimentaryBadge: "Cortesía",
    noCharge: "Sin costo",
    acceptance: "Aceptación",
    signatureOf: (name: string) => `Firma de ${name}`,
  },
  phases: [
    { num: "01", name: "Propuesta y alcance" },
    { num: "02", name: "Inversión" },
  ],
  intro: {
    eyebrow: "Propuesta · Sitio web + Gestión de redes sociales",
    titleLead: "Presencia digital",
    titleEmphasis: "profesional",
    titleSuffix: "para",
    paragraph:
      "Propuesta para construir el primer sitio web de Daniel Pescador como arquitecto: cinco páginas que presentan su trabajo, sus servicios y sus datos de contacto, más el arranque y la gestión de sus redes sociales durante el primer mes.",
  },
  before: {
    heading: "Hoy",
    items: [
      "No hay un sitio propio donde mostrar los proyectos y el enfoque de trabajo.",
      "Los prospectos llegan por recomendación de boca en boca, sin un canal donde conocer el trabajo previo.",
      "Las redes sociales están sin abrir o sin una línea visual definida.",
      "No hay un punto único donde un cliente potencial vea proyectos, servicios y forma de contacto.",
    ],
  },
  after: {
    heading: "Con presencia digital",
    items: [
      "Un sitio propio con el portafolio, los servicios y el contacto en un solo lugar.",
      "Un enlace que se comparte en cotizaciones, tarjetas y redes para respaldar la propuesta.",
      "Instagram y Facebook activos, con una línea visual consistente desde el arranque.",
      "Un mes de publicaciones que da continuidad mientras la práctica toma ritmo.",
    ],
  },
  features: {
    title: "Qué incluye el sitio",
    meta: "6 puntos",
    items: [
      {
        icon: "design_services",
        title: "Diseño profesional, computadora y celular",
        detail:
          "Funciona correctamente en computadora y celular. Transmite el cuidado y la seriedad del trabajo de un arquitecto.",
      },
      {
        icon: "photo_library",
        title: "Portafolio de proyectos",
        detail:
          "Galería para presentar los proyectos con fotografías, descripción breve y tipo de obra.",
      },
      {
        icon: "view_list",
        title: "Servicios presentados con claridad",
        detail:
          "Una sección que explica los servicios (diseño, proyecto ejecutivo, remodelación) con su descripción.",
      },
      {
        icon: "description",
        title: "Formulario de contacto",
        detail:
          "Los datos del prospecto llegan al correo listos para responder, con el tipo de proyecto ya identificado.",
      },
      {
        icon: "call",
        title: "Contacto siempre visible",
        detail:
          "Teléfono, WhatsApp y correo fijos en el encabezado. Desde el celular basta un toque para escribir o llamar.",
      },
      {
        icon: "monitoring",
        title: "Medición de visitas desde el primer día",
        detail:
          "Permite conocer cuántas visitas recibe el sitio, de qué canal llegan y qué proyectos consultan.",
      },
    ],
  },
  pages: {
    title: "Páginas del sitio",
    meta: "5 secciones",
    items: [
      { name: "Inicio", detail: "Presentación, proyecto destacado y accesos al portafolio y contacto." },
      { name: "Portafolio", detail: "Proyectos con galería de fotos, descripción y tipo de obra." },
      { name: "Servicios", detail: "Diseño arquitectónico, proyecto ejecutivo y remodelación, cada uno explicado." },
      { name: "Sobre el arquitecto", detail: "Trayectoria, enfoque de trabajo y formación de Daniel Pescador." },
      { name: "Contacto", detail: "Formulario, teléfono, WhatsApp, correo y ubicación." },
    ],
  },
  social: {
    title: "Gestión de redes sociales",
    meta: "Primer mes",
    intro:
      "Arranque y manejo de las redes durante el primer mes: perfiles listos, una línea visual definida y publicaciones que dan continuidad mientras la práctica toma ritmo.",
    items: [
      {
        icon: "rocket_launch",
        title: "Arranque y configuración",
        detail:
          "Apertura y configuración de los perfiles de Instagram y Facebook, con foto, biografía, enlaces al sitio y datos de contacto.",
      },
      {
        icon: "palette",
        title: "Lineamientos de marca",
        detail:
          "Una línea visual básica (colores, tipografías y plantillas) para que las publicaciones se vean consistentes.",
      },
      {
        icon: "calendar_month",
        title: "Calendario y publicaciones del mes",
        detail:
          "Calendario de contenido y diseño de las publicaciones del primer mes, enfocadas en proyectos y servicios.",
      },
      {
        icon: "insights",
        title: "Conexión de analítica",
        detail:
          "Vinculación de las cuentas con las herramientas de medición para dar seguimiento al alcance desde el inicio.",
      },
    ],
  },
  investment: {
    title: "Inversión",
    oneTimeLabel: "Pago único · Entrega completa",
    totalFootnote:
      "Medición de visitas y hospedaje del sitio por 1 año, sin costo adicional.",
    totalCaption: "MXN · total",
    depositLabel: "Anticipo · al aprobar",
    depositCaption: "50% para iniciar",
    finalLabel: "Liquidación · al entregar",
    finalCaption: "50% con todo publicado",
    lines: {
      sitio: {
        title: "Sitio web profesional",
        detail:
          "Diseño, desarrollo y publicación del sitio de 5 páginas: Inicio, Portafolio, Servicios, Sobre el arquitecto y Contacto, con formulario y medición de visitas.",
      },
      redes: {
        title: "Gestión de redes sociales · Primer mes",
        detail:
          "Apertura y configuración de Instagram y Facebook, lineamientos de marca básicos, calendario y publicaciones del primer mes, y conexión de la analítica.",
      },
      hosting: {
        title: "Hospedaje del sitio (pago anual)",
        detail:
          "Servicio que mantiene el sitio publicado y accesible las 24 horas. Incluido durante los primeros 12 meses; la renovación a partir del segundo año se gestiona con Bravo Publicidad bajo tarifa anual.",
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
      "para agendar la reunión de arranque. En dicha reunión se definirán los proyectos a destacar en el portafolio, los materiales disponibles (fotografías, textos y logotipo) y el calendario con fechas específicas por entrega.",
  },
} as const;

export const fmtMxn = (n: number) =>
  `$${n.toLocaleString("es-MX", { maximumFractionDigits: 0 })} MXN`;

export const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(CONTENT.locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
