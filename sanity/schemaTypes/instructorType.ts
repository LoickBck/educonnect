import { defineField, defineType } from 'sanity' // Importation des fonctions nécessaires pour définir des types et des champs dans Sanity

// Définition du type "instructor" qui représente un formateur dans l'application
export const instructorType = defineType({
    name: 'instructor', // Nom interne du type, utilisé pour référencer ce schéma dans Sanity
    title: 'Formateur', // Titre affiché dans Sanity Studio pour ce type de document
    type: 'document', // Indique que ce type est un document, c'est-à-dire un enregistrement indépendant dans Sanity
    fields: [
        // Champ "name" : Le nom du formateur
        defineField({
            name: 'name', // Nom interne du champ
            title: 'Nom', // Titre affiché dans l'interface de Sanity Studio
            type: 'string', // Type de données attendu : chaîne de caractères
            validation: (rule) => rule.required(), // Validation : ce champ est obligatoire
        }),
        // Champ "bio" : La biographie du formateur
        defineField({
            name: 'bio', // Nom interne du champ
            title: 'Bio', // Titre affiché pour ce champ
            type: 'text', // Type de données : texte (multi-ligne)
        }),
        // Champ "photo" : La photo du formateur
        defineField({
            name: 'photo', // Nom interne du champ
            title: 'Photo', // Titre affiché pour ce champ
            type: 'image', // Type de données : image
        }),
    ],
})
