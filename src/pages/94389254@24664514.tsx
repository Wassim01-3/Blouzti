import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Phone, MapPin, Package, Hash } from "lucide-react";

interface Order {
  id: string;
  timestamp: string;
  fullName: string;
  phone: string;
  address: string;
  category: string;
  size: string;
  quantity: string;
  notes: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/orders.txt');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const text = await response.text();
        
        if (!text.trim()) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const orderLines = text.trim().split('\n\n---\n\n').filter(line => line.trim());
        const parsedOrders: Order[] = orderLines.map((orderText, index) => {
          const lines = orderText.split('\n');
          const order: any = { id: `order-${index + 1}` };
          
          lines.forEach(line => {
            if (line.startsWith('Date:')) order.timestamp = line.replace('Date:', '').trim();
            if (line.startsWith('Nom:')) order.fullName = line.replace('Nom:', '').trim();
            if (line.startsWith('Téléphone:')) order.phone = line.replace('Téléphone:', '').trim();
            if (line.startsWith('Adresse:')) order.address = line.replace('Adresse:', '').trim();
            if (line.startsWith('Catégorie:')) order.category = line.replace('Catégorie:', '').trim();
            if (line.startsWith('Taille:')) order.size = line.replace('Taille:', '').trim();
            if (line.startsWith('Quantité:')) order.quantity = line.replace('Quantité:', '').trim();
            if (line.startsWith('Notes:')) order.notes = line.replace('Notes:', '').trim();
          });
          
          return order;
        });

        setOrders(parsedOrders.reverse()); // Most recent first
      } catch (err) {
        setError('Erreur lors du chargement des commandes');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'homme': return 'bg-blue-100 text-blue-800';
      case 'femme': return 'bg-pink-100 text-pink-800';
      case 'enfant': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand to-cream p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement des commandes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand to-cream p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand to-cream p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📋 Commandes Blouza Djerba
          </h1>
          <p className="text-muted-foreground">
            Total: {orders.length} commande{orders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucune commande
              </h3>
              <p className="text-muted-foreground">
                Aucune commande n'a été enregistrée pour le moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <Card key={order.id} className="shadow-lg border-2 border-primary/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-primary" />
                      <CardTitle className="text-lg">
                        Commande #{orders.length - index}
                      </CardTitle>
                    </div>
                    <Badge className={getCategoryColor(order.category)}>
                      {order.category}
                    </Badge>
                  </div>
                                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <Calendar className="w-4 h-4" />
                     {new Date(order.timestamp).toLocaleString('fr-FR', {
                       year: 'numeric',
                       month: '2-digit',
                       day: '2-digit',
                       hour: '2-digit',
                       minute: '2-digit',
                       second: '2-digit'
                     })}
                   </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-medium">{order.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{order.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-sm">{order.address}</span>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Taille:</span> {order.size}
                    </div>
                    <div>
                      <span className="font-medium">Quantité:</span> {order.quantity}
                    </div>
                  </div>

                  {order.notes && (
                    <>
                      <Separator />
                      <div>
                        <span className="font-medium text-sm">Notes:</span>
                        <p className="text-sm text-muted-foreground mt-1">{order.notes}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 