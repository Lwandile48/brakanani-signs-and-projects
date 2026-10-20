// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { responsiveImageSources } from "@/src/utils/responsiveImageSources";

try {
  gsap.registerPlugin(CustomEase);
} catch (e) {
  // Graceful fallback if plugin registration fails
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

export type SlideItem = {
  image: string;
  imageSrcSet?: string;
  text: string;
  subtext?: string;
  category?: string;
  id?: string;
};
type CSSLength = string | number;

const VAULT_IMAGES = [
  responsiveImageSources("edwaleni_community_sign_1792318415988"),
  responsiveImageSources("corporate_hours_plaque_1792318419707"),
  responsiveImageSources("signage_installers_high_altitude_1792318418195"),
  responsiveImageSources("modern_shopfront_signage_1792318419764"),
  responsiveImageSources("hero_signage_showcase_1792318416486", 1376),
];

const DEFAULT_ITEMS: SlideItem[] = [
  { image: VAULT_IMAGES[0].src, imageSrcSet: VAULT_IMAGES[0].srcSet, text: "eDwaleni Community Sign", category: "Monument & Outdoor", subtext: "Natural stone foundation with fabricated 3D lettering" },
  { image: VAULT_IMAGES[1].src, imageSrcSet: VAULT_IMAGES[1].srcSet, text: "Corporate Operating Hours Plaque", category: "Corporate Plaques", subtext: "Precision laser-engraved brushed stainless steel" },
  { image: VAULT_IMAGES[2].src, imageSrcSet: VAULT_IMAGES[2].srcSet, text: "High-Altitude Installation", category: "Rigging & Installation", subtext: "OHS certified elevated rigging on high-rise facade" },
  { image: VAULT_IMAGES[3].src, imageSrcSet: VAULT_IMAGES[3].srcSet, text: "Shopfront Signage & Facade", category: "Shopfront & Retail", subtext: "Warm-glow 3D fabricated channel letters" },
  { image: VAULT_IMAGES[4].src, imageSrcSet: VAULT_IMAGES[4].srcSet, text: "Directional & Information Signs", category: "Wayfinding & Directional", subtext: "Architectural property entrance and directional system" },
];

const DEFAULT_EASE = "cubic-bezier(1, -0.001, 0.159, 0.838)";
const CUBIC_BEZIER_RE = /^cubic-bezier\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)$/;

function resolveEase(ease: string): string {
  const match = ease.match(CUBIC_BEZIER_RE);
  if (!match) return ease;

  try {
    const id = `ease-${match.slice(1, 5).join("_").replace(/[^\d.-]/g, "n")}`;
    if (!CustomEase.get(id)) {
      CustomEase.create(id, match.slice(1, 5).join(","));
    }
    return id;
  } catch {
    return "power3.inOut";
  }
}

function toCssLength(value: CSSLength) {
  return typeof value === "number" ? `${value}px` : value;
}

const EASE = "power4.inOut";
const DURATION = 0.9;
const TEXT_TRANSLATE_PERCENT = 40;
const TEXT_ROTATE_DEG = 45;
const OUTGOING_DURATION = DURATION * 0.45;
const VERTICAL_TEXT_TRANSLATE_PERCENT = 40;
const VERTICAL_TEXT_ROTATE_DEG = 45;
const VERTICAL_TEXT_ROTATE_REVERSED = true;
const VERTICAL_TEXT_TRANSLATE_REVERSED = true;
const VERTICAL_OUTGOING_DURATION = DURATION * 0.45;
const TEXT_Z = 60;

