import { defineQuery } from 'groq' // Importation de defineQuery depuis la bibliothèque GROQ pour construire des requêtes sur Sanity
import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour exécuter des requêtes sur Sanity
import { getStudentByClerkId } from '../student/getStudentByClerkId' // Importation de la fonction qui récupère les informations d'un étudiant à partir de son identifiant Clerk

// Fonction asynchrone pour vérifier si une leçon a été complétée par un étudiant
export async function getLessonCompletionStatus(
    lessonId: string, // Identifiant de la leçon à vérifier
    clerkId: string // Identifiant de l'utilisateur (Clerk)
) {
    // Récupérer l'ID Sanity de l'étudiant via son clerkId
    const student = await getStudentByClerkId(clerkId)

    // Si l'étudiant n'est pas trouvé (absence d'ID étudiant), lever une erreur
    if (!student?.data?._id) {
        throw new Error('Étudiant non trouvé')
    }

    // Définition de la requête GROQ pour vérifier si une complétion de leçon existe
    // La requête cherche un document de type "lessonCompletion" qui correspond à l'étudiant et à la leçon donnés
    // [0] retourne le premier résultat trouvé, ou null s'il n'y a rien
    const completionStatusQuery =
        defineQuery(`*[_type == "lessonCompletion" && student._ref == $studentId && lesson._ref == $lessonId][0] {
    ...
  }`)

    // Exécution de la requête avec les paramètres studentId et lessonId
    const result = await sanityFetch({
        query: completionStatusQuery,
        params: { studentId: student.data._id, lessonId },
    })

    // Retourne true si un document de complétion a été trouvé (result.data n'est pas null), sinon false
    return result.data !== null
}
