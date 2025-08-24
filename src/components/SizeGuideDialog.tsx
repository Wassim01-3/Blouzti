import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SizeGuideDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: "men" | "women" | "kids";
}

const SizeGuideDialog = ({ isOpen, onClose, category }: SizeGuideDialogProps) => {
  const menSizeGuideData = [
    { size: "S", heightRange: "160 – 169 cm", blouzaHeight: "112 – 118 cm" },
    { size: "M", heightRange: "170 – 179 cm", blouzaHeight: "119 – 125 cm" },
    { size: "L", heightRange: "180 – 189 cm", blouzaHeight: "126 – 132 cm" },
    { size: "XL", heightRange: "190 – 199 cm", blouzaHeight: "133 – 139 cm" },
  ];

  const womenSizeGuideData = [
    { size: "S", heightRange: "150 – 159 cm", blouzaHeight: "97 – 103 cm" },
    { size: "M", heightRange: "160 – 169 cm", blouzaHeight: "104 – 110 cm" },
    { size: "L", heightRange: "170 – 179 cm", blouzaHeight: "111 – 117 cm" },
    { size: "XL", heightRange: "180 – 189 cm", blouzaHeight: "118 – 124 cm" },
  ];

  const sizeGuideData = category === "women" ? womenSizeGuideData : menSizeGuideData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Guide des tailles - Blouza {category === "women" ? "Femme" : "Homme"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Consultez notre guide des tailles pour choisir la taille parfaite de votre blouza traditionnelle.
          </p>
          
          <div className="border rounded-lg overflow-hidden">
                          <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-semibold">Taille {category === "women" ? "Femme" : "Homme"}</TableHead>
                    <TableHead className="text-center font-semibold">Taille</TableHead>
                    <TableHead className="text-center font-semibold">Hauteur Blouza</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeGuideData.map((item) => (
                    <TableRow key={item.size}>
                      <TableCell className="text-center">{item.heightRange}</TableCell>
                      <TableCell className="text-center font-medium">{item.size}</TableCell>
                      <TableCell className="text-center">{item.blouzaHeight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Conseil :</strong> Mesurez votre taille actuelle et consultez ce guide pour une taille parfaite.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideDialog; 