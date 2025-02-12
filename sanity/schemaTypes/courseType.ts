import { defineField, defineType } from 'sanity' // Importation des fonctions nécessaires pour définir des types de schéma dans Sanity

// Définition du type "course" (Cours) qui représente un cours dans l'application
export const courseType = defineType({
    name: 'course', // Nom interne du type, utilisé pour référencer ce schéma dans les requêtes et relations
    title: 'Cours', // Titre affiché dans l'interface Sanity Studio
    type: 'document', // Spécifie que ce type est un document, c'est-à-dire un enregistrement indépendant
    fields: [
        // Champ "title" (Titre) du cours
        defineField({
            name: 'title', // Nom interne du champ
            title: 'Titre', // Titre affiché pour le champ
            type: 'string', // Type de données attendu (chaîne de caractères)
            validation: (rule) => rule.required(), // Validation : ce champ est obligatoire
        }),
        // Champ "price" (Prix en EUR) du cours
        {
            name: 'price', // Nom du champ
            title: 'Prix (EUR)', // Titre affiché pour le champ
            type: 'number', // Type de données attendu (nombre)
            description: 'Prix en EUR', // Description du champ pour guider l'utilisateur
            validation: (Rule) => Rule.min(0), // Validation : le prix doit être supérieur ou égal à 0
        },
        // Champ "slug" pour générer une URL basée sur le titre du cours
        defineField({
            name: 'slug', // Nom interne du champ
            title: 'Url barre de recherche', // Titre affiché pour le champ, indiquant son utilisation pour les URL
            type: 'slug', // Type de données : slug (généralement dérivé d'une autre chaîne, ici "title")
            options: {
                source: 'title', // La source utilisée pour générer le slug est le champ "title"
                maxLength: 96, // Longueur maximale du slug
            },
            validation: (rule) => rule.required(), // Validation : ce champ est obligatoire
        }),
        // Champ "description" (Description) du cours
        defineField({
            name: 'description', // Nom interne du champ
            title: 'Description', // Titre affiché pour le champ
            type: 'text', // Type de données : texte (permettant plusieurs lignes)
        }),
        // Champ "image" pour l'image du cours
        defineField({
            name: 'image', // Nom interne du champ
            title: 'Image du cours', // Titre affiché pour le champ
            type: 'image', // Type de données : image
        }),
        // Champ "category" pour la catégorie du cours
        defineField({
            name: 'category', // Nom interne du champ
            title: 'Catégorie', // Titre affiché pour le champ
            type: 'reference', // Type de données : référence (lien vers un autre document)
            to: [{ type: 'category' }], // Le champ référence un document de type "category"
            validation: (rule) => rule.required(), // Validation : ce champ est obligatoire
        }),
        // Champ "modules" qui contient la liste des modules du cours
        defineField({
            name: 'modules', // Nom interne du champ
            title: 'Modules', // Titre affiché pour le champ
            type: 'array', // Type de données : tableau
            of: [{ type: 'reference', to: { type: 'module' } }], // Chaque élément du tableau est une référence à un document de type "module"
        }),
        // Champ "instructor" (Formateur) du cours
        defineField({
            name: 'instructor', // Nom interne du champ
            title: 'Formateur', // Titre affiché pour le champ
            type: 'reference', // Type de données : référence
            to: { type: 'instructor' }, // Le champ référence un document de type "instructor"
        }),
    ],
})
