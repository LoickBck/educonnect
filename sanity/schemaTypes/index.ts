import { type SchemaTypeDefinition } from 'sanity' // Importation du type SchemaTypeDefinition depuis Sanity pour typer le schéma de contenu

// Importation des définitions de schémas de chaque type de document utilisés dans l'application
import { courseType } from './courseType' // Définition du schéma pour le type "course" (cours)
import { moduleType } from './moduleType' // Définition du schéma pour le type "module" (module de cours)
import { lessonType } from './lessonType' // Définition du schéma pour le type "lesson" (leçon)
import { instructorType } from './instructorType' // Définition du schéma pour le type "instructor" (formateur)
import { blockContent } from './blockContent' // Définition du schéma pour le contenu riche (texte structuré)
import { studentType } from './studentType' // Définition du schéma pour le type "student" (étudiant)
import { enrollmentType } from './enrollmentType' // Définition du schéma pour le type "enrollment" (inscription)
import { categoryType } from './categoryType' // Définition du schéma pour le type "category" (catégorie)
import { lessonCompletionType } from './lessonCompletionType' // Définition du schéma pour le type "lessonCompletion" (complétion de leçon)

// Exportation de l'objet "schema" qui regroupe tous les types de schémas utilisés par Sanity dans l'application
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        courseType, // Schéma pour les cours
        moduleType, // Schéma pour les modules
        lessonType, // Schéma pour les leçons
        instructorType, // Schéma pour les formateurs
        blockContent, // Schéma pour le contenu riche
        studentType, // Schéma pour les étudiants
        enrollmentType, // Schéma pour les inscriptions
        categoryType, // Schéma pour les catégories
        lessonCompletionType, // Schéma pour la complétion des leçons
    ],
}

// Réexportation de chaque type de schéma pour faciliter les importations ailleurs dans l'application
export * from './courseType'
export * from './moduleType'
export * from './lessonType'
export * from './instructorType'
export * from './studentType'
export * from './enrollmentType'
export * from './categoryType'
export * from './lessonCompletionType'
