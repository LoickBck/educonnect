import Stripe from 'stripe' // Importation de la librairie Stripe pour interagir avec l'API Stripe

// Vérification que la clé secrète Stripe est bien définie dans les variables d'environnement.
// Si ce n'est pas le cas, une erreur est levée pour éviter de créer une instance Stripe sans clé.
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY n'est pas défini")
}

// Création d'une instance de Stripe en utilisant la clé secrète récupérée depuis les variables d'environnement.
// L'option "apiVersion" est définie sur '2025-01-27.acacia', qui correspond à la dernière version de l'API Stripe.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia', // Utilisation de la dernière version de l'API Stripe
})

// Exportation de l'instance Stripe pour qu'elle puisse être utilisée dans d'autres parties de l'application.
export default stripe
