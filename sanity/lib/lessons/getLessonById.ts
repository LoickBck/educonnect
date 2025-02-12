import { defineQuery } from 'groq' // Importation de defineQuery pour définir une requête GROQ
import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour exécuter la requête sur Sanity

// Fonction asynchrone pour récupérer une leçon par son identifiant
export async function getLessonById(id: string) {
    // Définition de la requête GROQ pour obtenir une leçon dont l'_id correspond au paramètre $id
    // La requête utilise [0] pour retourner le premier document trouvé (ou null s'il n'y en a pas)
    // Elle récupère tous les champs de la leçon (avec "...")
    // Elle inclut également le module auquel la leçon appartient, ainsi que le cours associé à ce module
    const getLessonByIdQuery =
        defineQuery(`*[_type == "lesson" && _id == $id][0] {
        ...,
        "module": module->{
            ...,
            "course": course->{...}
        }
    }`)

    // Exécution de la requête avec le paramètre id
    const result = await sanityFetch({
        query: getLessonByIdQuery,
        params: { id },
    })

    // Retourne uniquement la portion "data" de la réponse
    return result.data
}
