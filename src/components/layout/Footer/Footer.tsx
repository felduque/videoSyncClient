import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="flex sm:flex-row flex-col items-center gap-2 px-4 md:px-6 py-6 border-t w-full shrink-0">
      <p className="text-gray-500 dark:text-gray-400 text-xs">
        © 2023 SyncWatch. Todos los derechos reservados.
      </p>
      <nav className="flex gap-4 sm:gap-6 sm:ml-auto">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Términos de servicio
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacidad
        </Link>
      </nav>
    </footer>
  );
};
