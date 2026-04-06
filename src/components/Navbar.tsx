import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Strategy', href: '#strategy' },
  { label: 'Performance', href: '#live-performance' },
  { label: 'Management', href: '#viking-management' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

interface NavbarProps {
  onStartFree?: () => void;
}

const Navbar = ({ onStartFree }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-baseline gap-2">
          <span className="font-montserrat font-bold text-xl tracking-tighter text-foreground">VIKING</span>
          <span className="font-montserrat font-medium text-[10px] tracking-[0.2em] text-primary">TRADING BOTS</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-montserrat text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Free Demo + CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onStartFree}
            className="hidden md:inline-block font-montserrat font-bold text-sm transition-colors hover:brightness-110"
            style={{ color: '#a8ff3e' }}
          >
            Free Demo
          </button>
          <button
            onClick={onStartFree}
            className="bg-primary hover:brightness-110 text-primary-foreground px-6 py-2.5 rounded-full font-montserrat font-bold text-sm transition-all active:scale-95 shadow-[0_4px_0_0_hsl(74,100%,33%),0_8px_24px_hsl(74,100%,43%,0.2)]
              hover:shadow-[0_3px_0_0_hsl(74,100%,33%),0_6px_20px_hsl(74,100%,43%,0.4)]
              hover:translate-y-[1px] active:translate-y-[3px] active:shadow-[0_1px_0_0_hsl(74,100%,33%)]"
          >
            Start Free
          </button>
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
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-montserrat text-base font-medium text-muted hover:text-foreground transition-colors block py-2"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onStartFree?.(); }}
            className="font-montserrat text-base font-bold block py-2"
            style={{ color: '#a8ff3e' }}
          >
            Free Demo
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
