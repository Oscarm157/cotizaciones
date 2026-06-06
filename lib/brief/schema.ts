// Esquema maestro del brief: universal y data-driven.
// Las secciones condicionales se muestran segun los entregables de cada cotizacion
// (DeliverableFlags). La visibilidad se resuelve en el servidor (lib/brief/visibility.ts)
// y al cliente solo cruza un esquema plano sin funciones.

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "radio"
  | "checkboxes"
  | "file"
  | "color"
  | "date"
  | "list";

export type Option =
  | string
  | { value: string; label: string; description?: string; icon?: string };

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  accept?: string;
  maxLength?: number;
}

export interface DeliverableFlags {
  agent: boolean;
  autoadmin: boolean;
  bilingual: boolean;
  social: boolean;
  portal: boolean;
  blog: boolean;
  booking: boolean;
  pages: number;
}

export interface Section {
  id: string;
  title: string;
  step: 1 | 2 | 3;
  description?: string;
  expertTip?: string;
  visibleIf?: (flags: DeliverableFlags) => boolean;
  fields: Field[];
}

// Version serializable (sin visibleIf) que cruza a los client components.
export type PlainSection = Omit<Section, "visibleIf">;

const SECTORS: Option[] = [
  "Tecnología",
  "Legal / Gubernamental",
  "Salud",
  "Educación",
  "Comercio / Retail",
  "Restaurantes / Alimentos",
  "Inmobiliario",
  "ONG / Asociaciones",
  "Finanzas / Seguros",
  "Manufactura / Industrial",
  "Consultoría",
  "Entretenimiento / Medios",
  "Otro",
];

const TONE_OPTIONS: Option[] = [
  { value: "formal", label: "Formal", description: "Profesional, institucional, serio", icon: "gavel" },
  { value: "semiformal", label: "Semi-formal", description: "Profesional pero cercano y accesible", icon: "handshake" },
  { value: "casual", label: "Casual", description: "Relajado, amigable, conversacional", icon: "sentiment_satisfied" },
  { value: "technical", label: "Técnico", description: "Especializado, datos, precisión", icon: "precision_manufacturing" },
];

const VISUAL_STYLE_OPTIONS: Option[] = [
  { value: "modern", label: "Moderno / Minimalista", description: "Limpio, mucho espacio, tipografía grande", icon: "grid_view" },
  { value: "corporate", label: "Corporativo / Clásico", description: "Tradicional, confiable, estructurado", icon: "business" },
  { value: "creative", label: "Creativo / Bold", description: "Colores vibrantes, dinámico, atrevido", icon: "palette" },
  { value: "elegant", label: "Elegante / Premium", description: "Sofisticado, exclusivo", icon: "diamond" },
];

const SUGGESTED_PAGES: Option[] = [
  "Home",
  "Nosotros",
  "Servicios",
  "Portafolio / Proyectos",
  "Blog / Noticias",
  "Contacto",
  "FAQ",
  "Testimonios",
  "Precios / Planes",
  "Equipo",
  "Tienda / E-commerce",
  "Galería",
  "Eventos",
  "Descargas / Recursos",
];

const CONTENT_STATUS_OPTIONS: Option[] = [
  { value: "ready", label: "Tengo todo el contenido listo (textos, fotos, videos)" },
  { value: "partial", label: "Tengo contenido parcial, necesito apoyo con el resto" },
  { value: "none", label: "No tengo contenido, necesito que se genere todo" },
];

const PHOTO_STATUS_OPTIONS: Option[] = [
  { value: "yes", label: "Sí, tengo fotos profesionales listas" },
  { value: "need", label: "No, necesito coordinar sesiones fotográficas" },
  { value: "na", label: "No aplica para mi proyecto" },
];

