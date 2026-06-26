"use client";

import Image from "next/image";
import { useStrings } from "@/lib/i18n/useStrings";
import { Type } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Hinweis-Section auf die kommende schwimmende Sauna auf der Enz.
 * „Coming Soon" — noch keine Buchung, daher kein CTA, nur die Vorfreude.
 */
export function FloatingSauna() {
  const t = useStrings().floatingSauna;

  return (
    <section
      id="floating-sauna"
      className="relative overflow-hidden bg-night px-6 py-28 text-cream-50 md:py-36"
    >
      {/* Foto der Floating Sauna — füllt die volle Breite; oben/unten wird
          beschnitten, der Bildausschnitt ist auf die beleuchtete Hütte zentriert. */}
      <Image
        src="/images/floating-sauna.jpg"
        alt={t.title}
        fill
        priority={false}
        sizes="100vw"
        className="object-cover [object-position:center_40%]"
      />
      {/* Dunkler Verlauf für Lesbarkeit + Tiefe */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/60 to-night/45"
      />

      <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full border border-brass-300/60 bg-night/40 px-4 py-1.5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brass-300 backdrop-blur-sm">
          {t.comingSoon}
        </span>
        <Type role="eyebrow" className="mt-6 text-brass-300">
          {t.eyebrow}
        </Type>
        <Type role="display" as="h2" className="mt-4 text-cream-50">
          {t.title}
        </Type>
        <div className="mx-auto mt-7 h-px w-14 bg-brass-400" />
        <Type role="lead" className="mx-auto mt-7 max-w-xl text-cream-100/90">
          {t.text}
        </Type>
        <Type
          role="caption"
          className="mt-7 font-medium uppercase tracking-[0.18em] text-cream-100/60"
        >
          {t.note}
        </Type>
      </Reveal>
    </section>
  );
}
