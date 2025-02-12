'use server' // Indique que ce module doit être exécuté côté serveur

// Importation de la fonction permettant de marquer une leçon comme complétée dans la base de données Sanity
import { completeLessonById } from '@/sanity/lib/lessons/completeLessonById'

// Fonction asynchrone qui effectue l'action de compléter une leçon pour un utilisateur donné
export async function completeLessonAction(lessonId: string, clerkId: string) {
    try {
        // Appel de la fonction pour marquer la leçon comme complétée, en passant l'ID de la leçon et l'ID de l'utilisateur
        await completeLessonById({
            lessonId,
            clerkId,
        })

        // En cas de succès, on retourne un objet indiquant que l'action s'est déroulée correctement
        return { success: true }
    } catch (error) {
        // En cas d'erreur, on log l'erreur dans la console pour faciliter le débogage
        console.error("Erreur lors de l'achèvement de la leçon:", error)
        // Retourne un objet indiquant l'échec de l'opération et fournit un message d'erreur
        return { success: false, error: "La leçon n'a pas été achevée" }
    }
}
