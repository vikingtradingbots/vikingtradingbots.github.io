const Footer = () => (
  <footer className="bg-background py-12 border-t border-foreground/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-baseline gap-2">
        <span className="font-montserrat font-bold text-lg text-foreground">VIKING</span>
        <span className="font-montserrat font-medium text-[10px] tracking-[0.2em] text-primary">INVESTIMENTOS</span>
      </div>
      <p className="font-opensans text-xs text-muted">© 2026 · Todos os direitos reservados</p>
    </div>
  </footer>
);

export default Footer;
