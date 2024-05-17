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
    <footer className="p-12 flex flex-wrap justify-between">
      <p>© 2024 AI Image Renew.</p>
      <ul className="flex flex-wrap gap-[20px] justify-end">
        {navLinks.map((link, i) => (
          <li
            className="hover:text-slate-500 transition-all duration-500 ease-in-out cursor-pointer"
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
