import { createClient } from 'next-sanity' // Importation de la fonction createClient depuis next-sanity pour créer un client Sanity

// Importation des variables de configuration provenant du module 'env'
import { apiVersion, dataset, projectId } from '../env'
// Importation de la base URL, utilisée pour configurer l'URL du Studio Sanity
import baseUrl from '@/lib/baseUrl'

// Création et exportation d'une instance du client Sanity
export const client = createClient({
    projectId, // Identifiant du projet Sanity
    dataset, // Nom du dataset à utiliser (ex: production, staging)
    apiVersion, // Version de l'API à utiliser pour les requêtes Sanity
    useCdn: true, // Désactive l'utilisation du CDN de Sanity. Cela est recommandé lors de la génération statique de pages,
    // l'utilisation d'ISR ou la revalidation basée sur des tags pour s'assurer d'obtenir des données à jour.
    stega: {
        studioUrl: `${baseUrl}/studio`, // URL du Sanity Studio, utilisée pour des intégrations ou pour rediriger vers le studio
    },
    token: process.env.SANITY_API_ADMIN_TOKEN, // Jeton d'administration pour authentifier les requêtes qui nécessitent des privilèges élevés
})
