// Telegram Bot Configuration
// Set these environment variables in your .env file
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE';

export interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  category: string;
  size: string;
  quantity: string;
  notes: string;
}

export const sendOrderToTelegram = async (orderData: OrderData): Promise<boolean> => {
  try {
    const message = formatOrderMessage(orderData);
    
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        botToken: TELEGRAM_BOT_TOKEN,
        chatId: TELEGRAM_CHAT_ID
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
};

export const updateOrdersFile = async (orderData: OrderData): Promise<boolean> => {
  try {
    // Get current orders
    const response = await fetch('/orders.txt');
    let currentContent = '';
    
    if (response.ok) {
      currentContent = await response.text();
    }

    // Format new order
    const newOrder = formatOrderForFile(orderData);
    
    // Add new order to the beginning
    const updatedContent = currentContent + '\n\n' + newOrder;

    // Save updated content
    const saveResponse = await fetch('/api/update-orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: updatedContent })
    });

    return saveResponse.ok;
  } catch (error) {
    console.error('Error updating orders file:', error);
    return false;
  }
};

const formatOrderMessage = (orderData: OrderData): string => {
  const timestamp = new Date().toLocaleString('fr-FR');
  const categoryText = orderData.category === 'men' ? 'Homme' : 
                      orderData.category === 'women' ? 'Femme' : 'Enfant';

  return `
🆕 <b>NOUVELLE COMMANDE BLOUZA DJERBA</b>

📅 <b>Date:</b> ${timestamp}
👤 <b>Nom:</b> ${orderData.fullName}
📞 <b>Téléphone:</b> ${orderData.phone}
📍 <b>Adresse:</b> ${orderData.address}
👕 <b>Catégorie:</b> Blouza ${categoryText}
📏 <b>Taille:</b> ${orderData.size}
🔢 <b>Quantité:</b> ${orderData.quantity}
${orderData.notes ? `📝 <b>Notes:</b> ${orderData.notes}` : ''}

💰 <b>Paiement:</b> À la livraison
  `.trim();
};

const formatOrderForFile = (orderData: OrderData): string => {
  const timestamp = new Date().toISOString();
  const categoryText = orderData.category === 'men' ? 'Homme' : 
                      orderData.category === 'women' ? 'Femme' : 'Enfant';

  return `Date: ${timestamp}
Nom: ${orderData.fullName}
Téléphone: ${orderData.phone}
Adresse: ${orderData.address}
Catégorie: Blouza ${categoryText}
Taille: ${orderData.size}
Quantité: ${orderData.quantity}
Notes: ${orderData.notes || 'Aucune'}

---`;
};

export const submitOrder = async (orderData: OrderData): Promise<{
  success: boolean;
  telegramSent: boolean;
  fileUpdated: boolean;
  error?: string;
}> => {
  try {
    // Send to Telegram
    const telegramSent = await sendOrderToTelegram(orderData);
    
    // Update file
    const fileUpdated = await updateOrdersFile(orderData);

    return {
      success: telegramSent || fileUpdated, // Success if at least one method worked
      telegramSent,
      fileUpdated
    };
  } catch (error) {
    console.error('Error submitting order:', error);
    return {
      success: false,
      telegramSent: false,
      fileUpdated: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 