import { type SchemaTypeDefinition } from 'sanity' // Importation du type SchemaTypeDefinition depuis Sanity pour typer le schéma de contenu
import {
    courseType, // Définition du type pour les cours
    moduleType, // Définition du type pour les modules
    lessonType, // Définition du type pour les leçons
    instructorType, // Définition du type pour les instructeurs
    studentType, // Définition du type pour les étudiants
    enrollmentType, // Définition du type pour les inscriptions
    categoryType, // Définition du type pour les catégories
    lessonCompletionType, // Définition du type pour les complétions de leçon
} from './schemaTypes' // Importation des définitions de schémas depuis le dossier 'schemaTypes'

// Exportation de l'objet schema qui contient une propriété "types"
// Cette propriété est un tableau de définitions de schémas, et chaque élément du tableau correspond à un type de document géré par Sanity
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        courseType,
        moduleType,
        lessonType,
        instructorType,
        studentType,
        enrollmentType,
        categoryType,
        lessonCompletionType,
    ],
}
