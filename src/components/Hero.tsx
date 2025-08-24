import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-djerba.jpg";

interface HeroProps {
  onDiscoverClick: () => void;
}

const Hero = ({ onDiscoverClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground}
          alt="Beautiful Djerba landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-sea-blue/40 to-primary/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/7abffaf8-30a5-42c6-8577-aa864b28be35.png"
              alt="Blouzetna Logo" 
              className="w-48 h-auto mx-auto md:w-64 drop-shadow-lg"
            />
          </div>

          {/* Slogan */}
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            L'authenticité Djerbienne
            <br />
            <span className="text-golden">à votre portée</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Découvrez la beauté intemporelle de la Blouza Jerbia traditionnelle
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              onClick={onDiscoverClick}
              variant="secondary"
              size="lg"
              className="bg-golden text-golden-foreground hover:bg-golden/90 text-lg px-12 py-6 rounded-full font-semibold shadow-button transform hover:scale-105 transition-all duration-300 min-h-[60px] w-full max-w-xs"
            >
              Découvrir la Blouza
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;