// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import { defineLive } from 'next-sanity' // Importation de defineLive depuis next-sanity pour configurer la récupération en temps réel du contenu
import { client } from './client' // Importation du client Sanity configuré dans le fichier client

// Récupération du token API de Sanity depuis les variables d'environnement
const token = process.env.SANITY_API_TOKEN
if (!token) {
    throw new Error('Absence de SANITY_API_TOKEN') // Lève une erreur si le token n'est pas défini
}

// Configuration du "live" pour Sanity, qui permet de garder le contenu automatiquement à jour.
// La fonction defineLive retourne deux éléments :
// - sanityFetch : une fonction de fetch pour interroger Sanity avec mise à jour automatique du contenu
// - SanityLive  : un composant React à inclure dans votre layout pour activer le mode live
export const { sanityFetch, SanityLive } = defineLive({
    client, // Client Sanity pour exécuter les requêtes
    serverToken: token, // Token à utiliser côté serveur
    browserToken: token, // Token à utiliser côté client
    fetchOptions: {
        revalidate: 0, // Régle la revalidation à 0 pour forcer le rafraîchissement du contenu à chaque requête
    },
})
