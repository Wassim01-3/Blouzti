import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, Ruler } from "lucide-react";
import ZoomDialog from "./ZoomDialog";
import SizeGuideDialog from "./SizeGuideDialog";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: "men" | "women" | "kids";
  onOrderClick: (category: "men" | "women" | "kids") => void;
  images: string[];
  title: string;
  price: string;
  description: string;
}

const ProductDialog = ({ isOpen, onClose, category, onOrderClick, images, title, price, description }: ProductDialogProps) => {
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const sizes = category === "kids" ? ["4-6 ans", "7-9 ans", "10-12 ans"] : ["S", "M", "L", "XL"];

  const handleZoomClick = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setZoomDialogOpen(true);
  };

  const handleOrderClick = () => {
    onOrderClick(category);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Image Carousel */}
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative group">
                        <motion.img
                          src={image}
                          alt={`${title} - Image ${index + 1}`}
                          className="w-full h-80 object-contain object-center bg-gray-50 rounded-lg"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Enhanced Zoom Button Overlay */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleZoomClick(index)}
                            className="bg-golden/90 hover:bg-golden text-golden-foreground shadow-lg border-0 hover:scale-110 transition-all duration-200"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Zoom Hint */}
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-lg border border-border/50">
                            <p className="text-xs text-muted-foreground font-medium">
                              🔍 Cliquez pour zoomer
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">{price}</span>
                <Badge variant="secondary" className="bg-golden text-golden-foreground">
                  Authentique
                </Badge>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Tailles disponibles</h3>
                {(category === "men" || category === "women") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSizeGuideOpen(true)}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Ruler className="w-3 h-3" />
                    Guide des tailles
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Badge 
                    key={size} 
                    variant="outline" 
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => handleZoomClick(0)}
                className="flex-1"
              >
                <ZoomIn className="w-4 h-4 mr-2" />
                Zoom
              </Button>
              <Button
                onClick={handleOrderClick}
                className="flex-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Commander maintenant
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Zoom Dialog */}
      <ZoomDialog
        isOpen={zoomDialogOpen}
        onClose={() => setZoomDialogOpen(false)}
        imageSrc={images[selectedImageIndex]}
        imageAlt={`${title} - Image ${selectedImageIndex + 1}`}
      />

      {/* Size Guide Dialog */}
      <SizeGuideDialog
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={category}
      />
    </>
  );
};

export default ProductDialog;