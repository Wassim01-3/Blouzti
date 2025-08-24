import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  image: string;
  category: "men" | "women" | "kids";
  onOrderClick: (category: "men" | "women" | "kids") => void;
  onViewClick: (category: "men" | "women" | "kids") => void;
}

const ProductCard = ({ title, price, description, image, category, onOrderClick, onViewClick }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-card border-border shadow-card hover:shadow-warm transition-all duration-300">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <motion.img 
            src={image}
            alt={title}
            className="w-full h-64 md:h-72 object-contain object-center bg-gray-50"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 right-4">
            <span className="bg-golden text-golden-foreground px-3 py-1 rounded-full text-sm font-medium">
              {price}
            </span>
          </div>
        </div>

        <CardContent className="flex-1 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-base">
            {description}
          </p>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:-ml-2">
            <Button 
              onClick={() => onViewClick(category)}
              variant="outline"
              size="lg"
              className="flex-1 border-primary text-primary hover:bg-primary/10 font-semibold py-3 text-base rounded-lg shadow-button transform hover:scale-[1.02] transition-all duration-300"
            >
              Voir les détails
            </Button>
            <Button 
              onClick={() => onOrderClick(category)}
              variant="default"
              size="lg"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 text-base rounded-lg shadow-button transform hover:scale-[1.02] transition-all duration-300"
            >
              Commander
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;