export const BRIEF_SCHEMA: Section[] = [
  {
    id: "identidad",
    step: 1,
    title: "Identidad y marca",
    description: "Lo que ya define a tu marca: nombre, logo, colores y personalidad.",
    expertTip:
      "Un logo nítido y colores bien definidos desde el inicio generan más confianza y aceleran el diseño.",
    fields: [
      { id: "projectName", type: "text", label: "Nombre del proyecto", placeholder: "Portal Rentasa", required: true },
      { id: "companyName", type: "text", label: "Nombre de la empresa o marca", placeholder: "Rentasa, Proyectos Inmobiliarios", required: true },
      { id: "sector", type: "select", label: "Sector", options: SECTORS },
      { id: "logo", type: "file", label: "Logo", description: "Sube tu logo en alta calidad (PNG, SVG, AI, EPS)", accept: ".png,.svg,.ai,.eps,.pdf,.jpg,.jpeg" },
      { id: "brandColors", type: "color", label: "Colores de marca", description: "Si ya tienes una paleta definida, indícala aquí." },
      { id: "slogan", type: "text", label: "Eslogan o tagline", placeholder: "Si tienes uno" },
      { id: "brandValues", type: "textarea", label: "¿Qué valores o personalidad debe transmitir la marca?", placeholder: "Cercana, confiable, profesional...", maxLength: 400 },
      { id: "tone", type: "radio", label: "Tono de comunicación", options: TONE_OPTIONS },
      { id: "currentWebsite", type: "text", label: "Sitio web actual (si existe)", placeholder: "https://" },
      { id: "socialInstagram", type: "text", label: "Instagram", placeholder: "@usuario" },
      { id: "socialFacebook", type: "text", label: "Facebook", placeholder: "facebook.com/..." },
      { id: "socialLinkedin", type: "text", label: "LinkedIn", placeholder: "linkedin.com/..." },
    ],
  },
  {
    id: "vision",
    step: 1,
    title: "Visión y objetivos",
    description: "Qué quieres lograr con el proyecto y cómo se vería el éxito.",
    expertTip:
      "Mientras más claro tengas el objetivo, más fácil es diseñar algo que realmente convierta.",
    fields: [
      { id: "vision", type: "textarea", label: "¿Qué quieres lograr con este sitio?", placeholder: "Generar leads, vender en línea, dar información...", maxLength: 1000, required: true },
      { id: "objectives", type: "textarea", label: "¿Cómo medirías el éxito en 6 meses?", placeholder: "Más solicitudes, más visitas, mejor imagen...", maxLength: 1000, required: true },
      { id: "desiredAction", type: "text", label: "¿Cuál es la acción principal que debe hacer el visitante?", placeholder: "Llenar formulario, agendar, comprar, llamar..." },
      { id: "differentiator", type: "textarea", label: "¿Qué te diferencia de la competencia?", placeholder: "Por qué te eligen a ti", maxLength: 600 },
    ],
  },
  {
    id: "audiencia",
    step: 1,
    title: "Audiencia",
    description: "A quién le hablas y contra quién compites.",
    fields: [
      { id: "targetAudience", type: "textarea", label: "¿Quién es tu cliente ideal?", placeholder: "Edad, ubicación, qué busca, qué le preocupa...", maxLength: 800, required: true },
      { id: "competitors", type: "textarea", label: "Competidores o referentes del sector", placeholder: "Nombres o sitios web", maxLength: 600 },
    ],
  },
  {
    id: "contenido",
    step: 2,
    title: "Contenido y páginas",
    description: "Las secciones del sitio y quién aporta los textos y las fotos.",
    expertTip:
      "Una estructura simple con pocas secciones principales retiene mejor que un menú con diez opciones.",
    fields: [
      { id: "pages", type: "checkboxes", label: "Páginas que necesitas", description: "Marca las secciones del sitio.", options: SUGGESTED_PAGES, required: true },
      { id: "contentStatus", type: "radio", label: "¿En qué estado está tu contenido?", options: CONTENT_STATUS_OPTIONS },
      { id: "contentProvider", type: "radio", label: "¿Quién entrega los textos y las fotos?", options: [
        { value: "client", label: "Yo entrego textos y fotos" },
        { value: "agency", label: "Que la agencia los genere" },
        { value: "ai", label: "Generar el contenido con IA" },
        { value: "mixed", label: "Mixto" },
      ] },
      { id: "services", type: "list", label: "Servicios que quieres incluir en el sitio", description: "Agrega los servicios que ofreces, uno por uno.", placeholder: "Ej. Consultoría fiscal" },
      { id: "hasPhotos", type: "radio", label: "¿Tienes fotografía profesional?", options: PHOTO_STATUS_OPTIONS },
      { id: "materials", type: "file", label: "Material existente", description: "Textos, fotos, presentaciones o documentos que ya tengas." },
    ],
  },
  {
    id: "agente",
    step: 2,
    title: "Agente de IA",
    description: "El asistente que responde a tus visitantes.",
    visibleIf: (f) => f.agent,
    fields: [
      { id: "agentScope", type: "textarea", label: "¿Qué debe resolver el agente?", placeholder: "Preguntas frecuentes, agendar, dar información de productos...", maxLength: 800 },
      { id: "agentData", type: "textarea", label: "¿Qué datos debe capturar de cada visitante?", placeholder: "Nombre, teléfono, presupuesto, interés...", maxLength: 500 },
      { id: "agentTone", type: "text", label: "¿Cómo debe sonar el agente?", placeholder: "Formal, cercano, breve..." },
      { id: "agentEscalation", type: "text", label: "¿Cuándo debe pasar la conversación a una persona?", placeholder: "Cuando piden cotización, agendar visita..." },
    ],
  },
  {
    id: "bilingue",
    step: 2,
    title: "Versión bilingüe",
    description: "El sitio en más de un idioma.",
    visibleIf: (f) => f.bilingual,
    fields: [
      { id: "languages", type: "text", label: "Idiomas del sitio", placeholder: "Español e inglés" },
      { id: "translationProvider", type: "radio", label: "¿Quién entrega las traducciones?", options: [
        { value: "client", label: "Yo entrego las traducciones" },
        { value: "agency", label: "Que la agencia traduzca" },
        { value: "mixed", label: "Mixto" },
      ] },
      { id: "bilingualScope", type: "textarea", label: "¿Qué contenido necesita traducción?", placeholder: "Todo el sitio, solo páginas clave...", maxLength: 400 },
    ],
  },
  {
    id: "bilinguepref",
    step: 2,
    title: "Idioma",
    description: "¿En qué idiomas quieres el sitio?",
    visibleIf: () => false,
    fields: [
      { id: "wantsBilingual", type: "checkboxes", label: "", options: ["Sí, lo quiero bilingüe (español e inglés)"] },
    ],
  },
  {
    id: "redes",
    step: 2,
    title: "Gestión de redes sociales",
    description: "El manejo de tus redes incluido en la propuesta.",
    visibleIf: (f) => f.social,
    fields: [
      { id: "socialNetworks", type: "checkboxes", label: "¿Qué redes manejamos?", options: ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "X / Twitter"] },
      { id: "socialHandles", type: "textarea", label: "Cuentas actuales", placeholder: "Links o usuarios de tus redes", maxLength: 300 },
      { id: "socialGoals", type: "textarea", label: "¿Qué buscas con las redes?", placeholder: "Más seguidores, vender, posicionar marca...", maxLength: 400 },
      { id: "socialCadence", type: "text", label: "Frecuencia de publicación esperada", placeholder: "3 posts por semana, diario..." },
    ],
  },
  {
    id: "portal",
    step: 2,
    title: "Catálogo o portal",
    description: "El listado con filtros que verán tus usuarios.",
    visibleIf: (f) => f.portal,
    fields: [
      { id: "catalogType", type: "text", label: "¿Qué se lista en el catálogo?", placeholder: "Propiedades, productos, servicios..." },
      { id: "catalogVolume", type: "text", label: "¿Cuántos elementos aproximadamente?", placeholder: "50, 200, más de 1000..." },
      { id: "catalogFilters", type: "textarea", label: "¿Por qué deben poder filtrar los usuarios?", placeholder: "Precio, ubicación, tipo, categoría...", maxLength: 400 },
      { id: "catalogSource", type: "radio", label: "¿Quién carga la información del catálogo?", options: [
        { value: "client", label: "Yo cargo la información" },
        { value: "agency", label: "Que la agencia la cargue" },
        { value: "import", label: "Importar de un sistema actual" },
      ] },
    ],
  },
  {
    id: "contacto",
    step: 3,
    title: "Contacto y ubicación",
    description: "Los datos que verán tus clientes y por donde te contactan.",
    fields: [
      { id: "contactPhone", type: "text", label: "Teléfono", placeholder: "664 000 0000" },
      { id: "contactWhatsapp", type: "text", label: "WhatsApp", placeholder: "Número con lada" },
      { id: "contactEmail", type: "text", label: "Correo de contacto", placeholder: "contacto@...", required: true },
      { id: "contactAddress", type: "text", label: "Dirección física (si aplica)", placeholder: "Calle, número, ciudad" },
      { id: "businessHours", type: "text", label: "Horario de atención", placeholder: "Lun a Vie, 9 a 18 h" },
    ],
  },
  {
    id: "dominio",
    step: 3,
    title: "Dominio y hosting",
    description: "La dirección del sitio y dónde vive.",
    fields: [
      { id: "domainStatus", type: "radio", label: "¿Tienes dominio?", options: [
        { value: "have", label: "Ya tengo dominio" },
        { value: "register", label: "Quiero registrar uno nuevo" },
        { value: "advice", label: "Necesito asesoría" },
      ] },
      { id: "domainName", type: "text", label: "Dominio (actual o deseado)", placeholder: "mimarca.com" },
      { id: "hostingStatus", type: "radio", label: "¿Tienes hosting?", options: [
        { value: "have", label: "Ya tengo hosting" },
        { value: "need", label: "Necesito hosting" },
        { value: "unsure", label: "No estoy seguro" },
      ] },
      { id: "emailHosting", type: "radio", label: "¿Necesitas correos con tu dominio?", options: [
        { value: "yes", label: "Sí, correos @midominio" },
        { value: "no", label: "No" },
        { value: "unsure", label: "No estoy seguro" },
      ] },
    ],
  },
  {
    id: "integraciones",
    step: 3,
    title: "Integraciones",
    description: "Herramientas externas que se conectan al sitio.",
    fields: [
      { id: "integrations", type: "checkboxes", label: "¿Qué necesitas integrar?", options: [
        "WhatsApp",
        "Agendado de citas (Calendly)",
        "Pasarela de pago",
        "CRM",
        "Google Analytics",
        "Meta Pixel",
        "Newsletter / email marketing",
        "Mapa (Google Maps)",
        "Chat en vivo",
      ] },
      { id: "analyticsAccount", type: "radio", label: "Cuentas de analítica y publicidad", options: [
        { value: "client", label: "Yo proporciono las cuentas" },
        { value: "agency", label: "Que la agencia las cree" },
        { value: "unsure", label: "No estoy seguro" },
      ] },
    ],
  },
  {
    id: "plazos",
    step: 3,
    title: "Plazos",
    description: "Tiempos y fechas que debemos respetar.",
    fields: [
      { id: "hardDeadline", type: "date", label: "¿Tienes una fecha límite firme?" },
      { id: "launchDriver", type: "textarea", label: "¿Hay algo detrás de esa fecha?", placeholder: "Evento, campaña, temporada, lanzamiento...", maxLength: 300 },
    ],
  },
  {
    id: "referencias",
    step: 3,
    title: "Referencias e inspiración",
    description: "El look and feel que buscas y lo que quieres evitar.",
    fields: [
      { id: "visualStyle", type: "radio", label: "Estilo visual preferido", options: VISUAL_STYLE_OPTIONS },
      { id: "referenceSites", type: "textarea", label: "Sitios que te gustan y por qué", placeholder: "Links + qué te gusta de cada uno", maxLength: 600 },
      { id: "dislikedSites", type: "textarea", label: "Sitios o estilos que NO te gustan", placeholder: "Qué evitar", maxLength: 400 },
      { id: "unwantedStyles", type: "text", label: "Colores o estilos a evitar", placeholder: "Nada de morados, nada saturado..." },
      { id: "inspirationFiles", type: "file", label: "Imágenes de inspiración", description: "Capturas o referencias visuales." },
    ],
  },
];
