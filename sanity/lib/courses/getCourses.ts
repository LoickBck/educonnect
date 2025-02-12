import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour exécuter des requêtes vers Sanity
import { defineQuery } from 'groq' // Importation de la fonction defineQuery pour définir une requête GROQ

// Fonction asynchrone pour récupérer la liste de tous les cours
export async function getCourses() {
    // Définition de la requête GROQ pour récupérer tous les documents de type "course"
    // La requête récupère :
    // - Tous les champs du cours avec "..."
    // - Le champ "slug" qui est transformé en une valeur simple (slug.current)
    // - Les données complètes de la référence "category" en utilisant l'opérateur de déploiement ({...})
    // - Les données complètes de la référence "instructor" de la même manière
    const getCoursesQuery = defineQuery(`*[_type == "course"] {
        ...,
        "slug": slug.current,
        "category": category->{...},
        "instructor": instructor->{...}
    }`)

    // Exécution de la requête via sanityFetch sans paramètres additionnels
    const courses = await sanityFetch({ query: getCoursesQuery })
    // Retourne uniquement la portion "data" de la réponse obtenue
    return courses.data
}
