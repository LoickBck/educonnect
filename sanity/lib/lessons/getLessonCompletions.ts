import { defineQuery } from 'groq' // Importation de defineQuery pour construire des requêtes GROQ
import { sanityFetch } from '../live' // Importation de sanityFetch pour exécuter des requêtes sur Sanity

// Fonction asynchrone pour récupérer les complétions de leçons d'un étudiant pour un cours donné,
// et calculer la progression par module ainsi que la progression globale du cours.
export async function getLessonCompletions(
    studentId: string, // Identifiant de l'étudiant (Sanity)
    courseId: string // Identifiant du cours
) {
    // Définition de la requête GROQ pour récupérer :
    // 1. "completedLessons" : tous les documents de type "lessonCompletion"
    //    correspondant à l'étudiant et au cours spécifiés.
    //    Pour chaque complétion, on étend les données de la leçon et du module associés.
    // 2. "course" : le document du cours, incluant ses modules et pour chaque module, ses leçons.
    const getCompletionsQuery = defineQuery(`{
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

    // Exécute la requête en passant studentId et courseId en paramètres
    const result = await sanityFetch({
        query: getCompletionsQuery,
        params: { studentId, courseId },
    })

    // Extraction des données retournées par la requête :
    // - course : le document du cours avec ses modules et leçons
    // - completedLessons : le tableau des complétions de leçons pour l'étudiant
    const { course, completedLessons } = result.data

    // Calcul de la progression pour chaque module du cours.
    // Pour chaque module, on calcule :
    // - Le nombre total de leçons dans le module
    // - Le nombre de leçons complétées dans ce module
    // - Le pourcentage de progression (si le module contient des leçons)
    const moduleProgress = course?.modules?.map((module) => {
        const totalLessons = module.lessons?.length || 0
        const completedInModule = completedLessons.filter(
            (completion) => completion.module?._id === module._id
        ).length

        return {
            moduleId: module._id, // Identifiant du module
            title: module.title, // Titre du module
            progress:
                totalLessons > 0 ? (completedInModule / totalLessons) * 100 : 0, // Pourcentage de progression du module
            completedLessons: completedInModule, // Nombre de leçons complétées dans ce module
            totalLessons, // Nombre total de leçons dans ce module
        }
    })

    // Calcul de la progression globale du cours :
    // - totalLessons : somme de toutes les leçons dans tous les modules du cours
    const totalLessons =
        course?.modules?.reduce(
            (acc, module) => acc + (module?.lessons?.length || 0),
            0
        ) || 0

    // - totalCompleted : nombre total de leçons complétées par l'étudiant dans le cours
    const totalCompleted = completedLessons?.length || 0

    // Calcul du pourcentage de progression globale du cours
    const courseProgress =
        totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0

    // Retourne un objet contenant :
    // - completedLessons : le tableau des leçons complétées (ou un tableau vide par défaut)
    // - moduleProgress : la progression par module (ou un tableau vide par défaut)
    // - courseProgress : le pourcentage de progression global du cours
    return {
        completedLessons: completedLessons || [],
        moduleProgress: moduleProgress || [],
        courseProgress,
    }
}
