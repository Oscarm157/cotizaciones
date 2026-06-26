import {
  CONTENT as t,
  BRAND,
  FOLIO,
  FECHA,
  VIGENCIA,
  SUBTOTAL,
  IVA,
  TOTAL,
  fmtMxn,
  fmtDate,
} from "./content";
import { PrintButton } from "./print-button";

export default function Page() {
  return (
    <main
      className="min-h-screen w-full"
      style={{ background: BRAND.tint, color: BRAND.ink }}
    >
      {/* Toolbar — solo pantalla */}
      <div className="no-print sticky top-0 z-20 border-b bg-white/80 backdrop-blur"
        style={{ borderColor: "#F0D6E2" }}>
        <div className="max-w-[860px] mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: BRAND.magenta }}>
            Cotización {FOLIO} · {t.cliente.name}
          </div>
          <PrintButton label="Imprimir / PDF" />
        </div>
      </div>

      <article
        className="doc-page relative max-w-[860px] mx-auto my-6 bg-white shadow-sm"
        style={{ borderTop: `6px solid transparent`, borderImage: `${BRAND.gradient} 1` }}
      >
        <div className="px-9 sm:px-11 py-8">
          {/* Encabezado */}
          <header className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo%20marabunta.png"
                  alt="Marabunta Creative Studio"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] rounded-xl shadow-sm shrink-0"
                />
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[30px] font-extrabold tracking-[-0.03em] leading-none"
                    style={{
                      background: BRAND.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t.emisor.brand}
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.34em] font-semibold"
                    style={{ color: BRAND.orange }}
                  >
                    {t.emisor.brandSuffix}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-[12px] font-semibold" style={{ color: BRAND.ink }}>
                {t.emisor.legal}
              </p>
              <p className="text-[11px] leading-snug text-neutral-500 max-w-[19rem]">
                {t.emisor.address}
              </p>
              <p className="text-[11px] text-neutral-500">
                RFC {t.emisor.rfc} · Tel. {t.emisor.phone}
              </p>
              <p className="text-[11px] text-neutral-500">{t.emisor.regimen}</p>
            </div>

            <div className="text-right shrink-0">
              <div
                className="inline-block rounded-lg px-4 py-2 text-white"
                style={{ background: BRAND.gradient }}
              >
                <div className="text-[10px] uppercase tracking-[0.26em] font-semibold opacity-90">
                  Cotización
                </div>
                <div className="font-mono text-lg leading-tight">{FOLIO}</div>
              </div>
              <dl className="mt-2.5 text-[11.5px] grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 justify-end">
                <dt className="text-neutral-400 text-right">Fecha</dt>
                <dd className="text-right tabular-nums font-medium">{fmtDate(FECHA)}</dd>
                <dt className="text-neutral-400 text-right">Vigencia</dt>
                <dd className="text-right font-medium">{VIGENCIA}</dd>
                <dt className="text-neutral-400 text-right">Responsable</dt>
                <dd className="text-right font-medium">{t.meta.responsable}</dd>
              </dl>
            </div>
          </header>

          {/* Cliente */}
          <section
            className="mt-6 rounded-xl px-4 py-3"
            style={{ background: BRAND.tint, border: "1px solid #F5DCE7" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] uppercase tracking-[0.26em] font-bold"
                style={{ color: BRAND.magenta }}
              >
                Cliente
              </span>
              <span className="h-px flex-1" style={{ background: "#F0CFDF" }} />
            </div>
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-0.5">
              <div>
                <div className="text-[13.5px] font-bold">{t.cliente.name}</div>
                <div className="text-[11.5px] text-neutral-500">{t.cliente.descriptor}</div>
                <div className="text-[11.5px] text-neutral-500">{t.cliente.address}</div>
              </div>
              <div className="text-[11.5px] text-neutral-500 sm:text-right self-end">
                <div>RFC <span className="font-semibold text-neutral-700">{t.cliente.rfc}</span></div>
                <div>{t.cliente.regimen}</div>
              </div>
            </div>
          </section>

          {/* Tabla */}
          <section className="mt-6">
            <div className="overflow-hidden rounded-xl border" style={{ borderColor: "#EFD7E2" }}>
              {/* header */}
              <div
                className="grid grid-cols-[42px_1fr_64px_70px_96px] text-white text-[10.5px] uppercase tracking-[0.12em] font-semibold"
                style={{ background: BRAND.gradient }}
              >
                <div className="px-3 py-2.5 text-center">Cant.</div>
                <div className="px-3 py-2.5">Descripción</div>
                <div className="px-2 py-2.5 text-center">% IVA</div>
                <div className="px-3 py-2.5 text-right">P. Unit.</div>
                <div className="px-3 py-2.5 text-right">Importe</div>
              </div>
              {/* row */}
              <div className="grid grid-cols-[42px_1fr_64px_70px_96px] items-start">
                <div className="px-3 py-3 text-center tabular-nums text-[13px] font-semibold">
                  {t.item.qty}
                </div>
                <div className="px-3 py-3">
                  <div className="text-[13.5px] font-bold" style={{ color: BRAND.ink }}>
                    {t.item.title}
                  </div>
                  <ul className="mt-1.5 space-y-0.5">
                    {t.item.includes.map((inc) => (
                      <li key={inc} className="text-[11px] text-neutral-500 flex gap-1.5">
                        <span style={{ color: BRAND.orange }}>›</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-2 py-3 text-center tabular-nums text-[12px] text-neutral-600">
                  16%
                </div>
                <div className="px-3 py-3 text-right tabular-nums text-[12.5px]">
                  {fmtMxn(SUBTOTAL)}
                </div>
                <div className="px-3 py-3 text-right tabular-nums text-[12.5px] font-semibold">
                  {fmtMxn(SUBTOTAL)}
                </div>
              </div>
            </div>

            {/* Importe en letra + totales */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end">
              <div className="text-[11px] text-neutral-500 leading-snug max-w-sm">
                <span className="uppercase tracking-[0.18em] font-semibold text-neutral-400">
                  Importe con letra
                </span>
                <div className="mt-0.5 text-neutral-700">{t.amountInWords}</div>
              </div>
              <div className="w-full sm:w-[260px]">
                <div className="flex justify-between text-[12px] py-1 border-b" style={{ borderColor: "#F1E0E8" }}>
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="tabular-nums">{fmtMxn(SUBTOTAL)}</span>
                </div>
                <div className="flex justify-between text-[12px] py-1 border-b" style={{ borderColor: "#F1E0E8" }}>
                  <span className="text-neutral-500">IVA 16%</span>
                  <span className="tabular-nums">{fmtMxn(IVA)}</span>
                </div>
                <div
                  className="mt-2 flex items-center justify-between rounded-lg px-3 py-2 text-white"
                  style={{ background: BRAND.gradient }}
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Total</span>
                  <span className="tabular-nums text-lg font-bold">{fmtMxn(TOTAL)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Observaciones */}
          <section className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.26em] font-bold mb-2" style={{ color: BRAND.magenta }}>
              Observaciones
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
              {t.observaciones.map((o) => (
                <div key={o.label} className="grid grid-cols-[88px_1fr] gap-2 text-[11.5px]">
                  <dt className="font-semibold text-neutral-700">{o.label}</dt>
                  <dd className="text-neutral-500 leading-snug">{o.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Footer / firma */}
          <footer className="mt-8 pt-4 flex items-end justify-between gap-6 border-t" style={{ borderColor: "#F1E0E8" }}>
            <div>
              <div className="w-52 border-t" style={{ borderColor: BRAND.ink, opacity: 0.5 }} />
              <div className="mt-1 text-[11px] text-neutral-500">Aceptación del cliente</div>
              <div className="text-[12px] font-semibold">{t.cliente.name}</div>
            </div>
            <div className="flex items-end gap-3">
              <div className="flex items-center gap-2 text-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo%20marabunta.png"
                  alt="Marabunta"
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] rounded-md shrink-0"
                />
                <div>
                  <div className="text-[12px] font-bold" style={{ color: BRAND.magenta }}>
                    {t.emisor.brand} <span style={{ color: BRAND.orange }}>·</span> {t.emisor.brandSuffix}
                  </div>
                  <div className="text-[11px] text-neutral-500">{t.emisor.site}</div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </article>

      <style>{`
        @page { size: Letter; margin: 12mm; }
        @media print {
          .no-print { display: none !important; }
          html, body { background: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .doc-page { margin: 0 !important; box-shadow: none !important; max-width: 100% !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </main>
  );
}
