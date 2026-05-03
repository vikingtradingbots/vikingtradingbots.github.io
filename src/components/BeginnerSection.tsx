import { GraduationCap } from 'lucide-react';

const BeginnerSection = () => {
  return (
    <section id="beginner" className="py-24 px-6 bg-background scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-primary/10 text-primary font-montserrat text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-4">
            Beginner
          </span>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground tracking-[-0.02em]">
            Start your trading journey
          </h2>
        </div>

        <div className="max-w-xl mx-auto">
          <div
            className="rounded-2xl border-2 bg-card p-8 text-center flex flex-col items-center"
            style={{ borderColor: '#a8ff3e' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: 'rgba(168, 255, 62, 0.15)' }}
            >
              <GraduationCap size={28} style={{ color: '#a8ff3e' }} />
            </div>
            <h3 className="font-montserrat font-bold text-foreground text-xl mb-2">
              Viking Academy
            </h3>
            <p className="text-muted font-montserrat text-sm mb-5">
              Coming Soon. Your journey starts here.
            </p>
            <span className="inline-block text-[10px] font-montserrat font-bold tracking-wider uppercase px-3 py-1 rounded bg-foreground/10 text-muted">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginnerSection;
