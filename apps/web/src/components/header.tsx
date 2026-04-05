"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import useActiveSection from "@/hooks/use-active-section";
import type { NavItem } from "@/models/navitem";
import { cn } from "@/utils/cn";

type Props = {
  items: NavItem[];
};

const Header: React.FC<Props> = ({ items }) => {
  const { activeSection, setActiveSection, setLastTime } = useActiveSection();

  const parentVarient = {
    initial: {
      y: -100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const childrenVarient = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <header className="relative z-999">
      <motion.div
        className="fixed left-1/2 top-0 h-18 w-full rounded-none border border-white/30 bg-white/40 shadow-lg shadow-black/[0.03] backdrop-blur-md dark:border-white/10 dark:bg-gray-950/40 sm:top-6 sm:h-13 sm:w-xl sm:rounded-full"
        initial={{
          x: "-50%",
          y: -100,
          opacity: 0,
        }}
        animate={{
          x: "-50%",
          y: 0,
          opacity: 1,
        }}
      />

      <nav className="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <motion.ul
          className="flex w-88 flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5"
          initial={"initial"}
          animate={"animate"}
          variants={parentVarient}
        >
          {items.map((item) => (
            <motion.li
              variants={childrenVarient}
              className="relative flex h-3/4 items-center justify-center"
              key={item._id}
            >
              <Link
                className={cn(
                  "flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-400",
                  {
                    "text-gray-950 dark:text-gray-300":
                      activeSection === item.label,
                  },
                )}
                href={item.link}
                onClick={() => {
                  setActiveSection(item.label);
                  setLastTime(Date.now());
                }}
              >
                {item.label}
                {activeSection === item.label && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </header>
  );
};

export default Header;
