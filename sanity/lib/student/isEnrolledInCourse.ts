import groq from 'groq' // Importation de GROQ pour écrire des requêtes sur Sanity
import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour exécuter des requêtes sur Sanity

// Fonction asynchrone pour vérifier si un étudiant (identifié par clerkId) est inscrit à un cours (courseId)
export async function isEnrolledInCourse(clerkId: string, courseId: string) {
    try {
        // Première étape : récupérer l'identifiant du document "student" correspondant au clerkId fourni
        const studentQuery = groq`*[_type == "student" && clerkId == $clerkId][0]._id`
        const studentId = await sanityFetch({
            query: studentQuery,
            params: { clerkId },
        })

        // Si aucun étudiant n'est trouvé, on log un message et on retourne false
        if (!studentId) {
            console.log("Aucun étudiant n'a été trouvé avec clerkId:", clerkId)
            return false
        }

        // Deuxième étape : vérifier l'existence d'un document "enrollment"
        // qui lie l'étudiant (via son _id récupéré) et le cours (courseId)
        const enrollmentQuery = groq`*[_type == "enrollment" && student._ref == $studentId && course._ref == $courseId][0]`
        const enrollment = await sanityFetch({
            query: enrollmentQuery,
            // On passe studentId.data car la réponse studentId contient un objet avec la propriété data qui contient l'_id
            params: { studentId: studentId.data, courseId },
        })

        // Retourne true si un document d'inscription a été trouvé, false sinon
        return !!enrollment.data
    } catch (error) {
        // En cas d'erreur, on log l'erreur et on retourne false
        console.error("Erreur de vérification du statut d'inscription:", error)
        return false
    }
}
