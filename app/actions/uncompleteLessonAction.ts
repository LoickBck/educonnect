'use server' // Indique que ce fichier doit être exécuté côté serveur

import { uncompleteLessonById } from '@/sanity/lib/lessons/uncompleteLessonById' // Importation de la fonction permettant de marquer une leçon comme non complétée dans Sanity

// Fonction asynchrone qui annule l'achèvement d'une leçon pour un utilisateur donné
export async function uncompleteLessonAction(
    lessonId: string, // Identifiant de la leçon à annuler
    clerkId: string // Identifiant de l'utilisateur (Clerk) concerné
) {
    try {
        // Appel de la fonction pour marquer la leçon comme non complétée en passant l'ID de la leçon et l'ID de l'utilisateur
        await uncompleteLessonById({
            lessonId,
            clerkId,
        })

        // Retourne un objet indiquant que l'opération a réussi
        return { success: true }
    } catch (error) {
        // En cas d'erreur, affiche l'erreur dans la console pour faciliter le débogage
        console.error("Erreur d'inachèvement de la leçon:", error)
        // Relance l'erreur pour permettre à la couche appelante de la gérer
        throw error
    }
}
