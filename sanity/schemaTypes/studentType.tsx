import Image from 'next/image' // Importation du composant Image de Next.js pour l'affichage optimisé d'images
import { defineField, defineType } from 'sanity' // Importation des fonctions nécessaires pour définir des types et des champs dans Sanity

// Définition du type "student" (étudiant) qui représente un document étudiant dans Sanity
export const studentType = defineType({
    name: 'student', // Nom interne du document, utilisé dans les références et requêtes
    title: 'Etudiant', // Titre affiché dans Sanity Studio pour ce type de document
    type: 'document', // Spécifie que ce schéma correspond à un document autonome
    fields: [
        // Champ pour le prénom de l'étudiant
        defineField({
            name: 'firstName', // Nom interne du champ
            title: 'Prénom', // Titre affiché pour le champ dans l'interface
            type: 'string', // Type de données : chaîne de caractères
        }),
        // Champ pour le nom de famille de l'étudiant
        defineField({
            name: 'lastName', // Nom interne du champ
            title: 'Nom de famille', // Titre affiché pour le champ
            type: 'string', // Type de données : chaîne de caractères
        }),
        // Champ pour l'adresse email de l'étudiant
        defineField({
            name: 'email', // Nom interne du champ
            title: 'Email', // Titre affiché
            type: 'string', // Type de données : chaîne de caractères
            validation: (rule) => rule.required(), // Validation : ce champ est requis
        }),
        // Champ pour stocker l'identifiant utilisateur Clerk (utilisé pour l'authentification)
        defineField({
            name: 'clerkId', // Nom interne du champ
            title: 'ID utilisateur Clerk', // Titre affiché
            type: 'string', // Type de données : chaîne de caractères
            validation: (rule) => rule.required(), // Ce champ est obligatoire
        }),
        // Champ pour l'URL de la photo de profil de l'étudiant
        defineField({
            name: 'imageUrl', // Nom interne du champ
            title: 'URL de la photo de profil', // Titre affiché pour ce champ
            type: 'url', // Type de données : URL
        }),
    ],
    // Configuration de l'aperçu du document dans Sanity Studio
    preview: {
        // Sélection des champs à utiliser pour l'aperçu
        select: {
            firstName: 'firstName',
            lastName: 'lastName',
            imageUrl: 'imageUrl',
        },
        // Fonction de préparation de l'aperçu qui définit le titre et le média à afficher
        prepare({ firstName, lastName, imageUrl }) {
            return {
                // Le titre est composé du prénom et du nom avec la première lettre en majuscule
                title: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`,
                // Le média affiché est l'image de profil, redimensionnée à 100x100 pixels
                media: (
                    <Image
                        src={imageUrl}
                        alt={`${firstName} ${lastName}`}
                        width={100}
                        height={100}
                    />
                ),
            }
        },
    },
})
