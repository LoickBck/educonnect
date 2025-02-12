import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour effectuer des requêtes vers Sanity
import { defineQuery } from 'groq' // Importation de defineQuery pour définir une requête GROQ

// Fonction asynchrone qui récupère un cours en fonction de son slug
async function getCourseBySlug(slug: string) {
    // Définition de la requête GROQ pour obtenir le cours dont le champ "slug.current" correspond au paramètre $slug
    // La requête récupère tous les champs du cours, ainsi que les données associées aux références "category", "instructor" et "modules"
    // Pour les modules, la requête étend également la liste des leçons associées à chacun
    const getCourseBySlugQuery =
        defineQuery(`*[_type == "course" && slug.current == $slug][0] {
      ...,
      "category": category->{...},
      "instructor": instructor->{...},
      "modules": modules[]-> {
        ...,
        "lessons": lessons[]-> {...}
      }
    }`)

    // Exécute la requête en passant le slug en tant que paramètre
    const course = await sanityFetch({
        query: getCourseBySlugQuery,
        params: { slug },
    })

    // Retourne uniquement la portion "data" de la réponse obtenue
    return course.data
}

export default getCourseBySlug
