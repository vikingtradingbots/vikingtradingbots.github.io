import { Mail } from 'lucide-react';
import heroImage from '@/assets/viking-trading-bots-hero.png';

const CtaSection = () => (
  <section id="contato" className="py-20 relative overflow-hidden">
    {/* Gradient transition into CTA */}
    <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent z-10" />
    {/* Foggy sea background — more solid/premium */}
    <img
      src={heroImage}
      alt=""
      aria-hidden
      className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]"
    />
    <div className="absolute inset-0 bg-background/40" />

    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-[-0.02em]">
        Cadastre-se e fique por dentro dos lançamentos da <span className="text-primary">Viking</span>
      </h2>
      <p className="text-muted mb-10 max-w-lg mx-auto text-lg">
        Novos bots com ferramentas exclusivas, chegando em breve.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <div className="relative flex-grow">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="w-full bg-background border border-foreground/10 rounded-lg py-4 pl-12 pr-4 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-montserrat font-bold hover:brightness-110 transition-colors">
          Entrar
        </button>
      </div>
    </div>
  </section>
);

export default CtaSection;
