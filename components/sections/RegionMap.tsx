"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Type } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { useStrings } from "@/lib/i18n/useStrings";
import { CONSENT_EVENT, getConsent, setConsent } from "@/lib/consent";

/**
 * Leaflet braucht `window`. Darum die eigentliche Karte nur clientseitig laden
 * (ssr: false). `ssr: false` mit next/dynamic ist nur in Client Components
 * erlaubt → dieser Wrapper trägt "use client".
 */
const RegionMapLeaflet = dynamic(() => import("./RegionMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full animate-pulse"
      style={{ background: "var(--color-forest-900)" }}
    />
  ),
});

export function RegionMap() {
  const t = useStrings();
  // Externe Karte (OpenStreetMap) erst nach Einwilligung laden.
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(getConsent() === "all");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return (
    <section className="relative bg-night px-6 py-20 text-cream-50 md:px-10 md:py-28">
      <Reveal className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <Type role="eyebrow" className="mb-5 text-brass-300">
            {t.map.eyebrow}
          </Type>
          <Type role="h2" as="h2" className="text-cream-50">
            {t.map.title}
          </Type>
          <Type
            role="caption"
            className="mt-4 font-medium uppercase tracking-[0.22em] text-cream-100/55"
          >
            {t.map.subtitle}
          </Type>
        </div>

        <div className="bf-map-frame relative mx-auto h-[clamp(340px,46vw,560px)] w-full overflow-hidden rounded-2xl">
          {allowed ? (
            <RegionMapLeaflet />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center"
              style={{ background: "var(--color-forest-900)" }}
            >
              <p className="max-w-sm font-body text-sm leading-relaxed text-cream-100/75">
                {t.map.consentText}
              </p>
              <button
                type="button"
                onClick={() => setConsent("all")}
                className="rounded-[3px] bg-brass-400 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-night transition-colors hover:bg-brass-300"
              >
                {t.map.consentCta}
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
