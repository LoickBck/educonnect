import { defineQuery } from 'groq' // Importation de defineQuery pour définir une requête GROQ
import { sanityFetch } from '../live' // Fonction pour exécuter des requêtes sur Sanity en temps réel
import { getStudentByClerkId } from '../student/getStudentByClerkId' // Fonction pour obtenir les informations d'un étudiant à partir de son identifiant Clerk
import { calculateCourseProgress } from '@/lib/courseProgress' // Fonction pour calculer la progression globale d'un cours
import { Module } from '@/sanity.types' // Importation du type Module pour typer les modules d'un cours

// Fonction asynchrone qui calcule la progression d'un cours pour un étudiant donné
export async function getCourseProgress(clerkId: string, courseId: string) {
    // Récupérer l'ID Sanity de l'étudiant en utilisant son clerkId
    const student = await getStudentByClerkId(clerkId)

    // Si l'étudiant n'est pas trouvé, lever une erreur
    if (!student?.data?._id) {
        throw new Error('Étudiant non trouvé')
    }

    // Définition de la requête GROQ qui va récupérer :
    // - La liste des leçons complétées par l'étudiant pour le cours donné
    // - Les détails du cours, incluant ses modules et les leçons de chaque module
    const progressQuery = defineQuery(`{
        "completedLessons": *[_type == "lessonCompletion" && student._ref == $studentId && course._ref == $courseId] {
            ...,
            "lesson": lesson->{...},
            "module": module->{...}
        },
        "course": *[_type == "course" && _id == $courseId][0] {
            ...,
            "modules": modules[]-> {
                ...,
                "lessons": lessons[]-> {...}
            }
        }
    }`)

    // Exécute la requête en passant les paramètres studentId et courseId
    const result = await sanityFetch({
        query: progressQuery,
        params: { studentId: student.data._id, courseId },
    })

    // Extraction des données retournées : une liste de leçons complétées et les détails du cours
    const { completedLessons = [], course } = result.data

    // Calcul de la progression globale du cours en fonction du nombre total de leçons et du nombre de leçons complétées
    const courseProgress = calculateCourseProgress(
        (course?.modules as unknown as Module[]) || null,
        completedLessons
    )

    // Retourne un objet contenant la liste des leçons complétées et la progression calculée
    return {
        completedLessons,
        courseProgress,
    }
}
