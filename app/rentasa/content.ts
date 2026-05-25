export const FOLIO = "WB-133";
export const ISSUED = "2026-05-25";
export const VALID = "2026-06-09";

export const PRICE_SITIO: number | null = 17000;
export const PRICE_AGENTE: number | null = 3300;
export const PRICE_AUTOADMIN: number | null = 3000;
export const PRICE_HOSTING: number | null = 2000;

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
      "Grupo inmobiliario mexicano. Desarrollo, adquisición, administración y comercialización de activos industriales, comerciales, oficinas, habitacionales y reserva territorial.",
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
    pendingPrice: "Por definir",
    plusVat: "+ IVA",
    signatureOf: (name: string) => `Firma de ${name}`,
  },
  phases: [
    { num: "01", name: "Propuesta" },
    { num: "02", name: "El portal" },
    { num: "03", name: "Contenido" },
    { num: "04", name: "Autoadministración" },
    { num: "05", name: "Previsualización" },
    { num: "06", name: "Inversión" },
  ],
  preview: {
    title: "Previsualización del Proyecto",
    meta: "4 vistas",
    intro:
      "Vistas preliminares de las pantallas principales del portal: Inicio, Portal de propiedades, Detalle de propiedad y Contacto.",
  },
  intro: {
    eyebrow: "Propuesta · Portal inmobiliario + Agente IA + Módulo autoadministrable",
    titleLead: "Portal inmobiliario",
    titleEmphasis: "profesional",
    titleSuffix: "para",
    paragraph:
      "Propuesta para construir el portal inmobiliario de Rentasa: 10 páginas con catálogo de propiedades filtrable, ficha individual por activo, agente de ventas conversacional con inteligencia artificial que atiende consultas 24 horas y un módulo autoadministrable para que el equipo actualice contenido, catálogo y blog sin depender de un desarrollador.",
  },
  before: {
    heading: "Hoy",
    items: [
      "El catálogo de propiedades vive en un PDF. No hay un sitio web que lo presente con imágenes, ficha técnica y filtros.",
      "Cada solicitud de información se atiende manualmente, sin captura estructurada en un formulario.",
      "La trayectoria de más de 30 años no llega a los prospectos por un canal digital propio.",
      "No hay métricas que indiquen qué propiedades o categorías generan más interés.",
    ],
  },
  after: {
    heading: "Con el portal nuevo",
    items: [
      "Catálogo de propiedades en línea, actualizable por el equipo de Rentasa en cualquier momento.",
      "Solicitudes estructuradas con datos del prospecto, propiedad de interés y forma de contacto.",
      "Sitio que presenta al grupo, el portafolio y el modelo de operación con claridad.",
      "Métricas accesibles en Google Analytics con las propiedades y categorías más consultadas.",
    ],
  },
  benefits: {
    title: "Cómo les facilita el día a día",
    meta: "4 beneficios",
    items: [
      {
        icon: "edit_note",
        title: "Catálogo siempre al día",
        detail:
          "El equipo de Rentasa edita, publica o retira propiedades por su cuenta desde el panel. Los cambios se reflejan en el sitio al guardar.",
      },
      {
        icon: "mark_email_read",
        title: "Solicitudes estructuradas al correo de ventas",
        detail:
          "Cada formulario captura nombre, propiedad de interés, forma de contacto y notas. El correo llega completo al equipo, listo para responder.",
      },
      {
        icon: "view_quilt",
        title: "Información clara desde la primera visita",
        detail:
          "El visitante encuentra el portafolio, los servicios y la trayectoria del grupo organizados en 10 páginas con jerarquía consistente.",
      },
      {
        icon: "insights",
        title: "Datos sobre qué propiedades interesan más",
        detail:
          "Acceso a Google Analytics para que el equipo revise en cualquier momento las categorías, zonas y propiedades con más visitas. Información para respaldar decisiones de adquisición e inversión.",
      },
    ],
  },
  features: {
    title: "Qué incluye el portal",
    meta: "7 puntos",
    items: [
      {
        icon: "design_services",
        title: "Diseño profesional y responsive",
        detail:
          "Funciona correctamente en computadoras y dispositivos móviles. Refleja la seriedad de un grupo con más de 30 años de operación.",
      },
      {
        icon: "filter_alt",
        title: "Catálogo con filtros",
        detail:
          "Listado de propiedades con filtros por tipo, uso (venta o renta), categoría, estado y ciudad. El visitante encuentra rápido lo que busca.",
      },
      {
        icon: "domain",
        title: "Ficha individual por propiedad",
        detail:
          "Una plantilla reutilizable con galería de fotos, ficha técnica, mapa, formulario lateral de contacto y datos del asesor asignado.",
      },
      {
        icon: "description",
        title: "Formulario de contacto estructurado",
        detail:
          "Los datos del prospecto llegan al correo de ventas listos para responder, con la propiedad de interés ya identificada.",
      },
      {
        icon: "search",
        title: "Buscador en Inicio",
        detail:
          "El visitante escribe lo que busca desde la portada y aterriza en el catálogo con los filtros precargados.",
      },
      {
        icon: "call",
        title: "Medios de contacto visibles",
        detail:
          "Teléfono, WhatsApp y correo permanecen fijos en el encabezado del portal. Desde móvil basta un toque para activarlos.",
      },
      {
        icon: "monitoring",
        title: "Medición de visitas desde el primer día",
        detail:
          "Permite conocer cuántos visitantes recibe el portal, de qué canal provienen y qué propiedades consultan.",
      },
    ],
  },
  pages: {
    title: "Páginas del portal",
    meta: "10 secciones",
    groups: [
      {
        label: "Presentación",
        items: [
          { num: "01", name: "Inicio", detail: "Hero, propuesta de valor, propiedades destacadas y accesos al catálogo." },
          { num: "02", name: "Nosotros", detail: "Historia del grupo, trayectoria, filosofía y estructura operativa." },
          { num: "03", name: "Portafolio", detail: "Vista panorámica de los activos agrupados por categoría." },
          { num: "04", name: "Modelo PropTech", detail: "Cómo opera el grupo con tecnología, datos y automatización." },
        ],
      },
      {
        label: "Catálogo y oferta",
        items: [
          { num: "05", name: "Propiedades", detail: "Catálogo completo con filtros por tipo, uso, estado y ciudad." },
          { num: "06", name: "Ficha individual", detail: "Plantilla por propiedad: galería, ficha técnica, mapa y contacto." },
          { num: "07", name: "Inversión", detail: "Track record del grupo, diversificación y oportunidades vigentes." },
        ],
      },
      {
        label: "Comunicación y captación",
        items: [
          { num: "08", name: "Contacto", detail: "Formulario general, mapa, WhatsApp y datos de oficinas." },
          { num: "09", name: "Blog / Insights", detail: "Arranca con 8 artículos precargados organizados por categorías: inversión, mercado, plusvalía, industrial." },
          { num: "10", name: "Landings Ads", detail: "2 plantillas base para campañas Meta Ads y Google Ads." },
        ],
      },
    ],
  },
  categories: {
    title: "Categorías de activos",
    meta: "5 categorías",
    intro:
      "Las 5 categorías que componen el portafolio. Cada propiedad del catálogo pertenece a una de ellas, y el filtro del listado las separa con claridad.",
    items: [
      { icon: "factory", name: "Industrial", detail: "Naves, parques industriales y bodegas." },
      { icon: "storefront", name: "Comercial", detail: "Plazas, locales y centros de uso mixto." },
      { icon: "corporate_fare", name: "Oficinas", detail: "Edificios corporativos y espacios de trabajo." },
      { icon: "home_work", name: "Habitacional", detail: "Desarrollos residenciales y viviendas." },
      { icon: "landscape", name: "Reserva territorial", detail: "Terrenos en zonas con potencial de desarrollo." },
    ],
  },
  agent: {
    titleLead: "Agente de ventas conversacional con",
    titleEmphasis: "inteligencia artificial",
    meta: "Incluido",
    intro:
      "Un asistente virtual integrado al portal que conversa con el visitante, identifica la categoría y zona de interés, comparte propiedades disponibles y captura los datos de contacto para que un asesor de Rentasa concrete la operación.",
    features: [
      {
        icon: "support_agent",
        title: "Disponible las 24 horas",
        detail:
          "Responde consultas iniciales de forma inmediata, sin importar el horario ni la zona del visitante.",
      },
      {
        icon: "explore",
        title: "Reconoce tipo de propiedad y zona",
        detail:
          "El visitante pregunta por una categoría o ciudad y el agente responde con las propiedades vigentes en el catálogo.",
      },
      {
        icon: "contact_mail",
        title: "Captura datos del prospecto",
        detail:
          "Solicita nombre, empresa o persona, presupuesto aproximado y correo de contacto antes de pasar el lead al asesor.",
      },
      {
        icon: "forward_to_inbox",
        title: "Notifica al equipo de forma inmediata",
        detail:
          "Al registrar un prospecto, envía una notificación al correo de ventas para dar seguimiento oportuno.",
      },
    ],
  },
  chatHeader: {
    title: "Asistente Rentasa",
    status: "En línea · responde en segundos",
    badge: "Ejemplo",
    placeholder: "Escriba su mensaje…",
  },
  chat: [
    {
      from: "client",
      text: "Buenas tardes. Busco una nave industrial en Querétaro de aproximadamente 5,000 m². ¿Tienen disponibilidad?",
    },
    {
      from: "agent",
      text: "Buenas tardes. Sí, tenemos varias opciones en Querétaro dentro de ese rango. ¿La operación sería en venta o renta? ¿Necesita andén de carga o algún tipo de certificación específica?",
    },
    {
      from: "client",
      text: "Renta, con andén. La operación es de logística ligera, no requerimos certificación especial.",
    },
    {
      from: "agent",
      text: "Con gusto. Para que un asesor de Rentasa le comparta las opciones disponibles con ficha técnica y condiciones, ¿me proporciona su nombre, empresa y correo de contacto?",
    },
    {
      from: "client",
      text: "Daniel Ortega, Logística Norte, daniel@logisticanorte.mx",
    },
    {
      from: "agent",
      text: "Gracias, Daniel. Un asesor se pondrá en contacto con usted en las próximas horas con las opciones de Querétaro que cumplen con los requisitos. ¿Puedo ayudarle con algo adicional?",
    },
  ] as const,
  requisite: {
    label: "Requisito:",
    before: "el agente debe vincularse con una cuenta de",
    or: "o",
    middle:
      ". El costo mensual de dicha cuenta se estima entre 10 y 30 USD (aproximadamente 180 a 550 MXN) con un tráfico regular de consultas, y corre por parte de Rentasa. La configuración y el entrenamiento del agente están incluidos en la presente cotización.",
  },
  autoadmin: {
    titleLead: "Módulo",
    titleEmphasis: "autoadministrable",
    meta: "Panel propio",
    intro:
      "Un panel de administración con usuario y contraseña que permite al equipo de Rentasa mantener el portal al día sin depender de un desarrollador. Capacitación inicial incluida.",
    features: [
      {
        icon: "real_estate_agent",
        title: "Alta y baja de propiedades",
        detail:
          "Alta, baja y edición del catálogo. Cada ficha incluye fotos, ficha técnica, ubicación, asesor asignado y estado (disponible, vendida o rentada).",
      },
      {
        icon: "article",
        title: "Alta y baja de artículos del blog",
        detail:
          "Publicar, editar y retirar artículos del blog organizados por categorías: inversión, mercado, plusvalía, industrial, automatización.",
      },
      {
        icon: "edit_document",
        title: "Edición de textos e imágenes",
        detail:
          "Modificar el copy y las fotografías de las páginas existentes: Inicio, Nosotros, Inversión, Modelo PropTech y Contacto.",
      },
    ],
    training:
      "Capacitación inicial del equipo incluida: una sesión guiada por el panel y manual breve con los procedimientos más usados.",
    migration:
      "Migración del catálogo existente: el equipo de Rentasa entrega el listado actual (PDF, Excel u otro sistema) y Bravo Publicidad lo carga en el módulo antes de salir a producción.",
  },
  investment: {
    title: "Inversión",
    oneTimeLabel: "Pago único · Entrega completa",
    totalFootnote:
      "Medición de visitas, capacitación del equipo y migración del catálogo existente incluidas desde el primer día.",
    totalCaption: "MXN · total",
    depositLabel: "Anticipo · al aprobar",
    depositCaption: "50% para iniciar",
    finalLabel: "Liquidación · al entregar",
    finalCaption: "50% con todo publicado",
    lines: {
      sitio: {
        title: "Sitio web general y portal de propiedades",
        detail:
          "Diseño, desarrollo y publicación del portal de 10 páginas. Incluye catálogo con filtros, plantilla reutilizable para ficha individual y formulario de contacto por propiedad.",
      },
      agente: {
        title: "Agente de ventas conversacional con IA 24/7",
        detail:
          "Configuración del agente, entrenamiento con categorías y zonas de Rentasa, integración al portal.",
      },
      autoadmin: {
        title: "Módulo sitio web autoadministrable",
        detail:
          "Panel propio para que el equipo de Rentasa actualice el catálogo de propiedades, los artículos del blog y los textos e imágenes del sitio sin depender de un desarrollador, lo que reduce los costos por actualizaciones y mantenimiento a futuro. Capacitación inicial incluida.",
      },
      hosting: {
        title: "Hosting del portal (pago anual)",
        detail:
          "Servicio que mantiene el portal publicado y accesible las 24 horas, cobrado en cuotas anuales. El monto cubre el primer año; la renovación a partir del segundo año se gestiona con Bravo Publicidad bajo la misma tarifa.",
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
      "para agendar la reunión de arranque. En dicha reunión se definirán los accesos, las categorías y propiedades prioritarias, los materiales disponibles (logotipo, fotografías y textos), la forma de entrega del catálogo existente y el calendario con fechas específicas por entrega.",
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
