const PlanosSection = () => {
  return (
    <section id="planos" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block bg-primary/10 text-primary font-montserrat text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-4">
            Planos
          </span>
          <h2 className="font-montserrat font-bold text-4xl text-foreground mb-4">
            Escolha seu plano
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="font-montserrat text-sm font-bold text-primary uppercase tracking-wider mb-2">Valor por robô</p>
            <p className="font-opensans text-sm text-muted leading-relaxed">Cada estratégia é licenciada individualmente por conta MT5. Você escolhe o ativo e o plano que melhor se encaixa no seu perfil.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="font-montserrat text-sm font-bold text-primary uppercase tracking-wider mb-2">Assistência permanente</p>
            <p className="font-opensans text-sm text-muted leading-relaxed">Todos os planos incluem suporte via WhatsApp, atualizações periódicas e acompanhamento durante toda a vigência do contrato.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="font-montserrat text-sm font-bold text-primary uppercase tracking-wider mb-2">Parceria Brasil</p>
            <p className="font-opensans text-sm text-muted leading-relaxed">Plano exclusivo para o mercado brasileiro. Você não paga mensalidade — apenas uma comissão sobre o lucro gerado pelo robô.</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex-1 min-w-[200px] max-w-[240px] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-200 cursor-pointer">
            <div className="bg-[#1a5fa8] px-5 py-4 text-center">
              <p className="font-montserrat font-bold text-white text-base">Semestral</p>
            </div>
            <div className="bg-[#2d7dd2] px-5 py-6 flex flex-col gap-4" style={{boxShadow:'0 6px 0 #0d3d6e',borderRadius:'0 0 16px 16px'}}>
              <div className="text-center">
                <p className="font-montserrat font-bold text-white text-3xl">$149</p>
                <p className="font-opensans text-white/70 text-xs mt-1">por 6 meses</p>
              </div>
              <div className="border-t border-white/20 pt-4 flex flex-col gap-2">
                {['1 licença MT5','Atualizações inclusas','Assistência inclusa','Suporte WhatsApp'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
                    <span className="font-opensans text-white text-xs">{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5551997337388" target="_blank" rel="noopener noreferrer" className="mt-2 block text-center bg-white/20 hover:bg-white/30 border border-white/40 text-white font-montserrat font-bold text-sm py-2.5 rounded-xl transition-all">
                Falar no WhatsApp ↗
              </a>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[240px] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-200 cursor-pointer">
            <div className="bg-[#3a7d1e] px-5 py-4 text-center">
              <p className="font-montserrat font-bold text-white text-base">Anual</p>
            </div>
            <div className="bg-[#5aaa2a] px-5 py-6 flex flex-col gap-4" style={{boxShadow:'0 6px 0 #1f5010',borderRadius:'0 0 16px 16px'}}>
              <div className="text-center">
                <p className="font-montserrat font-bold text-white text-3xl">$249</p>
                <p className="font-opensans text-white/70 text-xs mt-1">por ano · melhor valor</p>
              </div>
              <div className="border-t border-white/20 pt-4 flex flex-col gap-2">
                {['1 licença MT5','Atualizações inclusas','Assistência inclusa','Suporte prioritário'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
                    <span className="font-opensans text-white text-xs">{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5551997337388" target="_blank" rel="noopener noreferrer" className="mt-2 block text-center bg-white/20 hover:bg-white/30 border border-white/40 text-white font-montserrat font-bold text-sm py-2.5 rounded-xl transition-all">
                Falar no WhatsApp ↗
              </a>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[240px] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-200 cursor-pointer">
            <div className="bg-[#7c3aed] px-5 py-4 text-center">
              <p className="font-montserrat font-bold text-white text-base">Brasil — Comissão</p>
            </div>
            <div className="bg-[#9f5ff0] px-5 py-6 flex flex-col gap-4" style={{boxShadow:'0 6px 0 #4c1d95',borderRadius:'0 0 16px 16px'}}>
              <div className="text-center">
                <p className="font-montserrat font-bold text-white text-3xl">0%</p>
                <p className="font-opensans text-white/70 text-xs mt-1">mensalidade · só paga se lucrar</p>
              </div>
              <div className="border-t border-white/20 pt-4 flex flex-col gap-2">
                {['Até 0.25 BTC → 30%','Até 0.50 BTC → 25%','Acima 0.50 BTC → 20%'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
                    <span className="font-opensans text-white text-xs">{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5551997337388" target="_blank" rel="noopener noreferrer" className="mt-2 block text-center bg-white/20 hover:bg-white/30 border border-white/40 text-white font-montserrat font-bold text-sm py-2.5 rounded-xl transition-all">
                Falar no WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanosSection;
