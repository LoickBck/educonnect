'use client' // Indique que ce fichier de configuration est destiné à être utilisé côté client

/**
 * Cette configuration est utilisée pour le Sanity Studio qui est monté sur la route
 * `/app/studio/[[...tool]]/page.tsx`. Elle définit l'ensemble des paramètres et plugins
 * permettant d'organiser et de prévisualiser le contenu dans Sanity Studio.
 */

import { visionTool } from '@sanity/vision' // Outil permettant d'exécuter des requêtes GROQ directement depuis le studio
import { defineConfig } from 'sanity' // Fonction pour définir la configuration du Sanity Studio
import { structureTool } from 'sanity/structure' // Outil permettant de construire la structure du studio

// Importation des variables d'environnement nécessaires à la configuration (version d'API, dataset, projectId)
// Pour en savoir plus sur le versioning de l'API, consultez : https://www.sanity.io/docs/api-versioning
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes' // Importation du schéma de contenu défini dans le dossier './sanity/schemaTypes'
import { structure } from './sanity/structure' // Importation de la structure personnalisée du studio
import { presentationTool } from 'sanity/presentation' // Outil de présentation pour activer la prévisualisation (draft mode)

// Définition et exportation de la configuration du Sanity Studio
export default defineConfig({
    basePath: '/studio', // Chemin de base où le studio sera accessible dans l'application
    projectId, // Identifiant du projet Sanity, récupéré depuis les variables d'environnement
    dataset, // Nom du dataset utilisé (par exemple "production" ou "development")
    // Le schéma de contenu (défini dans './sanity/schemaTypes') détermine la structure des documents
    schema,
    plugins: [
        // Plugin permettant de configurer la structure du studio selon la configuration définie dans "structure"
        structureTool({ structure }),
        // Plugin Vision pour exécuter des requêtes GROQ depuis le studio
        // Voir https://www.sanity.io/docs/the-vision-plugin pour plus d'informations
        visionTool({ defaultApiVersion: apiVersion }),
        // Plugin de présentation pour activer la prévisualisation des contenus en mode brouillon
        // La prévisualisation est activée via l'API '/api/draft-mode/enable'
        presentationTool({
            previewUrl: {
                previewMode: {
                    enable: '/api/draft-mode/enable',
                },
            },
        }),
    ],
    // Section beta pour les fonctionnalités expérimentales de création de contenu dans le studio
    beta: {
        create: {
            startInCreateEnabled: true, // Lance directement l'interface de création de document au démarrage
            fallbackStudioOrigin: 'educonnect.sanity.studio', // Domaine de repli utilisé par le studio si nécessaire
        },
    },
})
