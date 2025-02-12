import groq from 'groq' // Importation de la bibliothèque GROQ pour définir et exécuter des requêtes sur Sanity
import { client } from '../adminClient' // Importation du client Sanity configuré pour effectuer des opérations en écriture (création, mise à jour, etc.)
import { getStudentByClerkId } from '../student/getStudentByClerkId' // Importation de la fonction qui récupère les informations d'un étudiant à partir de son identifiant Clerk
import { sanityFetch } from '../live' // Importation de la fonction pour effectuer des requêtes en lecture sur Sanity

// Fonction asynchrone qui permet de marquer une leçon comme complétée
export async function completeLessonById({
    lessonId,
    clerkId,
}: {
    lessonId: string // Identifiant de la leçon à compléter
    clerkId: string // Identifiant de l'utilisateur (Clerk) qui complète la leçon
}) {
    try {
        // Récupère les informations de l'étudiant à partir du clerkId
        const student = await getStudentByClerkId(clerkId)

        // Si l'étudiant n'est pas trouvé (absence d'ID étudiant), on lève une erreur
        if (!student?.data?._id) {
            throw new Error('Étudiant non trouvé')
        }

        // Extraction de l'ID de l'étudiant à partir de la réponse
        const studentId = student.data._id

        // Vérifie si une complétion pour cette leçon existe déjà pour cet étudiant
        const existingCompletion = await sanityFetch({
            query: groq`*[_type == "lessonCompletion" && student._ref == $studentId && lesson._ref == $lessonId][0]`,
            params: { studentId, lessonId },
        })

        // Si une complétion existe déjà, retourne les données existantes sans en créer une nouvelle
        if (existingCompletion.data) {
            return existingCompletion.data
        }

        // Récupère les détails de la leçon pour obtenir le module et le cours associé
        const lesson = await sanityFetch({
            query: groq`*[_type == "lesson" && _id == $lessonId][0]{
                _id,
                "module": *[_type == "module" && references(^._id)][0]{
                    _id,
                    "course": *[_type == "course" && references(^._id)][0]._id
                }
            }`,
            params: { lessonId },
        })

        // Si le module ou le cours n'est pas trouvé pour la leçon, lève une erreur
        if (!lesson?.data?.module?._id || !lesson?.data?.module?.course) {
            throw new Error(
                'Impossible de trouver un module ou un cours pour la leçon'
            )
        }

        // Crée un nouvel enregistrement de complétion dans Sanity
        const completion = await client.create({
            _type: 'lessonCompletion', // Type du document de complétion de la leçon
            student: {
                _type: 'reference',
                _ref: studentId, // Référence à l'étudiant qui complète la leçon
            },
            lesson: {
                _type: 'reference',
                _ref: lessonId, // Référence à la leçon complétée
            },
            module: {
                _type: 'reference',
                _ref: lesson.data.module._id, // Référence au module auquel appartient la leçon
            },
            course: {
                _type: 'reference',
                _ref: lesson.data.module.course, // Référence au cours auquel appartient le module
            },
            completedAt: new Date().toISOString(), // Date et heure d'achèvement de la leçon
        })

        // Retourne l'enregistrement de complétion créé
        return completion
    } catch (error) {
        // En cas d'erreur, log l'erreur et la relance pour la gestion en amont
        console.error("Erreur lors de l'achèvement de la leçon:", error)
        throw error
    }
}
