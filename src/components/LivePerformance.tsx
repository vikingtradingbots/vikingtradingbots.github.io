import { ExternalLink } from 'lucide-react';
import btcImg from '@/assets/viking-alpha-btcusd.png';
import daxImg from '@/assets/viking-alpha-dax.png';

const cards = [
  {
    name: 'Viking Alpha BTC/USD',
    description: 'Algorithmic trading on Bitcoin with precision entries.',
    image: btcImg,
    borderColor: '#a8ff3e',
    link: 'https://www.fxblue.com/users/Vikingtradingbots',
    enabled: true,
  },
  {
    name: 'Viking Alpha DAX',
    description: 'German index trading with optimized strategy.',
    image: daxImg,
    borderColor: '#4a7aff',
    link: 'https://www.myfxbook.com/portfolio/viking-trading-bots/11996360',
    enabled: true,
  },
];

const LivePerformance = () => {
  return (
    <section id="live-performance" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-primary/10 text-primary font-montserrat text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-4">
            Live Performance
          </span>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground tracking-[-0.02em] mb-4">
            Track our robots performing in real time
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-sm">
            Audited and public results via FX Blue — unfiltered, unedited.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border-2 flex flex-col bg-card"
              style={{ borderColor: card.borderColor }}
            >
              <div className="h-40 overflow-hidden flex items-center justify-center bg-background">
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-contain p-4"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col text-center">
                <h3 className="font-montserrat font-bold text-foreground text-lg mb-2">{card.name}</h3>
                <p className="text-muted text-sm font-montserrat leading-relaxed mb-5 flex-1">
                  {card.description}
                </p>
                {card.enabled ? (
                  
                    <a href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-montserrat font-bold text-sm px-5 py-3 rounded-xl hover:brightness-110 transition-all"
                  >
                    View Live Results <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 font-montserrat font-bold text-sm px-5 py-3 rounded-xl bg-foreground/10 text-muted/50 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <iframe
            src="//www.fxblue.com/fxbluechart.aspx?c=ch_cumulativeprofit&id=Vikingtradingbots"
            frameBorder="0"
            width="100%"
            height="300"
            style={{ maxWidth: '800px', borderRadius: '16px' }}
            title="FX Blue Live Performance"
          />
        </div>
      </div>
    </section>
  );
};

export default LivePerformance;
