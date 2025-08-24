import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductDialog from "@/components/ProductDialog";
import OrderForm from "@/components/OrderForm";
import BottomNavigation from "@/components/BottomNavigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

// Import product images - Main display images (zoom.png)
import blouzaMenZoom from "@/assets/man/zoom.png";
import blouzaWomenZoom from "@/assets/women/zoom.png";
import blouzaKidsZoom from "@/assets/kid/zoom.png";

// Import additional product images for men
import blouzaMenDhafer from "@/assets/man/dhafer.jpg";
import blouzaMenNidhal from "@/assets/man/nidhal.jpg";
import blouzaMenNidhal2 from "@/assets/man/nidhal 2.jpg";
import blouzaMenOld from "@/assets/man/old.jpg";
import blouzaMenTourist from "@/assets/man/tourist.jpg";

// Import additional product images for women
import blouzaWomenMannequin from "@/assets/women/mannequin.jpg";

const Index = () => {
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"men" | "women" | "kids">();
  const [activeSection, setActiveSection] = useState("hero");

  // Refs for smooth scrolling
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const products = [
    {
      title: "Blouza Homme",
      price: "85 DT",
      description: "Élégance et authenticité pour l'homme moderne. Confectionnée avec soin selon la tradition djerbienne, cette blouza allie confort et prestige.",
      image: blouzaMenZoom, // Use zoom.png as main display image
      category: "men" as const,
      images: [
        blouzaMenZoom, // zoom.png - main display and zoom photo
        blouzaMenDhafer,
        blouzaMenNidhal,
        blouzaMenNidhal2,
        blouzaMenOld,
        blouzaMenTourist
      ]
    },
    {
      title: "Blouza Femme",
      price: "95 DT",
      description: "Féminité et tradition dans un vêtement d'exception. Broderies délicates et finitions raffinées pour célébrer l'élégance tunisienne.",
      image: blouzaWomenZoom, // Use zoom.png as main display image
      category: "women" as const,
      images: [
        blouzaWomenZoom, // zoom.png - main display and zoom photo
        blouzaWomenMannequin
      ]
    },
    {
      title: "Blouza Enfant",
      price: "65 DT",
      description: "Transmettez les valeurs traditionnelles à vos enfants. Confortable et colorée, parfaite pour les occasions spéciales et le quotidien.",
      image: blouzaKidsZoom, // Use zoom.png as main display image
      category: "kids" as const,
      images: [
        blouzaKidsZoom // zoom.png - main display and zoom photo
      ]
    }
  ];

  const handleOrderClick = (category: "men" | "women" | "kids") => {
    setSelectedCategory(category);
    setOrderFormOpen(true);
  };

  const handleViewClick = (category: "men" | "women" | "kids") => {
    setSelectedCategory(category);
    setProductDialogOpen(true);
  };

  const handleDiscoverClick = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const refs = {
      hero: heroRef,
      products: productsRef,
      about: aboutRef,
      contact: contactRef
    };
    refs[section as keyof typeof refs]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} id="hero">
        <Hero onDiscoverClick={handleDiscoverClick} />
      </section>

      {/* Products Section */}
      <section ref={productsRef} id="products" className="py-16 px-4 bg-gradient-to-b from-background to-sand">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Notre Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez l'authenticité de la Blouza Jerbia, un symbole de l'héritage culturel tunisien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductCard
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  category={product.category}
                  onOrderClick={handleOrderClick}
                  onViewClick={handleViewClick}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              L'Héritage de la Blouza Jerbia
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  La Blouza Jerbia est bien plus qu'un simple vêtement. C'est un symbole d'identité, 
                  un héritage culturel transmis de génération en génération sur l'île de Djerba.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Chaque pièce est confectionnée avec amour et respect des traditions, 
                  utilisant des techniques ancestrales et des matériaux de qualité supérieure.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Porter une Blouza Jerbia, c'est célébrer l'authenticité tunisienne et 
                  affirmer sa fierté culturelle avec élégance et distinction.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/7abffaf8-30a5-42c6-8577-aa864b28be35.png"
                  alt="Blouzetna Heritage" 
                  className="w-full max-w-md mx-auto drop-shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-16 px-4 bg-sand">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Contactez-nous
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Une question ? Besoin d'aide ? Notre équipe est là pour vous accompagner
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <motion.div 
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-card cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => window.open('tel:+21694389254', '_self')}
              >
                <Phone className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                <p className="text-muted-foreground">+216 94 389 254</p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Localisation</h3>
                <p className="text-muted-foreground">Djerba, Tunisie</p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex space-x-4 mb-4">
                  <Facebook 
                    className="w-6 h-6 text-primary cursor-pointer hover:text-primary/80 transition-colors" 
                    onClick={() => window.open('https://www.facebook.com/profile.php?id=61579655553153', '_blank')}
                  />
                  <Instagram 
                    className="w-6 h-6 text-primary cursor-pointer hover:text-primary/80 transition-colors" 
                    onClick={() => window.open('https://www.instagram.com/blouzti_tn/', '_blank')}
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Réseaux Sociaux</h3>
                <p className="text-muted-foreground">Suivez-nous</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Dialog */}
      {selectedCategory && (
        <ProductDialog
          isOpen={productDialogOpen}
          onClose={() => setProductDialogOpen(false)}
          category={selectedCategory}
          onOrderClick={handleOrderClick}
          images={products.find(p => p.category === selectedCategory)?.images || []}
          title={products.find(p => p.category === selectedCategory)?.title || ""}
          price={products.find(p => p.category === selectedCategory)?.price || ""}
          description={products.find(p => p.category === selectedCategory)?.description || ""}
        />
      )}

      {/* Order Form Modal */}
      <OrderForm 
        isOpen={orderFormOpen}
        onClose={() => setOrderFormOpen(false)}
        selectedCategory={selectedCategory}
      />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Bottom Navigation */}
      <BottomNavigation 
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Bottom padding for mobile navigation */}
      <div className="h-20" />
    </div>
  );
};

export default Index;
