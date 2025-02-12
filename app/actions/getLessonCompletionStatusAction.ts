'use server' // Indique que ce module doit être exécuté côté serveur

// Importation de la fonction qui récupère le statut d'achèvement d'une leçon pour un utilisateur spécifique depuis Sanity
import { getLessonCompletionStatus } from '@/sanity/lib/lessons/getLessonCompletionStatus'

// Fonction asynchrone qui vérifie si une leçon a été complétée par un utilisateur (via son clerkId)
export async function getLessonCompletionStatusAction(
    lessonId: string, // Identifiant de la leçon
    clerkId: string // Identifiant de l'utilisateur (Clerk)
) {
    try {
        // Appelle la fonction pour obtenir le statut d'achèvement et retourne le résultat
        return await getLessonCompletionStatus(lessonId, clerkId)
    } catch (error) {
        // En cas d'erreur, affiche l'erreur dans la console pour le débogage
        console.error(
            "Erreur dans l'obtention du statut d'achèvement de la leçon:",
            error
        )
        // Retourne false si une erreur se produit
        return false
    }
}
