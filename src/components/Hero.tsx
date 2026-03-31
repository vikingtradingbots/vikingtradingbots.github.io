import { motion } from 'framer-motion';
import { VikingManagementPreview } from './VikingManagementCards';

interface HeroProps {
  onStartFree?: () => void;
}

const Hero = ({ onStartFree }: HeroProps) => (
  <section id="home" className="relative pt-20 pb-10 overflow-hidden min-h-[55vh] flex items-center">
    <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-montserrat font-bold text-3xl md:text-4xl tracking-tight text-foreground">
            VIKING
          </span>
          <span className="font-montserrat font-semibold text-[10px] md:text-xs tracking-[0.35em] text-primary">
            TRADING BOTS
          </span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-[1.1] tracking-[-0.03em]"
      >
        Trade with <span style={{ color: '#a8ff3e' }}>precision</span>, not emotion.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-montserrat text-base md:text-lg text-muted mb-8 max-w-2xl opacity-80"
      >
        Algorithmic trading strategies designed to remove human bias and execute with consistency across global markets.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onStartFree}
            className="relative px-8 py-3 rounded-full font-montserrat font-bold text-sm
              bg-primary text-primary-foreground
              shadow-[0_6px_0_0_hsl(74,100%,33%),0_8px_24px_hsl(74,100%,43%,0.3)]
              hover:shadow-[0_4px_0_0_hsl(74,100%,33%),0_6px_20px_hsl(74,100%,43%,0.5)]
              hover:translate-y-[2px] active:translate-y-[5px] active:shadow-[0_1px_0_0_hsl(74,100%,33%)]
              transition-all duration-150 select-none"
          >
            Start Free
          </button>
          <a
            href="#products"
            className="relative px-8 py-3 rounded-full font-montserrat font-bold text-sm
              border-2 border-primary text-foreground
              shadow-[0_4px_0_0_hsl(74,100%,33%,0.3),0_8px_24px_hsl(74,100%,43%,0.1)]
              hover:bg-primary hover:text-primary-foreground
              hover:shadow-[0_3px_0_0_hsl(74,100%,33%),0_6px_20px_hsl(74,100%,43%,0.4)]
              hover:translate-y-[1px] active:translate-y-[3px]
              transition-all duration-150 select-none"
          >
            View Performance
          </a>
        </div>
        <p className="font-opensans text-xs" style={{ color: '#8892b0' }}>
          No credit card required • Instant demo access
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <VikingManagementPreview />
      </motion.div>
    </div>
  </section>
);

export default Hero;
