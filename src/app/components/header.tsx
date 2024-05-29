"use client";

import Logo from "@/ui/icons/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Eliminar el fondo", href: "/remove-bg" },
  { name: "Restaurar el color", href: "/restore-color" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav className="border-b-2 border-slate-200 py-5 sm:text-base md:p-5">
        <ul className="flex flex-wrap justify-center gap-3 md:justify-normal md:gap-5">
          <li className="w-full md:w-auto">
            <Link
              href="/"
              className="flex justify-center text-[20px] font-medium transition-all duration-500 ease-in-out hover:text-slate-500 md:justify-normal"
            >
              <Logo />
              <span className="font-semibold">AI</span>&nbsp;Image Renew
            </Link>
          </li>

          {navLinks.map((link, index) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`transition-all duration-500 ease-in-out hover:text-slate-500 ${
                    isActive && "text-slate-500"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
