"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  LayoutGroup,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Link from "next/link";
import useActiveSection from "@/hooks/use-active-section";
import type { NavItem } from "@/models/navitem";
import { cn } from "@/utils/cn";

type Props = {
  items: NavItem[];
};

// Hover bubble spring — smooth, no bounce
const HOVER_SPRING = { type: "spring", stiffness: 420, damping: 28 } as const;

// Liquid pill — leading edge (direction of movement) is fast
const LEADING_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
} as const;

// Liquid pill — trailing edge lags, creating the mercury-stretch effect
const TRAILING_SPRING = {
  type: "spring",
  stiffness: 200,
  damping: 28,
} as const;

const Header: React.FC<Props> = ({ items }) => {
  const { activeSection, setActiveSection, setLastTime } = useActiveSection();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  // Two independent motion values for each edge of the pill
  const pillLeft = useMotionValue(0);
  const pillRight = useMotionValue(0);
  const pillTop = useMotionValue(0);
  const pillHeight = useMotionValue(0);
  // Width is continuously derived — stretches as leading edge races ahead
  const pillWidth = useTransform(() => pillRight.get() - pillLeft.get());

  const [pillReady, setPillReady] = useState(false);

  const snapPill = useCallback(() => {
    const nav = navRef.current;
    const activeItem = itemRefs.current.get(activeSection);
    if (!nav || !activeItem) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const targetLeft = itemRect.left - navRect.left;
    const targetRight = itemRect.right - navRect.left;
    const targetTop = itemRect.top - navRect.top + 2;
    const targetHeight = itemRect.height - 4;

    pillLeft.set(targetLeft);
    pillRight.set(targetRight);
    pillTop.set(targetTop);
    pillHeight.set(targetHeight);
    if (!pillReady) setPillReady(true);
  }, [activeSection, pillLeft, pillRight, pillTop, pillHeight, pillReady]);

  useEffect(() => {
    const nav = navRef.current;
    const activeItem = itemRefs.current.get(activeSection);
    if (!nav || !activeItem) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const targetLeft = itemRect.left - navRect.left;
    const targetRight = itemRect.right - navRect.left;
    const targetTop = itemRect.top - navRect.top + 2;
    const targetHeight = itemRect.height - 4;

    if (!pillReady) {
      // Snap to position on first render — no animation
      pillLeft.set(targetLeft);
      pillRight.set(targetRight);
      pillTop.set(targetTop);
      pillHeight.set(targetHeight);
      setPillReady(true);
      return;
    }

    // Snap top/height immediately when row changes
    pillTop.set(targetTop);
    pillHeight.set(targetHeight);

    if (targetLeft >= pillLeft.get()) {
      // Moving right: right edge (leading) races ahead, left edge lags
      animate(pillRight, targetRight, LEADING_SPRING);
      animate(pillLeft, targetLeft, TRAILING_SPRING);
    } else {
      // Moving left: left edge (leading) races ahead, right edge lags
      animate(pillLeft, targetLeft, LEADING_SPRING);
      animate(pillRight, targetRight, TRAILING_SPRING);
    }
  }, [activeSection]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener("resize", snapPill);
    return () => window.removeEventListener("resize", snapPill);
  }, [snapPill]);

  const parentVarient = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const childrenVarient = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <header className="relative z-999">
      {/* SVG distortion filter for glass bend/refraction */}
      <svg className="hidden" aria-hidden>
        <defs>
          <filter
            id="navbar-glass-blur"
            x="0"
            y="0"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.007"
              numOctaves="1"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        className="fixed left-1/2 top-0 h-auto w-full sm:top-6 sm:h-13 sm:w-xl"
        initial={{ x: "-50%", y: -100, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
      >
        {/* Bend layer — backdrop blur + distortion */}
        <div
          className="absolute inset-0 rounded-none backdrop-blur-md sm:rounded-full"
          style={{ filter: "url(#navbar-glass-blur)" }}
        />
        {/* Face layer — outer glow */}
        <div
          className="absolute inset-0 z-10 rounded-none sm:rounded-full"
          style={{
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15), 0 0 24px rgba(255,255,255,0.08)",
          }}
        />
        {/* Edge layer — rim highlight + border */}
        <div
          className="absolute inset-0 z-20 rounded-none border border-white/20 dark:border-white/10 sm:rounded-full"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1)",
          }}
        />
        {/* Tint layer */}
        <div className="absolute inset-0 z-20 rounded-none bg-white/10 dark:bg-black/20 sm:rounded-full" />

        <nav className="relative z-30 flex h-full items-center justify-center py-2 sm:py-0">
          <LayoutGroup>
            <motion.ul
              ref={navRef}
              className="relative flex flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium max-sm:w-72 sm:w-[initial] sm:flex-nowrap sm:gap-5"
              initial="initial"
              animate="animate"
              variants={parentVarient}
            >
              {/* Single liquid glass pill — slides between active items */}
              {pillReady && (
                <motion.span
                  className="pointer-events-none absolute -z-10 rounded-full"
                  style={{
                    left: pillLeft,
                    width: pillWidth,
                    top: pillTop,
                    height: pillHeight,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.22) 100%)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: [
                      "inset 0 1.5px 0 rgba(255,255,255,0.75)",
                      "inset 0 -1px 0 rgba(255,255,255,0.18)",
                      "0 2px 10px rgba(0,0,0,0.12)",
                      "0 0 0 0.5px rgba(255,255,255,0.25)",
                    ].join(", "),
                  }}
                />
              )}

              {items.map((item) => {
                const isActive = activeSection === item.label;
                const isHovered = hoveredItem === item._id;

                return (
                  <motion.li
                    variants={childrenVarient}
                    className="relative flex h-3/4 items-center justify-center"
                    key={item._id}
                    ref={(el: HTMLLIElement | null) => {
                      if (el) itemRefs.current.set(item.label, el);
                    }}
                    onHoverStart={() => setHoveredItem(item._id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <Link
                      className={cn(
                        "relative flex w-full items-center justify-center px-3 py-3 transition-colors duration-150",
                        "text-gray-600 dark:text-gray-400",
                        "hover:text-gray-950 dark:hover:text-white",
                        { "text-gray-950 dark:text-white": isActive },
                      )}
                      href={item.link}
                      onClick={() => {
                        setActiveSection(item.label);
                        setLastTime(Date.now());
                      }}
                    >
                      {/* Hover glass bubble — slides between items */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.span
                            layoutId="hoverBubble"
                            className="absolute inset-0 -z-10 rounded-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={HOVER_SPRING}
                            style={{
                              background: "rgba(255,255,255,0.14)",
                              border: "1px solid rgba(255,255,255,0.32)",
                              boxShadow:
                                "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1)",
                            }}
                          />
                        )}
                      </AnimatePresence>

                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </LayoutGroup>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
