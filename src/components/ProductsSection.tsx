import { useState } from 'react';
import { ShieldCheck, TrendingUp, Layers, SplitSquareHorizontal } from 'lucide-react';
import RobotReportModal from './RobotReportModal';
import vikingAlphaBtcusd from '@/assets/viking-alpha-btcusd.png';
import vikingAlphaDax from '@/assets/viking-alpha-dax.png';
import forexComingSoon from '@/assets/forex-coming-soon.png';


const tools = [
  {
    name: 'BreakEven',
    icon: ShieldCheck,
    desc: 'Eliminates risk by automatically moving the stop to the entry point once the market moves in your favor. Fully adjustable.',
  },
  {
    name: 'Trailing Stop',
    icon: TrendingUp,
    desc: 'After reaching the activation trigger, the system follows the price by progressively adjusting the stop, protecting gains and capturing longer moves.',
  },
  {
    name: 'Gradient',
    icon: Layers,
    desc: 'Progressive entry system that improves the average price and optimizes position placement. Fully adjustable.',
    optional: true,
  },
  {
    name: 'Partials',
    icon: SplitSquareHorizontal,
    desc: 'Strategically takes profits throughout the trade, securing gains even before the full move completes. Multiple configurable levels.',
    optional: true,
  },
];

interface RobotItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  comingSoon?: boolean;
  flag?: string;
  bitcoinIcon?: boolean;
}

const portfolioRobots: RobotItem[] = [
  { id: 'BTC/USD', name: 'Viking Alpha', subtitle: 'Ragnar Edition – BTC/USD', image: vikingAlphaBtcusd, bitcoinIcon: true },
  { id: 'DAX', name: 'Viking Alpha', subtitle: 'Ivar Edition – DAX (DE40)', image: vikingAlphaDax, flag: '🇩🇪' },
  { id: 'USATEC', name: 'Viking Alpha', subtitle: 'USATEC', image: forexComingSoon, comingSoon: true, flag: '🇺🇸' },
  { id: 'HK50', name: 'Viking Alpha', subtitle: 'HK50', image: forexComingSoon, comingSoon: true, flag: '🇭🇰' },
];

const RobotList = ({
  robots,
  onSelect,
  buttonStyle,
}: {
  robots: RobotItem[];
  onSelect: (id: string) => void;
  buttonStyle: React.CSSProperties;
}) => (
  <div className="divide-y divide-foreground/10">
    {robots.map((robot) => (
      <div
        key={robot.id}
        className="flex items-center gap-4 p-4"
      >
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-foreground/5">
          {robot.image ? (
            <img
              src={robot.image}
              alt={`${robot.name} - ${robot.subtitle}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted text-[10px] font-montserrat font-bold uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-montserrat font-bold text-foreground text-sm flex items-center gap-2 flex-wrap">
            {robot.bitcoinIcon && (
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full font-bold text-[11px]"
                style={{ background: 'linear-gradient(135deg, #f7931a, #ffd700)', color: '#fff' }}
                aria-label="Bitcoin"
              >
                ₿
              </span>
            )}
            {robot.flag && <span className="text-base leading-none">{robot.flag}</span>}
            <span>{robot.name}</span>
            {robot.comingSoon && (
              <span className="text-[9px] font-montserrat font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-foreground/10 text-muted">
                Coming Soon
              </span>
            )}
          </h4>
          <p className="text-muted text-xs font-montserrat">{robot.subtitle}</p>
        </div>

        <button
          onClick={() => !robot.comingSoon && onSelect(robot.id)}
          className={`font-montserrat font-bold text-sm px-5 py-2.5 rounded-lg transition-all flex-shrink-0 ${
            robot.comingSoon
              ? 'opacity-50 cursor-default'
              : 'hover:-translate-y-[3px] active:translate-y-0 cursor-pointer'
          }`}
          style={buttonStyle}
          disabled={robot.comingSoon}
        >
          {robot.id}
        </button>
      </div>
    ))}
  </div>
);

const ProductsSection = () => {
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null);

  return (
    <section id="products" className="pt-16 pb-20 bg-background relative overflow-hidden">
      {selectedRobot && (
        <RobotReportModal robotName={selectedRobot} onClose={() => setSelectedRobot(null)} />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary font-montserrat text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Products
          </span>
          <span id="strategy" className="block -mt-20 pt-20" aria-hidden="true"></span>
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-foreground tracking-[-0.02em] mb-4">
            Intelligent Automation with Professional Trade Management
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A complete system that operates from entry to exit, focused on capital protection and maximizing results.
          </p>
        </div>

        {/* Strategy cards */}
        <div className="text-center mb-10 mt-8">
          <span className="inline-block bg-primary/10 text-primary font-montserrat text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Strategy
          </span>
          <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-foreground tracking-[-0.02em]">
            Built-in Trade Management Tools
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="relative bg-card border border-foreground/5 rounded-lg p-6 hover:border-primary/30 transition-colors group"
            >
              <span
                className={`absolute top-3 right-3 text-[10px] font-montserrat font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                  tool.optional
                    ? 'bg-primary/20 text-primary'
                    : 'bg-foreground/10 text-muted'
                }`}
              >
                {tool.optional ? 'Advanced mode' : 'Standard mode'}
              </span>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-montserrat font-bold text-foreground mb-2">{tool.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* Our Portfolio */}
        <div className="text-center mb-8">
          <span className="inline-block bg-primary/10 text-primary font-montserrat text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Our Portfolio
          </span>
        </div>
        <div className="rounded-xl overflow-hidden border border-foreground/10 max-w-3xl mx-auto">
          <div
            className="px-5 py-3 font-montserrat font-bold text-sm text-white uppercase tracking-wider"
            style={{ backgroundColor: '#1a5fa8' }}
          >
            Our Portfolio
          </div>
          <div className="bg-card">
            <RobotList
              robots={portfolioRobots}
              onSelect={setSelectedRobot}
              buttonStyle={{
                backgroundColor: '#d4d4d4',
                color: '#1a1a1a',
                boxShadow: '0 4px 0 #aaaaaa',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
