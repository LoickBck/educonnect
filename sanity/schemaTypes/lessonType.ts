import { defineField, defineType } from 'sanity' // Importation des fonctions nécessaires pour définir des types et des champs dans Sanity

// Définition du type "lesson" qui représente une leçon dans le système de gestion de contenu
export const lessonType = defineType({
    name: 'lesson', // Nom interne du type
    title: 'Leçon', // Titre affiché dans l'interface Sanity Studio
    type: 'document', // Indique que ce type est un document indépendant
    fields: [
        // Champ "title" : titre de la leçon
        defineField({
            name: 'title', // Nom interne du champ
            title: 'Titre', // Titre affiché pour ce champ
            type: 'string', // Type de données attendu : chaîne de caractères
            validation: (rule) => rule.required(), // Le champ est obligatoire
        }),
        // Champ "slug" : identifiant URL basé sur le titre, utilisé dans la barre de recherche
        defineField({
            name: 'slug',
            title: 'Url dans la barre de recherche',
            type: 'slug', // Type de données : slug
            options: {
                source: 'title', // Génère automatiquement le slug à partir du champ "title"
                maxLength: 96, // Longueur maximale du slug
            },
            validation: (rule) => rule.required(), // Le champ est obligatoire
        }),
        // Champ "description" : description textuelle de la leçon
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text', // Type de données : texte multi-lignes
        }),
        // Champ "videoUrl" : URL du lecteur vidéo (par exemple, YouTube ou Vimeo)
        defineField({
            name: 'videoUrl',
            title: 'URL de la vidéo',
            type: 'url', // Type de données : URL
            description: "L'URL du lecteur vidéo (par exemple YouTube, Vimeo)", // Description pour guider l'utilisateur
        }),
        // Champ "loomUrl" : URL complète de la vidéo Loom, avec validation personnalisée
        defineField({
            name: 'loomUrl',
            title: 'URL de Loom',
            type: 'url', // Type de données : URL
            description:
                "L'URL complète de la video Loom (par exemple, https://www.loom.com/share/...)",
            // Validation personnalisée pour s'assurer que l'URL provient de loom.com et respecte un format précis
            validation: (rule) =>
                rule.custom((value) => {
                    if (!value) return true // Autorise les valeurs vides
                    try {
                        const url = new URL(value)
                        // Vérifie que le hostname se termine par "loom.com"
                        if (!url.hostname.endsWith('loom.com')) {
                            return "L'URL doit provenir de loom.com"
                        }
                        // Vérifie que le pathname commence par "/share/"
                        if (!url.pathname.startsWith('/share/')) {
                            return "Il doit s'agir d'une URL de partage de Loom"
                        }
                        // Extraction de l'ID vidéo à partir du pathname
                        const videoId = url.pathname.split('/share/')[1]
                        // Vérifie que l'ID correspond à un format attendu (entre 32 et 36 caractères, alphanumériques et tirets)
                        if (!/^[a-f0-9-]{32,36}/.test(videoId)) {
                            return "ID de la vidéo Loom invalide dans l'URL"
                        }
                        return true // Validation réussie
                    } catch {
                        // En cas d'erreur dans la création de l'objet URL, retourne un message d'erreur
                        return 'Veuillez saisir une URL valide'
                    }
                }),
        }),
        // Champ "content" : contenu riche de la leçon, sous forme d'un tableau de blocs
        defineField({
            name: 'content',
            title: 'Contenu',
            type: 'array', // Type de données : tableau
            of: [{ type: 'block' }], // Chaque élément du tableau est de type "block", qui représente un bloc de texte structuré
        }),
    ],
})
