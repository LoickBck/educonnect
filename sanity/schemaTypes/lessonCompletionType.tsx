import Image from 'next/image' // Importation du composant Image de Next.js pour afficher des images optimisées
import { defineField, defineType } from 'sanity' // Importation des fonctions nécessaires pour définir des types et des champs dans Sanity
import { urlFor } from '../lib/image' // Importation de la fonction urlFor pour générer des URLs d'images depuis Sanity

// Définition du type de document "lessonCompletion" qui représente l'achèvement d'une leçon par un étudiant
export const lessonCompletionType = defineType({
    name: 'lessonCompletion', // Nom interne du type
    title: 'Achèvement de la leçon', // Titre affiché dans l'interface Sanity Studio
    type: 'document', // Ce type est un document autonome dans Sanity
    fields: [
        // Champ "student" : référence vers le document étudiant
        defineField({
            name: 'student', // Nom interne du champ
            title: 'Étudiant', // Titre affiché pour ce champ
            type: 'reference', // Type de données : référence
            to: [{ type: 'student' }], // Référence vers un document de type "student"
            validation: (rule) => rule.required(), // Validation : ce champ est obligatoire
        }),
        // Champ "lesson" : référence vers la leçon complétée
        defineField({
            name: 'lesson',
            title: 'Leçon',
            type: 'reference',
            to: [{ type: 'lesson' }], // Référence vers un document de type "lesson"
            validation: (rule) => rule.required(),
        }),
        // Champ "module" : référence vers le module auquel appartient la leçon
        defineField({
            name: 'module',
            title: 'Module',
            type: 'reference',
            to: [{ type: 'module' }], // Référence vers un document de type "module"
            validation: (rule) => rule.required(),
        }),
        // Champ "course" : référence vers le cours auquel appartient la leçon
        defineField({
            name: 'course',
            title: 'Cours',
            type: 'reference',
            to: [{ type: 'course' }], // Référence vers un document de type "course"
            validation: (rule) => rule.required(),
        }),
        // Champ "completedAt" : date et heure à laquelle la leçon a été achevée
        defineField({
            name: 'completedAt',
            title: 'Achevé le',
            type: 'datetime', // Type de données : date et heure
            validation: (rule) => rule.required(), // Ce champ est obligatoire
        }),
    ],
    // Configuration de l'aperçu du document dans Sanity Studio
    preview: {
        // Sélection des champs à utiliser pour l'aperçu
        select: {
            courseTitle: 'course.title', // Titre du cours depuis le document référencé "course"
            lessonTitle: 'lesson.title', // Titre de la leçon depuis le document référencé "lesson"
            completedAt: 'completedAt', // Date d'achèvement
            courseImage: 'course.image', // Image du cours depuis le document référencé "course"
        },
        // Fonction de préparation de l'aperçu
        prepare({ courseTitle, lessonTitle, completedAt, courseImage }) {
            return {
                // Le titre affiche le titre du cours suivi du titre de la leçon, avec des valeurs par défaut en cas d'absence
                title: `${courseTitle || 'Cours'}: "${lessonTitle || 'Leçon'}"`,
                // Le sous-titre affiche la date d'achèvement formatée en date locale, ou une chaîne vide si non définie
                subtitle: completedAt
                    ? new Date(completedAt).toLocaleDateString()
                    : '',
                // Le média affiche l'image du cours, redimensionnée à 100x100 pixels
                media: (
                    <Image
                        src={urlFor(courseImage).url()}
                        alt={courseTitle}
                        width={100}
                        height={100}
                    />
                ),
            }
        },
    },
})
