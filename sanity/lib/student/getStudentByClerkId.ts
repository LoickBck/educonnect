import { defineQuery } from 'groq' // Importation de la fonction defineQuery pour construire des requêtes GROQ
import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour exécuter des requêtes sur Sanity

// Fonction asynchrone qui récupère les informations d'un étudiant en fonction de son clerkId
export async function getStudentByClerkId(clerkId: string) {
    // Définition de la requête GROQ :
    // On cherche un document de type "student" dont le champ clerkId correspond à la valeur passée ($clerkId)
    // [0] permet de retourner le premier résultat trouvé (ou null s'il n'y en a pas)
    const getStudentByClerkIdQuery = defineQuery(
        `*[_type == "student" && clerkId == $clerkId][0]`
    )

    // Exécution de la requête en passant le paramètre clerkId
    const student = await sanityFetch({
        query: getStudentByClerkIdQuery,
        params: { clerkId },
    })

    // Retourne le résultat de la requête (qui contient généralement une propriété "data")
    return student
}
