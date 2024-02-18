import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500 dark:text-white/80">
      <small className="mb-2 text-xs block">
        &copy; 2024 <Link href={"/"}>Chetra Seng</Link>. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        Next.js, Tailwind CSS, and React.
      </p>
    </footer>
  );
};

export default Footer;
