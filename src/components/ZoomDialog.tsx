import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ZoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

interface MousePosition {
  x: number;
  y: number;
  containerX: number;
  containerY: number;
  displayedWidth: number;
  displayedHeight: number;
}

const ZoomDialog = ({ isOpen, onClose, imageSrc, imageAlt }: ZoomDialogProps) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ 
    x: 0, 
    y: 0, 
    containerX: 0, 
    containerY: 0,
    displayedWidth: 0,
    displayedHeight: 0
  });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    // Get mouse position relative to the image
    const imageRect = imageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Mouse position relative to the image
    const imageX = e.clientX - imageRect.left;
    const imageY = e.clientY - imageRect.top;
    
    // Mouse position relative to the container
    const containerX = e.clientX - containerRect.left;
    const containerY = e.clientY - containerRect.top;
    
    // Calculate actual displayed image dimensions (accounting for object-contain)
    const img = imageRef.current;
    const displayedWidth = img.offsetWidth;
    const displayedHeight = img.offsetHeight;
    
    setMousePosition({ 
      x: imageX, 
      y: imageY,
      containerX,
      containerY,
      displayedWidth,
      displayedHeight
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-background/95 backdrop-blur-sm border-0">
        {/* Dialog Title for Accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>Zoom de l'image</DialogTitle>
        </DialogHeader>
        
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-background/80 hover:bg-background border border-border/50"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Image Container */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
          <motion.img
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-full object-contain cursor-crosshair"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          {/* Loupe Zoom Effect */}
          {isHovering && mousePosition.displayedWidth > 0 && (
            <div
              style={{
                position: 'absolute',
                left: `${mousePosition.containerX - 100}px`,
                top: `${mousePosition.containerY - 100}px`,
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '3px solid hsl(var(--golden))',
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${mousePosition.displayedWidth * 3}px ${mousePosition.displayedHeight * 3}px`,
                backgroundPosition: `${-(mousePosition.x * 3 - 100)}px ${-(mousePosition.y * 3 - 100)}px`,
                backgroundRepeat: 'no-repeat',
                pointerEvents: 'none',
                zIndex: 50,
                boxShadow: '0 8px 30px -8px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                overflow: 'hidden',
              }}
            />
          )}

          {/* Zoom Indicator */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Zoom 3x</span>
              </div>
            </motion.div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="bg-background/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border border-border/50"
            >
              <p className="text-sm text-muted-foreground text-center">
                🔍 Déplacez votre souris sur l'image pour un zoom 3x net et précis
              </p>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomDialog;