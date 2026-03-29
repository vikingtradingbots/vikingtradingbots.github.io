import heroImage from '@/assets/viking-trading-bots-hero.png';

const StatsBar = () => (
  <section className="relative overflow-hidden -mt-4">
    {/* Gradient fade from hero into image */}
    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10" />
    <img
      src={heroImage}
      alt="Viking Trading Bots — Built to Conquer Markets"
      className="w-full h-auto object-cover"
    />
    {/* Gradient fade from image into next section */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
  </section>
);

export default StatsBar;
