import Logo from "@/ui/icons/logo";
import Link from "next/link";

const Header = () => {
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
          <li>
            <Link
              href="/remove-bg"
              className="hover:text-[#961b3c] transition-all duration-500 ease-in-out"
            >
              Eliminar el fondo
            </Link>
          </li>
          <li>
            <Link
              href="/restore-color"
              className="hover:text-[#961b3c] transition-all duration-500 ease-in-out"
            >
              Restaurar el color
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
