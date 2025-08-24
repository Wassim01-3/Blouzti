import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "+21694389254"; // Your WhatsApp number
  const message = "Bonjour! Je suis intéressé par la Blouza Jerbia de Blouzti.";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 right-4 bg-palm-green text-palm-green-foreground p-4 rounded-full shadow-button z-50 hover:bg-palm-green/90 transition-colors duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        duration: 0.3,
        delay: 1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Pulse Animation */}
      <motion.div
        className="absolute inset-0 bg-palm-green rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};

export default WhatsAppButton;