export const FOLIO = "AE-2026-01";
export const ISSUED = "2026-06-26";
export const IVA_RATE = 0.08; // franja fronteriza norte (Tijuana)

export const CONTENT = {
  locale: "es-MX",
  htmlLang: "es",
  program: {
    name: "Impulso al Autoempleo",
    docType: "Presupuesto de aplicación de recursos",
  },
  beneficiary: {
    name: "Oscar Arredondo Mayoral",
    rfc: "", // se completa antes de imprimir
    business: "Desarrollo de software y servicios digitales",
    activity:
      "Diseño y desarrollo de sitios web, sistemas y presencia digital para pequeñas empresas.",
    email: "oarredondo@atisa.com",
    location: "Tijuana, Baja California",
  },
  labels: {
    docType: "Presupuesto de aplicación de recursos",
    folio: "Folio",
    issued: "Emitido",
    program: "Programa",
    beneficiary: "Beneficiario",
    rfc: "RFC",
    business: "Giro",
    activity: "Actividad",
    location: "Ubicación",
    subtotal: "Subtotal",
    subtotalNet: "Subtotal sin IVA",
    iva: "IVA (8%)",
    totalCat: "Total con IVA",
    total: "Total del apoyo",
    totalCaption: "MXN · IVA 8% incluido",
    supplier: "Proveedor de referencia",
    acceptance: "Firma del beneficiario",
    printPdf: "Imprimir / PDF",
    toolbarLabel: (folio: string, name: string) =>
      `Presupuesto ${folio} · ${name}`,
    pageOf: (cur: number, total: number) => `Página ${cur} · ${total}`,
  },
  intro: {
    eyebrow: "Impulso al Autoempleo · Aplicación de recursos",
    title: "Presupuesto de arranque",
    paragraph:
      "Desglose de la aplicación del apoyo de hasta $50,000 MXN para el arranque de la actividad de desarrollo de software y servicios digitales. El recurso se distribuye en las categorías autorizadas por el programa: mobiliario y equipo, y publicidad.",
  },
  categories: [
    {
      key: "equipo",
      label: "Mobiliario y equipo",
      icon: "desktop_windows",
      supplier: "Compustar (Tijuana)",
      items: [
        {
          name: "Laptop (computadora de trabajo)",
          detail: "Acer TravelMate P2 16\". Equipo principal para desarrollo y diseño.",
          price: 19895,
        },
        {
          name: "Monitor 27\"",
          detail: "ASUS VA27EQSB. Pantalla externa para trabajar a doble vista.",
          price: 3629,
        },
        {
          name: "Impresora multifuncional",
          detail: "Lexmark CX431ADW color con WiFi. Impresión, copia y escaneo.",
          price: 6495,
        },
        {
          name: "Silla de oficina",
          detail: "Acteck FLOE PRO ergonómica con soporte lumbar.",
          price: 2530,
        },
        {
          name: "Disco duro externo",
          detail: "ADATA HV320 2TB. Respaldo de proyectos e información.",
          price: 1885,
        },
        {
          name: "No-break / regulador",
          detail: "VICA B-flow 900VA. Protección del equipo ante fallas de energía.",
          price: 3025,
        },
        {
          name: "Teclado, mouse y webcam",
          detail: "Periféricos y cámara para videollamadas con clientes.",
          price: 1200,
        },
      ],
    },
    {
      key: "publicidad",
      label: "Publicidad",
      icon: "campaign",
      supplier: "Servicios de diseño y pauta digital",
      items: [
        {
          name: "Identidad de marca",
          detail: "Diseño de logotipo y papelería básica del negocio.",
          price: 4000,
        },
        {
          name: "Gestión de redes y pauta inicial",
          detail:
            "Apertura de redes y campañas pagadas en Meta y Google para captar clientes.",
          price: 6000,
        },
      ],
    },
  ],
  notes: [
    "Montos en pesos mexicanos (MXN), con IVA del 8% (franja fronteriza) incluido.",
    "Los precios de equipo son de referencia (Compustar, Tijuana) y se respaldan con cotización del proveedor al momento de la compra.",
    "El recurso se aplica únicamente en las categorías autorizadas por el programa.",
  ],
} as const;

export const fmtMxn = (n: number) =>
  `$${n.toLocaleString("es-MX", { maximumFractionDigits: 0 })}`;

export const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(CONTENT.locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
