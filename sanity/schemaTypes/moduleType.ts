import { defineField, defineType } from 'sanity' // Importation des fonctions nécessaires pour définir des types et des champs dans Sanity

// Définition du type "module" qui représente un module de cours dans l'application
export const moduleType = defineType({
    name: 'module', // Nom interne du type, utilisé pour référencer ce schéma dans Sanity
    title: 'Module', // Titre affiché dans Sanity Studio
    type: 'document', // Indique que ce schéma correspond à un document autonome
    fields: [
        // Champ "title" : Le titre du module
        defineField({
            name: 'title', // Nom interne du champ
            title: 'Titre du module', // Titre affiché pour ce champ dans l'interface
            type: 'string', // Type de données : chaîne de caractères
            validation: (rule) => rule.required(), // Validation : ce champ est obligatoire
        }),
        // Champ "lessons" : Un tableau de références vers des leçons
        defineField({
            name: 'lessons', // Nom interne du champ
            title: 'Leçons', // Titre affiché pour ce champ
            type: 'array', // Le type est un tableau
            // Chaque élément du tableau est une référence vers un document de type "lesson"
            of: [{ type: 'reference', to: { type: 'lesson' } }],
        }),
    ],
})
