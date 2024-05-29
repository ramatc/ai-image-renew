const navLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ramiro-tanquias/",
  },
  {
    name: "GitHub",
    href: "https://github.com/ramatc",
  },
  {
    name: "Contacto",
    href: "mailto:rtanquiascornejo@gmail.com",
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-center gap-5 p-12 sm:justify-between">
      <p>© 2024 AI Image Renew.</p>
      <ul className="flex flex-wrap justify-end gap-[20px]">
        {navLinks.map((link, i) => (
          <li
            className="cursor-pointer transition-all duration-500 ease-in-out hover:text-slate-500"
            key={i}
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
