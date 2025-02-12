import { GetCompletionsQueryResult, Module } from '@/sanity.types'

// Fonction qui calcule le nombre total de leçons dans l'ensemble des modules
export function calculateTotalLessons(modules: Module[] | null): number {
    // Si aucun module n'est fourni, retourne 0
    if (!modules) return 0
    // Parcourt tous les modules et additionne le nombre de leçons pour chaque module
    return modules.reduce(
        (acc, module) => acc + (module.lessons?.length || 0),
        0
    )
}

// Fonction qui calcule la progression du cours en pourcentage
export function calculateCourseProgress(
    modules: Module[] | null,
    completedLessons: GetCompletionsQueryResult['completedLessons']
): number {
    // Calcule le nombre total de leçons du cours
    const totalLessons = calculateTotalLessons(modules)
    // Calcule le nombre total de leçons complétées
    const totalCompleted = completedLessons.length

    // Retourne la progression sous forme de pourcentage arrondi
    // Si le nombre total de leçons est supérieur à 0, calcule le pourcentage (leçons complétées / total de leçons * 100)
    // Sinon, retourne 0
    return Math.round(
        totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0
    )
}
