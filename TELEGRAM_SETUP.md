# Configuration du Bot Telegram

## Étapes pour configurer le bot Telegram

### 1. Créer un bot Telegram

1. Ouvrez Telegram et recherchez `@BotFather`
2. Envoyez `/newbot`
3. Suivez les instructions pour créer votre bot
4. Notez le **token** fourni par BotFather

### 2. Obtenir votre Chat ID

1. Envoyez un message à votre bot
2. Visitez cette URL dans votre navigateur (remplacez YOUR_BOT_TOKEN par votre token) :
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Cherchez le `"chat":{"id":` dans la réponse et notez le numéro

### 3. Configurer le bot dans votre application

**Option 1: Variables d'environnement (Recommandé)**

1. Créez un fichier `.env` à la racine de votre projet
2. Ajoutez vos informations :
   ```
   VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
   VITE_TELEGRAM_CHAT_ID=your_chat_id_here
   ```

**Option 2: Configuration directe**

1. Ouvrez le fichier `src/lib/orderService.ts`
2. Remplacez les valeurs suivantes :
   ```typescript
   const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Votre token de bot
   const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE'; // Votre chat ID
   ```

### 4. Tester la configuration

1. Démarrez votre application : `npm run dev`
2. Soumettez une commande test
3. Vérifiez que vous recevez la notification sur Telegram

## Fonctionnalités

- ✅ Notifications instantanées sur Telegram
- ✅ Sauvegarde automatique dans `public/orders.txt`
- ✅ Page de visualisation des commandes : `/94389254@24664514`
- ✅ Interface moderne et responsive

## Sécurité

- Utilisez les variables d'environnement pour sécuriser vos tokens
- Le fichier `.env` ne doit pas être commité dans Git (ajoutez-le au `.gitignore`)
- Les commandes sont sauvegardées localement dans le fichier `orders.txt`
- La page des commandes est accessible via l'URL spécifique
- Pour une solution de production, utilisez un backend sécurisé

## Dépannage

Si les notifications Telegram ne fonctionnent pas :
1. Vérifiez que le token est correct
2. Vérifiez que le chat ID est correct
3. Assurez-vous d'avoir envoyé au moins un message à votre bot
4. Vérifiez la console du navigateur pour les erreurs 