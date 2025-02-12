/**
 * Ce fichier de configuration permet d'exécuter les commandes `$ sanity [command]`
 * dans ce dossier. Pour en savoir plus, consultez https://www.sanity.io/docs/cli
 **/

import { defineCliConfig } from 'sanity/cli' // Importation de la fonction defineCliConfig depuis le package "sanity/cli"

// Récupération des variables d'environnement pour l'ID du projet et le dataset
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

// Exportation de la configuration CLI pour Sanity en utilisant defineCliConfig
export default defineCliConfig({
    // Configuration de l'API avec le projectId et le dataset
    api: { projectId, dataset },

    // Configuration de l'hôte du Studio Sanity
    studioHost: 'educonnect',
})
