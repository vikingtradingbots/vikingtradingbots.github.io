import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const produtosDropdown = [
  {
    title: 'Mercado Nacional',
    items: ['Mini Índice', 'Mini Dólar', 'Ações'],
  },
  {
    title: 'Mercado Internacional',
    items: ['Bitcoin', 'Índices Internacionais', 'Forex'],
  },
];

const navLinks = [
  { label: 'Início', href: '#início' },
  { label: 'Educação', href: '#educação' },
  { label: 'Produtos', href: '#produtos', dropdown: true },
   { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '#contato' },
];


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#início" className="flex items-baseline gap-2">
          <span className="font-montserrat font-bold text-xl tracking-tighter text-foreground">VIKING</span>
          <span className="font-montserrat font-medium text-[10px] tracking-[0.2em] text-primary">INVESTIMENTOS</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="font-montserrat text-sm font-medium text-muted hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {link.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </a>

                {/* Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-[#0f1340]/95 backdrop-blur-xl border border-white/10 rounded-xl p-5 min-w-[320px] shadow-2xl">
                    <div className="grid grid-cols-2 gap-6">
                      {produtosDropdown.map((section) => (
                        <div key={section.title}>
                          <h4 className="font-montserrat text-xs font-bold text-primary tracking-wider uppercase mb-3">
                            {section.title}
                          </h4>
                          <ul className="space-y-2">
                            {section.items.map((item) => (
                              <li key={item}>
                                <a
                                  href="#produtos"
                                  className="font-opensans text-sm text-muted hover:text-foreground hover:pl-1 transition-all duration-150 block"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-montserrat text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contato"
            className="bg-primary hover:brightness-110 text-primary-foreground px-6 py-2.5 rounded-full font-montserrat font-bold text-sm transition-all active:scale-95 shadow-[0_4px_20px_hsl(74,100%,43%,0.2)]"
          >
            Acesso Gratuito
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-montserrat text-base font-medium text-muted hover:text-foreground transition-colors block py-2"
              >
                {link.label}
              </a>
              {link.dropdown && (
                <div className="pl-4 space-y-3 mt-2">
                  {produtosDropdown.map((section) => (
                    <div key={section.title}>
                      <span className="font-montserrat text-xs font-bold text-primary tracking-wider uppercase">
                        {section.title}
                      </span>
                      <ul className="mt-1 space-y-1">
                        {section.items.map((item) => (
                          <li key={item}>
                            <a
                              href="#produtos"
                              onClick={() => setMobileOpen(false)}
                              className="font-opensans text-sm text-muted hover:text-foreground block py-1"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
