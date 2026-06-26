"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Type } from "@/components/ui/Type";
import { Reveal } from "@/components/ui/Reveal";
import { useStrings } from "@/lib/i18n/useStrings";

interface SchwarzwaldFactProps {
  /** Welcher Fakt aus den Strings (t.facts.<factKey>). */
  factKey: "fact1" | "fact2";
  /** Eyebrow (t.facts.eyebrow) zeigen. */
  showEyebrow?: boolean;
  tone?: "dark" | "light";
  /** Reduziert den Abstand nach unten — z. B. damit die Wald-Silhouette direkt anschließt. */
  tightBottom?: boolean;
  /** Dezente Hintergrund-Elemente (z. B. <FactDecor />). */
  decor?: ReactNode;
  /** Echtes Hintergrundfoto; setzt automatisch helle Schrift + dunklen Verlauf. */
  bgImage?: string;
  /** Hält den ersten Absatz auf Desktop in einer Zeile (kein Umbruch). */
  nowrapFirst?: boolean;
}

export function SchwarzwaldFact({
  factKey,
  showEyebrow = false,
  tone = "light",
  tightBottom = false,
  decor,
  bgImage,
  nowrapFirst = false,
}: SchwarzwaldFactProps) {
  const facts = useStrings().facts;
  const quote = facts[factKey].quote;
  const source = facts[factKey].source;
  const eyebrow = showEyebrow ? facts.eyebrow : undefined;
  const dark = tone === "dark" || Boolean(bgImage);
  const padding = tightBottom
    ? "px-6 pt-24 pb-10 md:pt-32 md:pb-12"
    : "px-6 py-24 md:py-32";

  return (
    <section
      className={`relative overflow-hidden ${padding} ${
        bgImage
          ? "text-cream-50"
          : dark
            ? "bg-night text-cream-50"
            : "bg-cream-50 text-forest-900"
      }`}
    >
      {bgImage && (
        <>
          <Image src={bgImage} alt="" fill sizes="100vw" className="object-cover" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/60 to-night/80"
          />
        </>
      )}
      {decor}
      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        {eyebrow && (
          <Type
            role="eyebrow"
            className={`mb-7 ${dark ? "text-brass-300" : "text-brass-600"}`}
          >
            {eyebrow}
          </Type>
        )}
        {quote
          .split(/\n\n+/)
          .map((para) => para.trim())
          .filter(Boolean)
          .map((para, i) => (
            <Type
              key={i}
              role="h1"
              as="p"
              className={`${dark ? "text-cream-50" : "text-forest-900"} ${
                i > 0 ? "mt-5 md:mt-6" : ""
              } ${nowrapFirst && i === 0 ? "md:whitespace-nowrap" : ""}`}
            >
              {para}
            </Type>
          ))}
        <div className="mx-auto mt-8 h-px w-12 bg-brass-400" />
        <Type
          role="caption"
          className={`mt-6 font-medium uppercase tracking-[0.22em] ${
            dark ? "text-cream-100/55" : "text-forest-700/55"
          }`}
        >
          {source}
        </Type>
      </Reveal>
    </section>
  );
}
