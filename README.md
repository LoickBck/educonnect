# EduConnect

Un système de gestion de l'apprentissage, construit avec **Next.js 15**, **Sanity CMS**, **Clerk** et **Stripe**. Ce projet offre des mises à jour de contenu en temps réel, un suivi de la progression des cours et un traitement sécurisé des paiements.

---

## Fonctionnalités

### Pour les étudiants
- 📚 **Accès à un contenu de cours complet**  
  Bénéficiez d’un accès illimité à des cours structurés et détaillés.
- 📊 **Suivi de la progression en temps réel**  
  Visualisez l’avancement de votre apprentissage au fur et à mesure.
- ✅ **Système de validation d'achèvement des leçons**  
  Marquez vos leçons comme terminées pour suivre vos progrès.
- 🎯 **Parcours d'apprentissage basés sur des modules**  
  Apprenez de manière structurée grâce à des modules organisés.
- 🎥 **Intégrations de plusieurs lecteurs vidéo (YouTube, Vimeo, Loom)**  
  Profitez de différentes plateformes pour visionner les vidéos de cours.
- 💳 **Achats de cours sécurisés**  
  Effectuez vos paiements en toute confiance via Stripe.
- 📱 **Expérience d'apprentissage optimisée pour mobile**  
  Accédez à vos cours sur n'importe quel appareil.
- 🔄 **Synchronisation de la progression des cours**  
  Suivez votre progression sur tous vos appareils.

### Pour les créateurs de cours
- 📝 **Gestion de contenu riche avec Sanity CMS**  
  Organisez et éditez vos cours grâce à une interface intuitive.
- 📊 **Suivi de la progression des étudiants**  
  Visualisez et analysez les performances de vos apprenants.
- 📈 **Analyse des cours**  
  Obtenez des insights détaillés sur l’engagement et la réussite de vos cours.
- 🎨 **Structure de cours personnalisable**  
  Créez des parcours d’apprentissage sur mesure.
- 📹 **Options d'hébergement vidéo multiples**  
  Intégrez vos vidéos depuis diverses plateformes.
- 💰 **Paiements directs via Stripe**  
  Gérez les transactions de manière sécurisée.
- 🔄 **Mises à jour de contenu en temps réel**  
  Bénéficiez d’un contenu toujours à jour grâce à la synchronisation en direct.
- 📱 **Diffusion de contenu optimisée pour mobile**  
  Vos cours s’adaptent à tous les types d’écrans.

### Fonctionnalités techniques
- 🚀 **Composants serveur & actions serveur**  
  Utilisation de fonctionnalités avancées de Next.js pour améliorer la performance.
- 👤 **Authentification avec Clerk**  
  Sécurisez l’accès aux contenus et aux zones protégées.
- 💳 **Traitement des paiements avec Stripe**  
  Gérez les transactions de manière fluide et sécurisée.
- 📝 **Gestion de contenu avec Sanity CMS**  
  Bénéficiez d’une gestion centralisée et évolutive du contenu.
- 🎨 **Interface moderne avec Tailwind CSS et shadcn/ui**  
  Profitez d’un design contemporain et responsive.
- 📱 **Responsive design**  
  Une expérience optimale sur tous les appareils.
- 🔄 **Mises à jour de contenu en temps réel**  
  Restez informé des changements immédiatement.
- 🔒 **Routes et contenus protégés**  
  Accédez aux informations sensibles uniquement après authentification.
- 🌙 **Support du mode sombre**  
  Basculez entre mode clair et mode sombre selon vos préférences.

### Fonctionnalités UI/UX
- 🎯 **Interface moderne et épurée**  
  Une expérience utilisateur agréable et intuitive.
- 🎨 **Système de design cohérent avec shadcn/ui**  
  Une interface harmonieuse et facile à naviguer.
- ♿ **Composants accessibles**  
  Respect des normes d’accessibilité pour tous les utilisateurs.
- 🎭 **Transitions et animations fluides**  
  Des interactions visuelles agréables et dynamiques.
- 📱 **Adapté à tous les appareils**  
  Une compatibilité totale sur mobile, tablette et desktop.
- 🔄 **États de chargement avec placeholders (squelettes)**  
  Des indicateurs visuels pour une meilleure expérience lors du chargement.
- 💫 **Micro-interactions pour un meilleur engagement**  
  Des détails interactifs qui rendent l’application réactive.
