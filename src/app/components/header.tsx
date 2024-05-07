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
      <nav className="py-5 md:p-5 text-sm sm:text-base border-b-2 border-slate-400">
        <ul className="flex flex-wrap gap-3 md:gap-5">
          <li>
            <Link
              href="/"
              className="hover:text-[#961b3c] transition-all duration-500 ease-in-out font-medium text-[20px] flex"
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
                  className={`hover:text-[#961b3c] transition-all duration-500 ease-in-out ${
                    isActive && "text-[#961b3c]"
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
