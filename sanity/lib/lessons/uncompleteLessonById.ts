import { client } from '../adminClient' // Importation du client admin de Sanity pour effectuer des opérations d'écriture (ici, la suppression d'un document)
import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour exécuter des requêtes en lecture sur Sanity
import groq from 'groq' // Importation de GROQ pour définir des requêtes sur Sanity

// Définition de l'interface des paramètres attendus par la fonction uncompleteLessonById
interface UncompleteLessonParams {
    lessonId: string // Identifiant de la leçon à marquer comme non complétée
    clerkId: string // Identifiant de l'utilisateur (Clerk) dont on doit obtenir l'ID étudiant dans Sanity
}

// Fonction asynchrone qui annule l'achèvement d'une leçon en supprimant l'enregistrement de complétion correspondant
export async function uncompleteLessonById({
    lessonId,
    clerkId,
}: UncompleteLessonParams) {
    // Récupération de l'identifiant de l'étudiant dans Sanity en fonction du clerkId fourni.
    // La requête GROQ cherche le premier document de type "student" dont le champ clerkId correspond au paramètre $clerkId
    // et retourne uniquement son _id.
    const student = await sanityFetch({
        query: groq`*[_type == "student" && clerkId == $clerkId][0]._id`,
        params: { clerkId },
    })

    // Si aucun étudiant n'est trouvé (student.data est nul ou indéfini), on lève une erreur
    if (!student.data) {
        throw new Error('Étudiant non trouvé')
    }

    // Suppression du document de complétion de leçon correspondant dans Sanity.
    // La requête cherche le premier document de type "lessonCompletion" où :
    // - Le champ student._ref correspond à l'identifiant de l'étudiant récupéré (student.data)
    // - Le champ lesson._ref correspond à l'identifiant de la leçon fourni (lessonId)
    await client.delete({
        query: `*[_type == "lessonCompletion" && student._ref == $studentId && lesson._ref == $lessonId][0]`,
        params: { studentId: student.data, lessonId },
    })
}
