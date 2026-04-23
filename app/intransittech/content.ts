export type Lang = "es" | "en";

export const FOLIO = "WB-384";
export const ISSUED = "2026-04-23";
export const VALID = "2026-05-15";

export const PRICE_SITIO = 800;
export const PRICE_AGENTE = 200;
export const PRICE_TRANSLATION = 150;
export const USD_TOTAL = PRICE_SITIO + PRICE_AGENTE + PRICE_TRANSLATION;
export const USD_DEPOSIT = Math.round(USD_TOTAL * 0.5);

export const CONTENT = {
  es: {
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
      name: "Intransit Technologies Corp",
      short: "Intransit Tech",
      descriptor: "Distribución de componentes electrónicos e industriales",
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
      toolbarLabel: (folio: string, client: string) =>
        `Cotización ${folio} · ${client}`,
      included: "Incluido",
      complimentaryBadge: "Cortesía",
      noCharge: "Sin costo",
      acceptance: "Aceptación",
      signatureOf: (name: string) => `Firma de ${name}`,
    },
    phases: [
      { num: "01", name: "Propuesta" },
      { num: "02", name: "Transformación" },
      { num: "03", name: "Contenido" },
      { num: "04", name: "Inversión" },
    ],
    intro: {
      eyebrow: "Propuesta · Sitio + Agente IA + Versión bilingüe",
      titleLead: "Sitio web",
      titleEmphasis: "profesional",
      titleSuffix: "para",
      paragraph:
        "Propuesta para construir un sitio web nuevo que reemplace al actual, acompañado de un agente de ventas con inteligencia artificial que atiende consultas 24 horas, y la versión bilingüe del sitio en español e inglés.",
    },
    before: {
      heading: "Hoy",
      items: [
        "Los visitantes cierran el sitio sin información clara sobre los servicios.",
        "Cada cotización se inicia desde cero por teléfono o correo.",
        "La información se encuentra dispersa entre correo, teléfono y el sitio actual.",
        "No existen métricas que indiquen qué productos o servicios se consultan con mayor frecuencia.",
      ],
    },
    after: {
      heading: "Con el sitio nuevo",
      items: [
        "Catálogo y servicios presentados con claridad desde el inicio.",
        "Solicitudes estructuradas que llegan directamente al correo de ventas.",
        "Toda la información unificada en un único espacio.",
        "Reporte mensual con los productos y servicios más consultados.",
      ],
    },
    benefits: {
      title: "Cómo les facilita el día a día",
      meta: "4 beneficios",
      items: [
        {
          icon: "schedule",
          title: "Menos tiempo explicando lo básico",
          detail:
            "El sitio presenta los servicios y categorías con claridad. El prospecto llega a la llamada con contexto y el equipo se concentra en cerrar la venta.",
        },
        {
          icon: "mark_email_read",
          title: "Solicitudes de cotización ordenadas",
          detail:
            "Los formularios capturan número de parte, cantidad, industria y datos de contacto. Cada correo llega completo al equipo de ventas.",
        },
        {
          icon: "phone_in_talk",
          title: "Teléfono siempre visible y activo",
          detail:
            "El número permanece fijo en el encabezado. Desde dispositivos móviles basta presionarlo para iniciar la llamada, sin necesidad de copiar el número.",
        },
        {
          icon: "insights",
          title: "Información precisa sobre lo que buscan sus clientes",
          detail:
            "Cada mes se reportan las categorías y servicios con mayor número de consultas. Información que permite tomar decisiones con respaldo.",
        },
      ],
    },
    features: {
      title: "Qué incluye el sitio",
      meta: "7 puntos",
      items: [
        {
          icon: "design_services",
          title: "Diseño profesional y moderno",
          detail:
            "Se adapta correctamente a computadoras y dispositivos móviles. Transmite la seriedad de un distribuidor global.",
        },
        {
          icon: "search",
          title: "Buscador enlazado al formulario de cotización",
          detail:
            "El visitante escribe lo que necesita y se abre el formulario de cotización con el texto precargado, listo para enviar al equipo de ventas.",
        },
        {
          icon: "view_list",
          title: "Servicios presentados con claridad",
          detail:
            "Una sección dedicada a cada servicio (componentes difíciles de encontrar, obsoletos, revisión, reparación) con su explicación y botón para cotizar.",
        },
        {
          icon: "description",
          title: "Formulario de cotización",
          detail:
            "Los datos llegan estructurados al equipo de ventas para facilitar una respuesta ágil.",
        },
        {
          icon: "inventory_2",
          title: "Formulario para recibir inventario",
          detail:
            "Sección dedicada para proveedores que desean ofrecer inventario excedente a Intransit Tech.",
        },
        {
          icon: "call",
          title: "Teléfono y correo visibles en todo momento",
          detail:
            "El número (949) 481-7935 permanece fijo en el encabezado del sitio. La operación depende de atender consultas sin demora.",
        },
        {
          icon: "monitoring",
          title: "Medición de visitas desde el primer día",
          detail:
            "Permite conocer cuántos visitantes recibe el sitio, de qué canal provienen y qué contenido consultan.",
        },
      ],
    },
    pages: {
      title: "Páginas del sitio",
      meta: "7 secciones",
      items: [
        { name: "Inicio", detail: "Buscador, propuesta de valor y marcas destacadas." },
        { name: "Nosotros", detail: "Historia, experiencia y diferenciadores." },
        {
          name: "Servicios",
          detail:
            "Todos los servicios especializados agrupados por secciones dentro de una sola página.",
        },
        { name: "Productos", detail: "Catálogo base organizado por categorías." },
        {
          name: "Industrias",
          detail: "Sectores que atienden, cada uno como sección dentro de una sola página.",
        },
        {
          name: "Vender inventario",
          detail: "Formulario dedicado para proveedores con inventario excedente.",
        },
        { name: "Contacto", detail: "Formulario de cotización, mapa, teléfonos y correos." },
      ],
    },
    categories: {
      title: "Catálogo de productos · por categorías",
      meta: "8 familias",
      intro:
        "Un catálogo base con las familias de productos que Intransit Tech distribuye con mayor frecuencia. El visitante identifica la categoría que requiere y accede al formulario de cotización.",
      items: [
        { icon: "memory", name: "Componentes electrónicos", detail: "Semiconductores, pasivos, discretos y de placa." },
        { icon: "settings_input_component", name: "Motores y control", detail: "Servomotores, encoders y controladores industriales." },
        { icon: "sensors", name: "Sensores e instrumentación", detail: "Sensores, interruptores, medidores y transductores." },
        { icon: "water_drop", name: "Neumática e hidráulica", detail: "Válvulas, bombas, actuadores y accesorios." },
        { icon: "precision_manufacturing", name: "Robótica industrial", detail: "Partes para robots Fanuc, Kuka, Yaskawa y similares." },
        { icon: "flight", name: "Aeroespacial y automotriz", detail: "Componentes certificados para ambos sectores." },
        { icon: "construction", name: "Herramientas y adhesivos", detail: "Herramienta industrial, adhesivos técnicos y consumibles." },
        { icon: "hub", name: "Comunicación y datos", detail: "Módulos de red, conectividad y transmisión industrial." },
      ],
    },
    agent: {
      titleLead: "Agente de ventas con",
      titleEmphasis: "inteligencia artificial",
      meta: "Incluido",
      intro:
        "Un asistente virtual integrado al sitio que conversa con el visitante, identifica la categoría que requiere, comparte las marcas que distribuye Intransit Tech y registra los datos de contacto para que un asesor del equipo concrete la venta.",
      features: [
        {
          icon: "support_agent",
          title: "Disponible las 24 horas",
          detail:
            "Responde consultas iniciales de forma inmediata, sin importar el horario ni la zona horaria del visitante.",
        },
        {
          icon: "category",
          title: "Reconoce categorías",
          detail:
            "El visitante pregunta por una categoría y el agente responde con las marcas que distribuye Intransit Tech.",
        },
        {
          icon: "contact_mail",
          title: "Captura datos del prospecto",
          detail:
            "Solicita nombre, empresa y correo electrónico para entregar un prospecto calificado al equipo de ventas.",
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
      title: "Asistente Intransit Tech",
      status: "En línea · responde en segundos",
      badge: "Ejemplo",
      placeholder: "Escriba su mensaje…",
    },
    chat: [
      {
        from: "client",
        text:
          "Buenas tardes. Requiero servomotores para una nueva línea de ensamble. ¿Los distribuyen?",
      },
      {
        from: "agent",
        text:
          "Buenas tardes. Sí, distribuimos servomotores de Fanuc, Yaskawa, Allen Bradley y Kuka, entre otras marcas. ¿Cuenta con alguna preferencia de marca o potencia?",
      },
      {
        from: "client",
        text: "Aún no definimos marca. Requeriríamos alrededor de 10 unidades.",
      },
      {
        from: "agent",
        text:
          "Con gusto. Para que un asesor de Intransit Tech le comparta opciones con tiempos y precios, ¿me proporciona su nombre, empresa y correo de contacto?",
      },
      {
        from: "client",
        text: "Luis Herrera, Industrial ACX, luis@acx.mx",
      },
      {
        from: "agent",
        text:
          "Gracias, Luis. Un asesor se pondrá en contacto con usted en las próximas horas. ¿Puedo asistirle con algo adicional mientras tanto?",
      },
    ] as const,
    requisite: {
      label: "Requisito:",
      before: "el agente debe vincularse con una cuenta de",
      or: "o",
      middle:
        ". El costo mensual de dicha cuenta se estima entre 10 y 30 USD mensuales con un tráfico regular de consultas, y corre por parte de Intransit Tech. La configuración y el entrenamiento del agente están incluidos en la presente cotización.",
    },
    investment: {
      title: "Inversión",
      oneTimeLabel: "Pago único · Entrega completa",
      totalFootnote:
        "Sin cargos adicionales. Medición de visitas, capacitación del equipo y hosting del sitio por 1 año incluidos desde el primer día.",
      totalCaption: "USD · total",
      depositLabel: "Anticipo · al aprobar",
      depositCaption: "50% para iniciar",
      finalLabel: "Liquidación · al entregar",
      finalCaption: "50% con todo publicado",
      lines: {
        sitio: {
          title: "Sitio web profesional",
          detail:
            "Diseño, desarrollo y publicación del sitio. Incluye los 7 puntos, las 7 páginas y el catálogo base organizado por categorías.",
        },
        agente: {
          title: "Agente de ventas con IA",
          detail:
            "Configuración del agente, entrenamiento con las categorías y marcas de Intransit Tech, e integración al sitio.",
        },
        bilingue: {
          title: "Versión bilingüe",
          detail:
            "Contenido del sitio disponible en español e inglés, selector de idioma y sincronización de ambas versiones.",
        },
        hosting: {
          title: "Hosting del sitio por 1 año",
          detail:
            "Es el servicio que mantiene el sitio publicado y accesible en internet las 24 horas. Incluido durante los primeros 12 meses; la renovación a partir del segundo año se gestiona con Bravo Publicidad bajo tarifa anual.",
          hostingWord: "hosting",
        },
      },
      notes: [
        "Precios en dólares americanos (USD).",
        "Formas de pago: transferencia o tarjeta.",
        "Factura disponible a solicitud.",
      ],
      validityNote: (date: string) => `Vigencia de la cotización: hasta el ${date}.`,
    },
    nextStep: {
      label: "Siguiente paso",
      textBefore: "Aprobar la presente cotización y cubrir el anticipo de",
      textAfter:
        "para agendar la reunión de arranque. En dicha reunión se definirán los accesos, los servicios y categorías prioritarios, los materiales disponibles (logotipo, fotografías y textos) y el calendario con fechas específicas por entrega.",
    },
    langToggle: {
      ariaLabel: "Cambiar idioma",
    },
  },
  en: {
    locale: "en-US",
    htmlLang: "en",
    provider: {
      name: "Bravo Publicidad",
      tagline: "Digital strategy and web development.",
      lead: "Oscar Amayoral",
      email: "oscar.amayoral@gmail.com",
      roleLabel: "Lead",
    },
    client: {
      name: "Intransit Technologies Corp",
      short: "Intransit Tech",
      descriptor: "Electronic and industrial component distribution",
    },
    labels: {
      quote: "Quote",
      quoteNumber: "No.",
      issued: "Issued",
      validUntil: "Valid until",
      from: "From",
      preparedFor: "Prepared for",
      printPdf: "Print / PDF",
      pageOf: (cur: number, total: number) => `Page ${cur} of ${total}`,
      toolbarLabel: (folio: string, client: string) =>
        `Quote ${folio} · ${client}`,
      included: "Included",
      complimentaryBadge: "Complimentary",
      noCharge: "No charge",
      acceptance: "Acceptance",
      signatureOf: (name: string) => `Signature of ${name}`,
    },
    phases: [
      { num: "01", name: "Proposal" },
      { num: "02", name: "Transformation" },
      { num: "03", name: "Content" },
      { num: "04", name: "Investment" },
    ],
    intro: {
      eyebrow: "Proposal · Website + AI Agent + Bilingual Version",
      titleLead: "Professional",
      titleEmphasis: "website",
      titleSuffix: "for",
      paragraph:
        "Proposal to build a new website that replaces the current one, together with an AI-powered sales agent that handles inquiries 24 hours a day and a bilingual version of the site in Spanish and English.",
    },
    before: {
      heading: "Today",
      items: [
        "Visitors leave the site without a clear understanding of the services offered.",
        "Every quote starts from scratch over the phone or by email.",
        "Information is scattered across email, phone, and the current site.",
        "There are no metrics to show which products or services are most frequently requested.",
      ],
    },
    after: {
      heading: "With the new website",
      items: [
        "Catalog and services presented clearly from the start.",
        "Structured requests delivered straight to the sales inbox.",
        "All information unified in a single place.",
        "Monthly report on the most requested products and services.",
      ],
    },
    benefits: {
      title: "How it simplifies your day to day",
      meta: "4 benefits",
      items: [
        {
          icon: "schedule",
          title: "Less time explaining the basics",
          detail:
            "The website presents services and categories clearly. Prospects arrive at the call with context, so your team can focus on closing the sale.",
        },
        {
          icon: "mark_email_read",
          title: "Structured quote requests",
          detail:
            "Forms capture part number, quantity, industry, and contact details. Every email reaches the sales team complete.",
        },
        {
          icon: "phone_in_talk",
          title: "Phone always visible and active",
          detail:
            "The number stays fixed in the header. On mobile, a single tap starts the call without the need to copy the number.",
        },
        {
          icon: "insights",
          title: "Accurate insight into what clients are searching for",
          detail:
            "Each month you receive a report of the most requested categories and services. Information that supports well-founded decisions.",
        },
      ],
    },
    features: {
      title: "What the website includes",
      meta: "7 features",
      items: [
        {
          icon: "design_services",
          title: "Professional, modern design",
          detail:
            "Optimized for desktop and mobile devices. Conveys the credibility of a global distributor.",
        },
        {
          icon: "search",
          title: "Search connected to the quote form",
          detail:
            "The visitor types what they need and the quote form opens with the text pre-filled, ready to send to the sales team.",
        },
        {
          icon: "view_list",
          title: "Services presented clearly",
          detail:
            "A dedicated section for each service (hard-to-find components, obsolete parts, inspection, repair) with its explanation and a quote button.",
        },
        {
          icon: "description",
          title: "Quote request form",
          detail:
            "Data arrives structured for the sales team, enabling a fast response.",
        },
        {
          icon: "inventory_2",
          title: "Inventory intake form",
          detail:
            "A dedicated section for suppliers who want to offer excess inventory to Intransit Tech.",
        },
        {
          icon: "call",
          title: "Phone and email visible at all times",
          detail:
            "Phone (949) 481-7935 stays fixed in the site header. The business depends on handling inquiries without delay.",
        },
        {
          icon: "monitoring",
          title: "Visitor tracking from day one",
          detail:
            "Lets you see how many visitors the site receives, which channels they come from, and what content they view.",
        },
      ],
    },
    pages: {
      title: "Website pages",
      meta: "7 sections",
      items: [
        { name: "Home", detail: "Search, value proposition, and featured brands." },
        { name: "About", detail: "Company story, experience, and differentiators." },
        {
          name: "Services",
          detail:
            "All specialized services grouped into sections within a single page.",
        },
        { name: "Products", detail: "Base catalog organized by category." },
        {
          name: "Industries",
          detail: "Sectors served, each presented as a section within a single page.",
        },
        {
          name: "Sell Inventory",
          detail: "Dedicated form for suppliers with excess inventory.",
        },
        { name: "Contact", detail: "Quote form, map, phone numbers, and emails." },
      ],
    },
    categories: {
      title: "Product catalog · by category",
      meta: "8 families",
      intro:
        "A base catalog with the product families Intransit Tech distributes most frequently. Visitors identify the category they need and move to the quote form.",
      items: [
        { icon: "memory", name: "Electronic components", detail: "Semiconductors, passives, discretes, and board-level." },
        { icon: "settings_input_component", name: "Motors and control", detail: "Servomotors, encoders, and industrial controllers." },
        { icon: "sensors", name: "Sensors and instrumentation", detail: "Sensors, switches, meters, and transducers." },
        { icon: "water_drop", name: "Pneumatics and hydraulics", detail: "Valves, pumps, actuators, and accessories." },
        { icon: "precision_manufacturing", name: "Industrial robotics", detail: "Parts for Fanuc, Kuka, Yaskawa, and similar robots." },
        { icon: "flight", name: "Aerospace and automotive", detail: "Certified components for both sectors." },
        { icon: "construction", name: "Tools and adhesives", detail: "Industrial tools, technical adhesives, and consumables." },
        { icon: "hub", name: "Communication and data", detail: "Networking modules, connectivity, and industrial data transmission." },
      ],
    },
    agent: {
      titleLead: "AI-powered sales",
      titleEmphasis: "agent",
      meta: "Included",
      intro:
        "A virtual assistant integrated into the website that engages visitors, identifies the category they need, shares the brands Intransit Tech distributes, and records contact information so a team member can close the sale.",
      features: [
        {
          icon: "support_agent",
          title: "Available 24 hours",
          detail:
            "Responds to initial inquiries immediately, regardless of the visitor's time zone or schedule.",
        },
        {
          icon: "category",
          title: "Recognizes categories",
          detail:
            "Visitors ask about a category and the agent responds with the brands Intransit Tech distributes.",
        },
        {
          icon: "contact_mail",
          title: "Captures prospect information",
          detail:
            "Requests name, company, and email address to deliver a qualified prospect to the sales team.",
        },
        {
          icon: "forward_to_inbox",
          title: "Notifies the team immediately",
          detail:
            "When a prospect is captured, it sends a notification to the sales inbox for timely follow-up.",
        },
      ],
    },
    chatHeader: {
      title: "Intransit Tech Assistant",
      status: "Online · replies in seconds",
      badge: "Example",
      placeholder: "Type your message…",
    },
    chat: [
      {
        from: "client",
        text:
          "Good afternoon. I need servomotors for a new assembly line. Do you distribute them?",
      },
      {
        from: "agent",
        text:
          "Good afternoon. Yes, we distribute servomotors from Fanuc, Yaskawa, Allen Bradley, and Kuka, among other brands. Do you have a preferred brand or power rating?",
      },
      {
        from: "client",
        text: "We haven't chosen a brand yet. We would need around 10 units.",
      },
      {
        from: "agent",
        text:
          "Glad to help. So an Intransit Tech advisor can share options with lead times and pricing, could you share your name, company, and email?",
      },
      {
        from: "client",
        text: "Luis Herrera, Industrial ACX, luis@acx.mx",
      },
      {
        from: "agent",
        text:
          "Thank you, Luis. An advisor will contact you within the next few hours. Is there anything else I can help you with in the meantime?",
      },
    ] as const,
    requisite: {
      label: "Requirement:",
      before: "the agent must be linked to a",
      or: "or",
      middle:
        " account. The monthly cost of that account is estimated at 10 to 30 USD with regular inquiry traffic and is covered by Intransit Tech. The agent's setup and training are included in this quote.",
    },
    investment: {
      title: "Investment",
      oneTimeLabel: "One-time payment · Full delivery",
      totalFootnote:
        "No additional fees. Visitor tracking, team training, and one year of website hosting are included from day one.",
      totalCaption: "USD · total",
      depositLabel: "Deposit · on approval",
      depositCaption: "50% to start",
      finalLabel: "Final payment · on delivery",
      finalCaption: "50% once everything is live",
      lines: {
        sitio: {
          title: "Professional website",
          detail:
            "Design, development, and launch of the website. Includes the 7 features, the 7 pages, and the base catalog organized by category.",
        },
        agente: {
          title: "AI sales agent",
          detail:
            "Agent setup, training with Intransit Tech's categories and brands, and integration with the website.",
        },
        bilingue: {
          title: "Bilingual version",
          detail:
            "Site content available in Spanish and English, language selector, and synchronization of both versions.",
        },
        hosting: {
          title: "One year of website hosting",
          detail:
            "is the service that keeps the site published and accessible online 24 hours a day. Included during the first 12 months; renewal from the second year onward is handled by Bravo Publicidad under an annual rate.",
          hostingWord: "Hosting",
        },
      },
      notes: [
        "Prices in US dollars (USD).",
        "Payment methods: wire transfer or card.",
        "Invoice available upon request.",
      ],
      validityNote: (date: string) => `Quote valid until ${date}.`,
    },
    nextStep: {
      label: "Next step",
      textBefore: "Approve this quote and cover the deposit of",
      textAfter:
        "to schedule the kickoff meeting. At that meeting we will define access credentials, priority services and categories, available assets (logo, photos, and copy), and the delivery calendar with specific dates per milestone.",
    },
    langToggle: {
      ariaLabel: "Change language",
    },
  },
} as const;

export const fmtUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtDate = (iso: string, lang: Lang) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(CONTENT[lang].locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
