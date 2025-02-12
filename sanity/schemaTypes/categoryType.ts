import { defineField, defineType } from 'sanity' // Importation des fonctions nécessaires pour définir des types de schéma dans Sanity

// Définition du type "category" qui représente une catégorie dans le système de gestion de contenu
export const categoryType = defineType({
    name: 'category', // Nom interne du type (utilisé dans les requêtes et les références)
    title: 'Catégorie', // Titre affiché dans l'interface de Sanity Studio
    type: 'document', // Ce type est un document, c'est-à-dire un enregistrement indépendant dans Sanity
    fields: [
        // Champ "name" : le nom de la catégorie
        defineField({
            name: 'name', // Nom interne du champ
            title: 'Nom', // Titre affiché dans Sanity Studio pour ce champ
            type: 'string', // Type de données : chaîne de caractères
            validation: (rule) => rule.required(), // Validation : ce champ est obligatoire
        }),
        // Champ "slug" : utilisé pour générer une URL ou un identifiant lisible basé sur le nom
        defineField({
            name: 'slug', // Nom interne du champ
            title: 'Url barre de recherche', // Titre affiché, indiquant son usage pour les URL de recherche
            type: 'slug', // Type de données : slug (généralement basé sur le nom)
            options: {
                source: 'name', // Source à partir de laquelle le slug sera généré (ici, le champ "name")
                maxLength: 96, // Longueur maximale autorisée pour le slug
            },
            validation: (rule) => rule.required(), // Ce champ est également obligatoire
        }),
        // Champ "description" : une description textuelle de la catégorie
        defineField({
            name: 'description', // Nom interne du champ
            title: 'Description', // Titre affiché
            type: 'text', // Type de données : texte (multi-ligne)
        }),
        // Champ "icon" : permet de stocker l'identifiant d'une icône associée à la catégorie
        defineField({
            name: 'icon', // Nom interne du champ
            title: 'Icone', // Titre affiché
            type: 'string', // Type de données : chaîne de caractères
            description:
                "Identifiant de l'icône (par exemple, pour l'utilisation avec des bibliothèques d'icônes))", // Description pour guider l'utilisateur
        }),
        // Champ "color" : permet de stocker un code couleur associé à la catégorie
        defineField({
            name: 'color', // Nom interne du champ
            title: 'Couleur', // Titre affiché
            type: 'string', // Type de données : chaîne de caractères
            description: 'Code couleur de la catégorie (par exemple, #FF0000)', // Description explicative
        }),
    ],
})
