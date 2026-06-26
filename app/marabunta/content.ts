export const FOLIO = "MCS-0042";
export const FECHA = "2026-06-22";
export const VIGENCIA = "15 días naturales";

export const IVA_RATE = 0.16;
export const SUBTOTAL = 8500;
export const IVA = Math.round(SUBTOTAL * IVA_RATE * 100) / 100;
export const TOTAL = SUBTOTAL + IVA;
export const DEPOSIT = Math.round(TOTAL * 0.5 * 100) / 100;

export const BRAND = {
  magenta: "#E11D74",
  orange: "#FF7A1A",
  ink: "#1B1220",
  tint: "#FFF5F9",
  gradient: "linear-gradient(120deg,#E11D74,#FF7A1A)",
};

export const CONTENT = {
  locale: "es-MX",
  emisor: {
    brand: "marabunta",
    brandSuffix: "creative studio",
    legal: "Kimberly Carolina Celaya Solano",
    rfc: "CESK940811S51",
    regimen: "Régimen Simplificado de Confianza (626)",
    address: "Río Suchiate 13-2, Col. Revolución, C.P. 22015, Tijuana, B.C.",
    phone: "664 522 1038",
    site: "facebook.com/marabuntacreativestudio",
    siteUrl: "https://www.facebook.com/marabuntacreativestudio/",
  },
  cliente: {
    name: "Oscar Arredondo Mayoral",
    rfc: "AEMO9407152DA",
    regimen: "Régimen Simplificado de Confianza (RESICO)",
    address: "Av. Río Colorado 9839, Col. Revolución, C.P. 22015, Tijuana, B.C.",
    descriptor: "Empresa de desarrollo de software",
    email: "[correo]",
  },
  meta: {
    responsable: "Kimberly Celaya",
  },
  item: {
    qty: 1,
    title: "Kit de arranque de publicidad digital",
    includes: [
      "Apertura y configuración de Instagram y Facebook",
      "Línea visual de marca: colores, tipografías y plantillas",
      "Calendario y diseño de las publicaciones del primer mes",
      "Arranque de pauta en Meta y Google",
      "Conexión de analítica y reporte de alcance",
    ],
  },
  observaciones: [
    { label: "Anticipo", value: "50% para iniciar; resto al entregar el arranque." },
    { label: "Arranque", value: "3 a 5 días hábiles después del anticipo." },
    { label: "Vigencia", value: "15 días naturales a partir de la fecha de emisión." },
    { label: "Nota", value: "Precios en pesos mexicanos (MXN). IVA del 16% incluido en el total." },
  ],
  amountInWords: "NUEVE MIL OCHOCIENTOS SESENTA PESOS 00/100 M.N.",
} as const;

export const fmtMxn = (n: number) =>
  `$${n.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
