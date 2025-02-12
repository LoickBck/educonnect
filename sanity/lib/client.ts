import { createClient } from 'next-sanity' // Importation de la fonction createClient depuis next-sanity pour créer un client permettant d'interagir avec l'API Sanity

import { apiVersion, dataset, projectId } from '../env' // Importation des variables d'environnement nécessaires à la configuration du client (version de l'API, dataset et projectId)

// Création et exportation d'une instance du client Sanity configurée avec les paramètres importés
export const client = createClient({
    projectId, // Identifiant du projet Sanity
    dataset, // Nom du dataset (par exemple "production" ou "development")
    apiVersion, // Version de l'API Sanity à utiliser pour les requêtes
    useCdn: true, // Utilisation du CDN de Sanity pour accélérer les requêtes de lecture.
    // Remarque : il faut mettre cette valeur à false si vous générez des pages statiquement,
    // utilisez ISR ou la revalidation basée sur des tags, afin de garantir l'actualisation des données.
})
