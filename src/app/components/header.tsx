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
      <nav className="py-5 md:p-5 sm:text-base border-b-2 border-slate-200">
        <ul className="flex flex-wrap justify-center md:justify-normal gap-3 md:gap-5">
          <li className="w-full md:w-auto">
            <Link
              href="/"
              className="justify-center md:justify-normal hover:text-slate-500 transition-all duration-500 ease-in-out font-medium text-[20px] flex"
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
                  className={`hover:text-slate-500 transition-all duration-500 ease-in-out ${
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
