import { motion } from "framer-motion";
import { Home, ShoppingBag, Info, MessageCircle } from "lucide-react";

interface BottomNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const BottomNavigation = ({ onNavigate, activeSection }: BottomNavigationProps) => {
  const navItems = [
    { id: "hero", label: "Accueil", icon: Home },
    { id: "products", label: "Produits", icon: ShoppingBag },
    { id: "about", label: "À propos", icon: Info },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-warm z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-3 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-primary" : ""}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;