- 🌙 **Bouton de bascule entre mode sombre et clair**  
  Changez facilement de thème selon vos préférences.

---

## Démarrage

### Prérequis
- **Node.js 18+**
- **npm** ou **yarn**
- **Compte Stripe**
- **Compte Clerk**
- **Compte Sanity**

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez-y :

```env
    # Sanity
    NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
    NEXT_PUBLIC_SANITY_DATASET=production
    # Read Token
    SANITY_API_TOKEN=your-sanity-read-token
    # Full Access Admin Token
    SANITY_API_ADMIN_TOKEN=your-sanity-admin-token
    
    # Pour Sanity Studio
    SANITY_STUDIO_PROJECT_ID=your-project-id
    SANITY_STUDIO_DATASET=production
    
    # Next.js
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    
    # Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
    STRIPE_SECRET_KEY=your-stripe-secret-key
    STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
    
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    CLERK_SECRET_KEY=your-clerk-secret-key
```
### Installation

1. **Clonez le dépôt :**

   git clone https://github.com/yourusername/educonnect

2. **Installez les dépendances :**

   npm install (j'utilise pnpm, plus rapide en gros)

3. **Démarrez le serveur de développement :**

   npm run dev

4. **Dans un autre terminal, démarrez le Sanity Studio :**

   npm run sanity:dev

---

## Configuration de Sanity CMS

1. Créez un compte sur [Sanity.io](https://www.sanity.io/).
2. Créez un nouveau projet.
3. Installez l'outil CLI de Sanity :

   npm install -g @sanity/cli

4. Initialisez Sanity dans votre projet :

   sanity init

5. Déployez votre Sanity Studio :

   sanity deploy

---

## Configuration de Clerk

1. Créez une application sur [Clerk](https://clerk.dev/).
2. Configurez les fournisseurs d'authentification (Google, Facebook, etc.).
3. Définissez les URLs de redirection.
4. Ajoutez les variables d'environnement correspondantes dans votre fichier `.env.local`.

---

## Configuration de Stripe

1. Créez un compte sur [Stripe](https://stripe.com/).
2. Configurez les endpoints webhook dans Stripe pour recevoir les événements de paiement.
3. Configurez vos paramètres de paiement.
4. Pour le développement local, configurez le forwarding des webhooks :

   stripe listen --forward-to localhost:3000/api/stripe-checkout/webhook

---

## Architecture

### Schéma de contenu

**Cours**
- Titre
- Description
- Prix
- Image
- Modules
- Formateur
- Catégorie

**Modules**
- Titre
- Leçons
- Ordre

**Leçons**
- Titre
- Description
- URL de la vidéo
- Contenu (texte riche)
- Statut d'achèvement

**Étudiants**
- Informations de profil
- Cours inscrits
- Données de progression

**Formateurs**
- Nom
- Bio
- Photo
- Cours associés

### Composants clés

**Système de gestion des cours**
- Création et organisation du contenu
- Structuration en modules et leçons
- Édition de texte riche
- Intégration multimédia
- Suivi de la progression
- Système de validation des leçons
- Calcul de la progression du cours et des modules

**Traitement des paiements**
- Paiement sécurisé via Stripe
- Gestion des inscriptions aux cours

**Authentification et sécurité**
- Authentification avec Clerk
- Routes et contenus protégés

---

## Utilisation

### Création d'un cours
1. Accédez au Sanity Studio.
2. Créez la structure du cours avec modules et leçons.
3. Ajoutez le contenu et les médias.
4. Publiez le cours.

### Expérience étudiant
- Parcourez les cours disponibles.
- Achetez et inscrivez-vous aux cours.
- Accédez au contenu du cours.
- Suivez votre progression au sein des modules.
- Marquez les leçons comme complètes.
- Visualisez vos certificats d'achèvement.

---

## Développement

### Arborescence principale des fichiers

    /app                    # Répertoire principal de l'application Next.js
      /(dashboard)          # Routes du tableau de bord
      /(user)               # Routes pour l'utilisateur
      /api                  # Routes API
    /components             # Composants React
    /sanity                 # Configuration de Sanity
      /lib                  # Fonctions utilitaires Sanity
      /schemas              # Schémas de contenu Sanity
    /lib                    # Fonctions utilitaires générales


### Technologies principales
- Next.js 15
- TypeScript
- Sanity CMS
- Stripe Payments
- Clerk Auth
- Tailwind CSS
- Shadcn UI
- Lucide Icons