export interface DimensionalSwitchSliderProps {
  items?: SlideItem[];
  onItemClick?: (item: SlideItem, index: number) => void;
  infinite?: boolean;
  ease?: string;
  textColor?: string;
  accentColor?: string;
  cardClassName?: string;
  cardWidth?: CSSLength;
  cardHeight?: CSSLength;
  direction?: "horizontal" | "vertical";
  textSize?: CSSLength;
  cardBorderRadius?: CSSLength;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export const DimensionalSwitchSlider = ({
  items = DEFAULT_ITEMS,
  onItemClick,
  infinite = true,
  ease = DEFAULT_EASE,
  textColor = "#F5F4F2",
  accentColor = "#7A000E",
  cardClassName = "max-md:w-[90vw]! max-md:h-[68vw]! max-md:min-h-[250px]! max-[1024px]:w-[85vw]! max-[1024px]:h-[50vw]!",
  cardWidth = 720,
  cardHeight = 440,
  direction = "horizontal",
  textSize = 34,
  cardBorderRadius = 16,
  autoplay = true,
  autoplayDelay = 3800,
}: DimensionalSwitchSliderProps = {}) => {
  const slideItems = items.length > 0 ? items : DEFAULT_ITEMS;
  const isVertical = direction === "vertical";
  const flipAxis = isVertical ? "rotateX" : "rotateY";
  const flipperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevTextRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);
  const showingNextRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const rotationRef = useRef(0);
  const resolvedEase = useMemo(() => resolveEase(ease), [ease]);
  const resolvedCardWidth = toCssLength(cardWidth);
  const resolvedCardHeight = toCssLength(cardHeight);
  const resolvedTextSize = toCssLength(textSize);
  const resolvedCardBorderRadius = toCssLength(cardBorderRadius);
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1 % slideItems.length);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    gsap.set([prevTextRef.current, nextTextRef.current], { z: TEXT_Z });
  }, []);

  useEffect(() => {
    gsap.killTweensOf([flipperRef.current, prevTextRef.current, nextTextRef.current]);

    const wasShowingNext = showingNextRef.current;
    rotationRef.current = wasShowingNext ? 180 : 0;
    gsap.set(flipperRef.current, { rotateX: 0, rotateY: 0, [flipAxis]: rotationRef.current });

    const visibleRef = wasShowingNext ? nextTextRef : prevTextRef;
    const hiddenRef = wasShowingNext ? prevTextRef : nextTextRef;
    gsap.set(visibleRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
    gsap.set(hiddenRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0 });

    isAnimatingRef.current = false;
  }, [direction, flipAxis]);

  const flipTo = useCallback((direction: "prev" | "next", newIndex: number) => {
    const goingNext = direction === "next";
    if (isAnimatingRef.current) return;
    const wasShowingNext = showingNextRef.current;
    flushSync(() => {
      setCurrentIndex(newIndex);
      if (wasShowingNext) {
        setFrontIndex(newIndex);
      } else {
        setBackIndex(newIndex);
      }
    });

    showingNextRef.current = !wasShowingNext;

    const outgoingRef = wasShowingNext ? nextTextRef : prevTextRef;
    const incomingRef = wasShowingNext ? prevTextRef : nextTextRef;
    const flipGoingNext = isVertical ? !goingNext : goingNext;
    rotationRef.current += flipGoingNext ? 180 : -180;
    const rotateValue = rotationRef.current;
    if (prefersReducedMotion()) {
      gsap.set(flipperRef.current, { [flipAxis]: rotateValue });
      gsap.set(outgoingRef.current, {
        xPercent: 0,
        yPercent: 0,
        rotateX: 0,
        rotateY: 0,
        opacity: 0,
      });
      gsap.set(incomingRef.current, {
        xPercent: 0,
        yPercent: 0,
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
      });
      isAnimatingRef.current = false;
      return;
    }

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // Card flip
    tl.to(
      flipperRef.current,
      { [flipAxis]: rotateValue, ease: resolvedEase, duration: 0.7 },
      0,
    );
    const textTl = gsap.timeline();

    if (isVertical) {
      const rotateGoingNext = VERTICAL_TEXT_ROTATE_REVERSED ? !goingNext : goingNext;
      const translateGoingNext = VERTICAL_TEXT_TRANSLATE_REVERSED ? !goingNext : goingNext;

      const outgoingEndRotate = rotateGoingNext
        ? VERTICAL_TEXT_ROTATE_DEG
        : -VERTICAL_TEXT_ROTATE_DEG;
      const outgoingEndY = translateGoingNext
        ? -VERTICAL_TEXT_TRANSLATE_PERCENT * 2
        : VERTICAL_TEXT_TRANSLATE_PERCENT * 2;
      const incomingStartRotate = rotateGoingNext
        ? -VERTICAL_TEXT_ROTATE_DEG
        : VERTICAL_TEXT_ROTATE_DEG;
      const incomingStartY = translateGoingNext
        ? VERTICAL_TEXT_TRANSLATE_PERCENT * 2
        : -VERTICAL_TEXT_TRANSLATE_PERCENT * 2;

      textTl.to(
        outgoingRef.current,
        {
          yPercent: outgoingEndY,
          rotateX: outgoingEndRotate,
          duration: VERTICAL_OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0,
      );
      textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
      textTl.fromTo(
        incomingRef.current,
        { yPercent: incomingStartY, rotateX: incomingStartRotate, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: VERTICAL_OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0.15,
      );
    } else {
      const outgoingEndRotate = goingNext ? TEXT_ROTATE_DEG : -TEXT_ROTATE_DEG;
      const outgoingEndX = goingNext
        ? TEXT_TRANSLATE_PERCENT
        : -TEXT_TRANSLATE_PERCENT;
      const incomingStartRotate = goingNext ? -TEXT_ROTATE_DEG : TEXT_ROTATE_DEG;
      const incomingStartX = goingNext
        ? -TEXT_TRANSLATE_PERCENT
        : TEXT_TRANSLATE_PERCENT;

      textTl.to(
        outgoingRef.current,
        {
          xPercent: outgoingEndX,
          rotateY: outgoingEndRotate,
          duration: OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0,
      );
      textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
      textTl.fromTo(
        incomingRef.current,
        { xPercent: incomingStartX, rotateY: incomingStartRotate, opacity: 0 },
        {
          xPercent: 0,
          rotateY: 0,
          opacity: 1,
          duration: OUTGOING_DURATION * 1.5,
          ease: resolvedEase,
        },
        0.15,
      );
    }

    tl.add(textTl, 0);
  }, [flipAxis, isVertical, resolvedEase]);

  const switchTo = useCallback((direction: "prev" | "next") => {
    const goingNext = direction === "next";
    const wasShowingNext = showingNextRef.current;
    const currentVisibleIndex = wasShowingNext ? backIndex : frontIndex;
    const rawIndex = currentVisibleIndex + (goingNext ? 1 : -1);
    const newIndex = infinite
      ? ((rawIndex % slideItems.length) + slideItems.length) % slideItems.length
      : rawIndex;

    if (!infinite && (newIndex < 0 || newIndex >= slideItems.length)) return;

    flipTo(direction, newIndex);
  }, [backIndex, flipTo, frontIndex, infinite, slideItems.length]);

  useEffect(() => {
    if (!autoplay || autoplayDelay <= 0 || prefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    let isIntersecting = typeof IntersectionObserver === "undefined";
    let isPageVisible = !document.hidden;
    let intervalId: number | null = null;

    const syncAutoplay = () => {
      if (isIntersecting && isPageVisible && intervalId === null) {
        intervalId = window.setInterval(() => {
          switchTo("next");
        }, autoplayDelay);
      } else if ((!isIntersecting || !isPageVisible) && intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      syncAutoplay();
    };

    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
          isIntersecting = entry.isIntersecting;
          syncAutoplay();
        });

    observer?.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    syncAutoplay();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [autoplay, autoplayDelay, switchTo]);

  const goToIndex = useCallback((targetIndex: number) => {
    if (targetIndex === currentIndex) return;

    let direction: "prev" | "next";
    if (infinite) {
      const forwardDistance =
        ((targetIndex - currentIndex) % slideItems.length + slideItems.length) %
        slideItems.length;
      direction = forwardDistance <= slideItems.length - forwardDistance ? "next" : "prev";
    } else {
      direction = targetIndex > currentIndex ? "next" : "prev";
    }

    flipTo(direction, targetIndex);
  }, [currentIndex, flipTo, infinite, slideItems.length]);

  const currentItem = slideItems[currentIndex] || slideItems[0];

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center w-full min-h-[460px] sm:min-h-[600px] py-4 sm:py-6 select-none overflow-hidden">
      
      {/* 3D Flipping Card Container */}
      <div
        onClick={() => onItemClick && onItemClick(currentItem, currentIndex)}
        className={`dimensional-card relative cursor-pointer group shadow-2xl transition-transform duration-300 hover:scale-[1.01] ${cardClassName}`}
        style={{ perspective: "1200px", width: resolvedCardWidth, height: resolvedCardHeight }}
        title="Click to view full project specifications"
      >
        <div ref={flipperRef} className="relative h-full w-full transform-3d">
          {/* Front face */}
          <div
            className="absolute inset-0 h-full w-full overflow-hidden backface-hidden prev-card-face border-2 border-[#3a3636] group-hover:border-[#7A000E] transition-colors"
            style={{ borderRadius: resolvedCardBorderRadius }}
          >
            <img
              src={slideItems[frontIndex].image}
              srcSet={slideItems[frontIndex].imageSrcSet}
              sizes="(max-width: 768px) 90vw, 740px"
              className="w-full h-full object-cover"
              alt={slideItems[frontIndex].text}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
          </div>

          {/* Back face */}
          <div
            className={`absolute inset-0 h-full w-full overflow-hidden backface-hidden next-card-face border-2 border-[#3a3636] group-hover:border-[#7A000E] transition-colors ${
              isVertical ? "rotate-x-180" : "rotate-y-180"
            }`}
            style={{ borderRadius: resolvedCardBorderRadius }}
          >
            <img
              src={slideItems[backIndex].image}
              srcSet={slideItems[backIndex].imageSrcSet}
              sizes="(max-width: 768px) 90vw, 740px"
              className="w-full h-full object-cover"
              alt={slideItems[backIndex].text}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
          </div>
        </div>

        {/* View Project Pill on Card */}
        <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-[#F5F4F2] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:border-[#7A000E] transition-all">
          <Eye className="w-3.5 h-3.5 text-[#C3B0F0]" />
          <span className="font-medium">Inspect Work</span>
        </div>
      </div>

      {/* Floating 3D Title Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-3 sm:px-4 max-w-4xl mx-auto"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={prevTextRef}
          className="absolute w-[86%] sm:w-fit max-w-[320px] sm:max-w-md md:max-w-xl text-center font-serif font-bold prev-text px-2 sm:px-4 flex flex-col items-center justify-center"
          style={{ color: textColor }}
        >
          {slideItems[frontIndex].category && (
            <span className="inline-block text-[10px] sm:text-xs uppercase font-sans font-bold tracking-wider sm:tracking-[0.2em] text-[#C3B0F0] mb-1 sm:mb-2 drop-shadow-md bg-black/60 px-2.5 py-0.5 rounded border border-white/10 backdrop-blur-sm">
              {slideItems[frontIndex].category}
            </span>
          )}
          <h3
            className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] text-balance leading-snug sm:leading-tight break-words font-serif font-bold"
            style={{ fontSize: `clamp(16px, 4vw, ${resolvedTextSize})` }}
          >
            {slideItems[frontIndex].text}
          </h3>
          {slideItems[frontIndex].subtext && (
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm font-sans font-normal text-[#DCD7D4] max-w-xs sm:max-w-lg mx-auto drop-shadow-md line-clamp-2">
              {slideItems[frontIndex].subtext}
            </p>
          )}
        </div>

        <div
          ref={nextTextRef}
          className="absolute w-[86%] sm:w-fit max-w-[320px] sm:max-w-md md:max-w-xl text-center font-serif font-bold next-text opacity-0 px-2 sm:px-4 flex flex-col items-center justify-center"
          style={{ color: textColor }}
        >
          {slideItems[backIndex].category && (
            <span className="inline-block text-[10px] sm:text-xs uppercase font-sans font-bold tracking-wider sm:tracking-[0.2em] text-[#C3B0F0] mb-1 sm:mb-2 drop-shadow-md bg-black/60 px-2.5 py-0.5 rounded border border-white/10 backdrop-blur-sm">
              {slideItems[backIndex].category}
            </span>
          )}
          <h3
            className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] text-balance leading-snug sm:leading-tight break-words font-serif font-bold"
            style={{ fontSize: `clamp(16px, 4vw, ${resolvedTextSize})` }}
          >
            {slideItems[backIndex].text}
          </h3>
          {slideItems[backIndex].subtext && (
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm font-sans font-normal text-[#DCD7D4] max-w-xs sm:max-w-lg mx-auto drop-shadow-md line-clamp-2">
              {slideItems[backIndex].subtext}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex gap-4 z-30 mt-6 items-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            switchTo("prev");
          }}
          aria-label="Previous work"
          disabled={!infinite && currentIndex === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#222020]/80 text-white backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-[#7A000E] hover:border-[#7A000E] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2 items-center px-3 py-2 rounded-full bg-[#181616]/80 border border-white/10 backdrop-blur-md">
          {slideItems.map((item, idx) => (
            <button
              key={item.text + idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToIndex(idx);
              }}
              aria-label={`Go to ${item.text}`}
              aria-current={idx === currentIndex}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                idx === currentIndex
                  ? "w-7 bg-[#7A000E]"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            switchTo("next");
          }}
          aria-label="Next work"
          disabled={!infinite && currentIndex === slideItems.length - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#222020]/80 text-white backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-[#7A000E] hover:border-[#7A000E] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Subtitle helper */}
      <div className="mt-3 text-center">
        <span className="text-[11px] text-[#888] tracking-wide">
          Click the card to inspect craftsmanship &amp; specifications
        </span>
      </div>

    </div>
  );
};

export default DimensionalSwitchSlider;
