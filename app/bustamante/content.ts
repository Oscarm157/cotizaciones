export type Lang = "es" | "en";

export const FOLIO = "WB-135";
export const ISSUED = "2026-06-01";
export const VALID = "2026-06-20";

export const PRICE_SITIO = 9500;
export const PRICE_AGENTE = 2700;
export const PRICE_BILINGUE = 2500;
export const TOTAL = PRICE_SITIO + PRICE_AGENTE + PRICE_BILINGUE;
export const DEPOSIT = Math.round(TOTAL * 0.5);

export const PRICE_HOSTING = 1500;
export const PRICE_DOMINIO = 1000;
export const ANNUAL = PRICE_HOSTING + PRICE_DOMINIO;

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
      name: "Hector Bustamante",
      short: "Hector Bustamante",
      descriptor: "Abogado de inmigración. Persona física.",
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
      optional: "Opcional",
      acceptance: "Aceptación",
      signatureOf: (name: string) => `Firma de ${name}`,
    },
    phases: [
      { num: "01", name: "Propuesta" },
      { num: "02", name: "El sitio" },
      { num: "03", name: "Contenido" },
      { num: "04", name: "Inversión" },
    ],
    intro: {
      eyebrow: "Propuesta · Sitio bilingüe + Agente de ventas IA + Agendado de consulta",
      titleLead: "Sitio web",
      titleEmphasis: "bilingüe",
      titleSuffix: "para",
      paragraph:
        "Propuesta para construir el sitio web bilingüe de Hector Bustamante: presenta sus áreas de práctica en inmigración, permite agendar consulta en línea, e incluye un agente de ventas con inteligencia artificial que atiende a los interesados y captura más prospectos las 24 horas.",
    },
    before: {
      heading: "Hoy",
      items: [
        "No hay un sitio propio donde el prospecto vea las áreas de inmigración que se atienden.",
        "Las consultas llegan por teléfono o referencia, sin un canal para agendar en línea.",
        "Las mismas dudas básicas se responden una y otra vez antes de la primera cita.",
        "Quien busca en inglés no encuentra una versión del sitio en su idioma.",
      ],
    },
    after: {
      heading: "Con el sitio nuevo",
      items: [
        "Áreas de práctica presentadas con claridad desde la primera pantalla.",
        "Solicitudes de consulta que llegan al correo con el tipo de caso identificado.",
        "Un agente que responde dudas comunes y reúne el contexto del caso, no solo los datos básicos de un formulario.",
        "Sitio en español e inglés para atender a ambos lados de la frontera.",
      ],
    },
    benefits: {
      title: "Qué cambia en el día a día",
      meta: "4 beneficios",
      items: [
        {
          icon: "schedule",
          title: "Menos tiempo explicando lo básico",
          detail:
            "El sitio aclara las áreas de práctica y el proceso general. El prospecto llega a la consulta con contexto y la cita se aprovecha en su caso.",
        },
        {
          icon: "event_available",
          title: "Consultas agendadas y ordenadas",
          detail:
            "El formulario de agendado captura nombre, contacto y tipo de trámite. Cada solicitud llega completa al correo, lista para dar seguimiento.",
        },
        {
          icon: "language",
          title: "Atiende en español e inglés",
          detail:
            "El visitante elige su idioma con un toque. Mismo contenido, sin perder al prospecto que busca en inglés.",
        },
        {
          icon: "insights",
          title: "Datos sobre lo que más consultan",
          detail:
            "Cada mes se reporta qué áreas de práctica reciben más visitas. Información para decidir en qué enfocar la atención.",
        },
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
            "Funciona correctamente en computadora y celular. Transmite la seriedad y la confianza que un cliente busca en un abogado.",
        },
        {
          icon: "gavel",
          title: "Áreas de práctica presentadas con claridad",
          detail:
            "Una sección por cada área de inmigración, con su explicación breve y un botón para agendar consulta.",
        },
        {
          icon: "event_available",
          title: "Agendado de consulta en línea",
          detail:
            "El prospecto deja sus datos y el tipo de caso. La solicitud llega al correo identificada, lista para confirmar la cita.",
        },
        {
          icon: "article",
          title: "Blog precargado",
          detail:
            "Arranca con artículos iniciales sobre trámites y cambios de ley migratoria, para responder las dudas más frecuentes.",
        },
        {
          icon: "call",
          title: "Contacto siempre visible",
          detail:
            "Teléfono y WhatsApp fijos en el encabezado. Desde el celular basta un toque para escribir o llamar.",
        },
        {
          icon: "monitoring",
          title: "Medición de visitas desde el primer día",
          detail:
            "Permite conocer cuántas visitas recibe el sitio, de qué canal llegan y qué áreas consultan.",
        },
      ],
    },
    pages: {
      title: "Páginas del sitio",
      meta: "5 secciones",
      items: [
        { name: "Inicio", detail: "Presentación, áreas destacadas y acceso directo a agendar consulta." },
        { name: "Áreas de práctica", detail: "Cada área de inmigración explicada, con botón para agendar." },
        { name: "Sobre el abogado", detail: "Trayectoria, enfoque y formación de Hector Bustamante." },
        { name: "Blog", detail: "Artículos sobre trámites y cambios de ley, precargados al arranque." },
        { name: "Agendar consulta / Contacto", detail: "Formulario de agendado, teléfono, WhatsApp y correo." },
      ],
    },
    practiceAreas: {
      title: "Áreas de práctica · en el sitio",
      meta: "8 secciones",
      intro:
        "El sitio incluirá una sección para cada área de inmigración que Hector Bustamante atienda. La lista final se confirma en la reunión de arranque; estas son las secciones base propuestas.",
      items: [
        { icon: "family_restroom", name: "Visas familiares", detail: "Peticiones para cónyuge, hijos y familiares directos." },
        { icon: "card_membership", name: "Residencia permanente", detail: "Trámite de Green Card y ajuste de estatus." },
        { icon: "how_to_reg", name: "Ciudadanía y naturalización", detail: "Proceso para obtener la ciudadanía." },
        { icon: "work", name: "Visas de trabajo y empleo", detail: "Visas de empleo y peticiones laborales." },
        { icon: "balance", name: "Defensa contra deportación", detail: "Representación en corte de inmigración." },
        { icon: "shield", name: "Asilo y protección", detail: "Solicitudes de asilo y casos de protección." },
        { icon: "school", name: "DACA y casos de jóvenes", detail: "Solicitudes y renovaciones de DACA." },
        { icon: "description", name: "Permisos y renovaciones", detail: "Permisos de trabajo, TPS y renovaciones de documentos." },
      ],
    },
    agent: {
      titleLead: "Agente de ventas con",
      titleEmphasis: "inteligencia artificial",
      meta: "Incluido",
      intro:
        "Un agente de ventas integrado al sitio que conversa con cada visitante interesado, entiende qué trámite necesita y reúne el contexto de su caso. Al atender a toda hora, captura prospectos que de otro modo se irían sin dejar sus datos, y los entrega con contexto, no solo con los campos básicos de un formulario, listos para que Hector dé seguimiento y agende la consulta.",
      features: [
        {
          icon: "support_agent",
          title: "Disponible las 24 horas",
          detail:
            "Responde la primera consulta de inmediato, sin importar la hora ni el día en que el prospecto entre al sitio.",
        },
        {
          icon: "fact_check",
          title: "Identifica el tipo de caso",
          detail:
            "Pregunta al visitante y orienta sobre el área que corresponde (familiar, residencia, ciudadanía, defensa).",
        },
        {
          icon: "contact_mail",
          title: "Reúne el contexto, no solo el dato",
          detail:
            "Junto con nombre y contacto, recoge la situación del caso, para que el prospecto llegue con contexto y no solo con los campos básicos de un formulario.",
        },
        {
          icon: "forward_to_inbox",
          title: "Notifica de inmediato",
          detail:
            "Al registrar un prospecto, envía la notificación al correo para dar seguimiento oportuno.",
        },
      ],
    },
    chatHeader: {
      title: "Asistente · Bustamante",
      status: "En línea · responde en segundos",
      badge: "Ejemplo",
      placeholder: "Escriba su mensaje…",
    },
    chat: [
      {
        from: "client",
        text:
          "Buenas tardes. Mi esposa es ciudadana y quiero arreglar mi residencia. ¿Llevan ese tipo de casos?",
      },
      {
        from: "agent",
        text:
          "Buenas tardes. Sí, llevamos peticiones familiares y ajuste de estatus por matrimonio. ¿Usted se encuentra dentro de Estados Unidos o fuera del país?",
      },
      {
        from: "client",
        text: "Estoy aquí, en Estados Unidos.",
      },
      {
        from: "agent",
        text:
          "Perfecto. Para que el abogado Bustamante revise su caso y le proponga fecha de consulta, ¿me comparte su nombre, teléfono y correo?",
      },
      {
        from: "client",
        text: "Jorge Medina, 619 555 0142, jorge.medina@correo.com",
      },
      {
        from: "agent",
        text:
          "Gracias, Jorge. El abogado se pondrá en contacto con usted para confirmar la consulta. ¿Hay algo más en lo que pueda orientarle mientras tanto?",
      },
    ] as const,
    requisite: {
      label: "Requisito:",
      before: "el agente debe vincularse con una cuenta de",
      or: "o",
      middle:
        ". El costo mensual de dicha cuenta se estima entre 10 y 30 USD con un tráfico regular de consultas, y corre por parte del cliente. La configuración y el entrenamiento del agente están incluidos en la presente cotización.",
    },
    investment: {
      title: "Inversión",
      oneTimeLabel: "Pago único · Entrega completa",
      totalFootnote:
        "Incluye la medición de visitas desde el primer día.",
      totalCaption: "total",
      depositLabel: "Anticipo · al aprobar",
      depositCaption: "50% para iniciar",
      finalLabel: "Liquidación · al entregar",
      finalCaption: "50% con todo publicado",
      lines: {
        sitio: {
          title: "Sitio web profesional",
          detail:
            "Diseño, desarrollo y publicación del sitio: las 5 páginas, las áreas de práctica, el agendado de consulta y el blog precargado.",
        },
        agente: {
          title: "Agente de ventas con IA",
          detail:
            "Configuración del agente, entrenamiento con las áreas de práctica de inmigración e integración al sitio.",
        },
        bilingue: {
          title: "Versión bilingüe",
          detail:
            "Contenido del sitio en español e inglés, selector de idioma y sincronización de ambas versiones.",
        },
      },
      annual: {
        title: "Hospedaje y dominio",
        intro:
          "Se cubre a la entrega del sitio y se renueva cada año para mantenerlo publicado y el dominio activo. No incluye cambios ni modificaciones al sitio.",
        caption: "pago anual",
        subtotalLabel: "Total anual",
        lines: {
          hosting: {
            title: "Hospedaje",
            detail: "Servicio que mantiene el sitio publicado y accesible las 24 horas.",
          },
          dominio: {
            title: "Dominio",
            detail: "Registro y renovación del nombre de internet del sitio (por ejemplo, sudespacho.com).",
          },
        },
      },
      notes: [
        "Precios en pesos mexicanos (MXN).",
        "Formas de pago: transferencia o tarjeta.",
      ],
      validityNote: (date: string) => `Vigencia de la cotización: hasta el ${date}.`,
    },
    nextStep: {
      label: "Siguiente paso",
      textBefore: "Aprobar la presente cotización y cubrir el anticipo de",
      textAfter:
        "para agendar la reunión de arranque. En dicha reunión se confirmarán las áreas de práctica a incluir, los materiales disponibles (fotografía, textos y logotipo), los datos de contacto y el calendario con fechas específicas por entrega.",
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
      roleLabel: "Project lead",
    },
    client: {
      name: "Hector Bustamante",
      short: "Hector Bustamante",
      descriptor: "Immigration lawyer. Sole practitioner.",
    },
    labels: {
      quote: "Quote",
      quoteNumber: "No.",
      issued: "Issued",
      validUntil: "Valid through",
      from: "From",
      preparedFor: "Prepared for",
      printPdf: "Print / PDF",
      pageOf: (cur: number, total: number) => `Page ${cur} of ${total}`,
      toolbarLabel: (folio: string, client: string) => `Quote ${folio} · ${client}`,
      included: "Included",
      optional: "Optional",
      acceptance: "Acceptance",
      signatureOf: (name: string) => `Signed by ${name}`,
    },
    phases: [
      { num: "01", name: "Proposal" },
      { num: "02", name: "The site" },
      { num: "03", name: "Content" },
      { num: "04", name: "Investment" },
    ],
    intro: {
      eyebrow: "Proposal · Bilingual site + AI sales agent + Online booking",
      titleLead: "A bilingual",
      titleEmphasis: "website",
      titleSuffix: "for",
      paragraph:
        "This proposal covers a bilingual website for Hector Bustamante: it presents his immigration practice areas, lets prospects book a consultation online, and includes an AI sales agent that engages interested visitors and captures more prospects around the clock.",
    },
    before: {
      heading: "Today",
      items: [
        "There's no site of his own where prospects can see the immigration areas he handles.",
        "Inquiries come in by phone or referral, with no way to book online.",
        "The same basic questions get answered over and over before the first appointment.",
        "Someone searching in English can't find a version of the site in their language.",
      ],
    },
    after: {
      heading: "With the new website",
      items: [
        "Practice areas laid out clearly from the first screen.",
        "Consultation requests that reach the inbox with the case type already noted.",
        "An agent that answers common questions and gathers the case context, not just the basic fields of a form.",
        "A site in Spanish and English to serve both sides of the border.",
      ],
    },
    benefits: {
      title: "What this changes day to day",
      meta: "4 benefits",
      items: [
        {
          icon: "schedule",
          title: "Less time spent on the basics",
          detail:
            "The site explains the practice areas and the general process. Prospects arrive with context, so the consultation is spent on their case.",
        },
        {
          icon: "event_available",
          title: "Booked, organized consultations",
          detail:
            "The booking form captures name, contact, and case type. Every request reaches the inbox complete and ready for follow-up.",
        },
        {
          icon: "language",
          title: "Serves Spanish and English",
          detail:
            "Visitors pick their language with one tap. Same content, without losing the prospect who searches in English.",
        },
        {
          icon: "insights",
          title: "Data on what gets the most interest",
          detail:
            "Each month you'll see which practice areas draw the most visits, useful for deciding where to focus.",
        },
      ],
    },
    features: {
      title: "What's included in the site",
      meta: "6 features",
      items: [
        {
          icon: "design_services",
          title: "Professional design, desktop and mobile",
          detail:
            "Works cleanly on desktop and mobile. Conveys the trust and seriousness a client looks for in a lawyer.",
        },
        {
          icon: "gavel",
          title: "Practice areas presented clearly",
          detail:
            "A section for each immigration area, with a short explanation and a button to book a consultation.",
        },
        {
          icon: "event_available",
          title: "Online consultation booking",
          detail:
            "The prospect leaves their details and case type. The request reaches the inbox labeled, ready to confirm the appointment.",
        },
        {
          icon: "article",
          title: "Pre-loaded blog",
          detail:
            "Starts with initial articles on filings and changes in immigration law, to answer the most common questions.",
        },
        {
          icon: "call",
          title: "Contact always visible",
          detail:
            "Phone and WhatsApp pinned in the header. On mobile, a single tap to message or call.",
        },
        {
          icon: "monitoring",
          title: "Visitor tracking from day one",
          detail:
            "See how many visitors the site gets, where they come from, and which areas they look at.",
        },
      ],
    },
    pages: {
      title: "Pages on the site",
      meta: "5 sections",
      items: [
        { name: "Home", detail: "Introduction, featured areas, and direct access to booking." },
        { name: "Practice areas", detail: "Each immigration area explained, with a button to book." },
        { name: "About the lawyer", detail: "Background, approach, and training of Hector Bustamante." },
        { name: "Blog", detail: "Articles on filings and law changes, pre-loaded at launch." },
        { name: "Book a consultation / Contact", detail: "Booking form, phone, WhatsApp, and email." },
      ],
    },
    practiceAreas: {
      title: "Practice areas · on the site",
      meta: "8 sections",
      intro:
        "The site will include a section for each immigration area Hector Bustamante handles. The final list is confirmed at the kickoff meeting; these are the proposed base sections.",
      items: [
        { icon: "family_restroom", name: "Family-based visas", detail: "Petitions for spouse, children, and immediate relatives." },
        { icon: "card_membership", name: "Permanent residency", detail: "Green Card filings and adjustment of status." },
        { icon: "how_to_reg", name: "Citizenship and naturalization", detail: "The process to obtain citizenship." },
        { icon: "work", name: "Work and employment visas", detail: "Employment visas and labor petitions." },
        { icon: "balance", name: "Deportation defense", detail: "Representation in immigration court." },
        { icon: "shield", name: "Asylum and protection", detail: "Asylum applications and protection cases." },
        { icon: "school", name: "DACA and youth cases", detail: "DACA applications and renewals." },
        { icon: "description", name: "Permits and renewals", detail: "Work permits, TPS, and document renewals." },
      ],
    },
    agent: {
      titleLead: "AI sales",
      titleEmphasis: "agent",
      meta: "Included",
      intro:
        "A sales agent built into the site that talks with every interested visitor, understands which matter they need, and gathers the context of their case. By responding at any hour, it captures prospects who would otherwise leave without leaving their details, and hands them over with context, not just the basic fields of a form, ready for Hector to follow up and book the consultation.",
      features: [
        {
          icon: "support_agent",
          title: "Available around the clock",
          detail:
            "Answers the first inquiry right away, no matter the time or day a prospect lands on the site.",
        },
        {
          icon: "fact_check",
          title: "Identifies the case type",
          detail:
            "Asks the visitor and points them to the right area (family, residency, citizenship, defense).",
        },
        {
          icon: "contact_mail",
          title: "Gathers context, not just data",
          detail:
            "Along with name and contact, it captures the situation of the case, so the lead arrives with context, not just the basic fields of a form.",
        },
        {
          icon: "forward_to_inbox",
          title: "Notifies you right away",
          detail:
            "Every new prospect triggers an alert to the inbox for timely follow-up.",
        },
      ],
    },
    chatHeader: {
      title: "Assistant · Bustamante",
      status: "Online · replies in seconds",
      badge: "Sample",
      placeholder: "Type your message…",
    },
    chat: [
      {
        from: "client",
        text:
          "Hi. My wife is a citizen and I want to get my residency. Do you handle those cases?",
      },
      {
        from: "agent",
        text:
          "Hello. Yes, we handle family petitions and adjustment of status through marriage. Are you currently inside the United States or outside the country?",
      },
      {
        from: "client",
        text: "I'm here, in the United States.",
      },
      {
        from: "agent",
        text:
          "Great. So attorney Bustamante can review your case and propose a consultation date, could I get your name, phone, and email?",
      },
      {
        from: "client",
        text: "Jorge Medina, 619 555 0142, jorge.medina@email.com",
      },
      {
        from: "agent",
        text:
          "Thank you, Jorge. The attorney will reach out to confirm the consultation. Anything else I can help point you to in the meantime?",
      },
    ] as const,
    requisite: {
      label: "Requirement:",
      before: "the agent needs to be connected to a",
      or: "or",
      middle:
        " account. That account runs an estimated 10–30 USD per month under regular traffic and is covered by the client. Setup and training of the agent are included in this quote.",
    },
    investment: {
      title: "Investment",
      oneTimeLabel: "One-time payment · Full delivery",
      totalFootnote:
        "Includes visitor tracking from day one.",
      totalCaption: "total",
      depositLabel: "Deposit · on approval",
      depositCaption: "50% to get started",
      finalLabel: "Balance · on delivery",
      finalCaption: "50% once everything is live",
      lines: {
        sitio: {
          title: "Professional website",
          detail:
            "Design, development, and launch of the site: all 5 pages, the practice areas, online booking, and the pre-loaded blog.",
        },
        agente: {
          title: "AI sales agent",
          detail:
            "Agent setup, training on the immigration practice areas, and integration with the site.",
        },
        bilingue: {
          title: "Bilingual version",
          detail:
            "Site content in Spanish and English, a language selector, and both versions kept in sync.",
        },
      },
      annual: {
        title: "Hosting and domain",
        intro:
          "Paid on delivery of the site and renewed each year to keep it published and the domain active. It does not cover changes or modifications to the site.",
        caption: "annual",
        subtotalLabel: "Annual total",
        lines: {
          hosting: {
            title: "Hosting",
            detail: "The service that keeps the site published and reachable 24 hours a day.",
          },
          dominio: {
            title: "Domain",
            detail: "Registration and renewal of the site's internet name (for example, yourfirm.com).",
          },
        },
      },
      notes: [
        "Prices in Mexican pesos (MXN).",
        "Payment: wire transfer or card.",
      ],
      validityNote: (date: string) => `Quote valid through ${date}.`,
    },
    nextStep: {
      label: "Next step",
      textBefore: "Approve this quote and send the deposit of",
      textAfter:
        "to lock in the kickoff meeting. In that meeting we'll confirm the practice areas to include, available assets (photo, copy, and logo), contact details, and the delivery calendar with specific dates per milestone.",
    },
    langToggle: {
      ariaLabel: "Change language",
    },
  },
} as const;

export const fmtMxn = (n: number) =>
  `$${n.toLocaleString("es-MX", { maximumFractionDigits: 0 })} MXN`;

export const fmtDate = (iso: string, lang: Lang) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(CONTENT[lang].locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
