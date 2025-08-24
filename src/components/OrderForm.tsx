import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitOrder } from "@/lib/orderService";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: "men" | "women" | "kids";
}

const OrderForm = ({ isOpen, onClose, selectedCategory }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    size: "",
    quantity: "1",
    notes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.phone || !formData.address || !formData.size) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitOrder({
        ...formData,
        category: selectedCategory || 'men'
      });

      if (result.success) {
        toast({
          title: "Commande envoyée !",
          description: result.telegramSent 
            ? "Votre commande a été envoyée au télégram et enregistrée."
            : "Votre commande a été enregistrée.",
          variant: "default"
        });
        setIsSubmitted(true);
      } else {
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer la commande. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
    
    // Reset form after 3 seconds and close
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        size: "",
        quantity: "1",
        notes: ""
      });
      onClose();
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Commander votre Blouza
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-6 py-4"
            >
              {/* Selected Category Display */}
              {selectedCategory && (
                <div className="text-center p-3 bg-sand rounded-lg">
                  <span className="text-sm text-muted-foreground">Catégorie sélectionnée:</span>
                  <p className="font-semibold text-foreground capitalize">
                    Blouza {selectedCategory === "men" ? "Homme" : selectedCategory === "women" ? "Femme" : "Enfant"}
                  </p>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium">
                  Nom complet *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Votre nom complet"
                  className="h-12 text-base"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">
                  Numéro de téléphone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+216 XX XXX XXX"
                  className="h-12 text-base"
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-medium">
                  Adresse de livraison *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Adresse complète avec ville"
                  className="min-h-[80px] text-base resize-none"
                  required
                />
              </div>

              {/* Size and Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size" className="text-base font-medium">
                    Taille *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory === "kids" ? (
                        <>
                          <SelectItem value="4-6 ans">4-6 ans</SelectItem>
                          <SelectItem value="7-9 ans">7-9 ans</SelectItem>
                          <SelectItem value="10-12 ans">10-12 ans</SelectItem>
                          <SelectItem value="13-15 ans">13-15 ans</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-base font-medium">
                    Quantité
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("quantity", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-medium">
                  Notes (optionnel)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Informations supplémentaires..."
                  className="min-h-[60px] text-base resize-none"
                />
              </div>

              {/* Payment Info */}
              <div className="bg-sand p-4 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  💳 <strong>Paiement:</strong> À la livraison uniquement
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-4 text-lg shadow-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Confirmer ma Commande"
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-palm-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Commande Confirmée !
              </h3>
              <p className="text-muted-foreground mb-4">
                Votre commande a été enregistrée avec succès.
                <br />
                Vous serez contacté très bientôt pour la livraison.
              </p>
              <p className="text-sm text-primary font-medium">
                Merci de votre confiance ! 🌟
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;