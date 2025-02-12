import { defineQuery } from 'groq' // Importation de la fonction defineQuery pour définir une requête GROQ
import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour exécuter la requête sur le dataset Sanity

// Fonction asynchrone qui recherche des cours en fonction d'un terme de recherche
export async function searchCourses(term: string) {
    // Définition de la requête GROQ pour rechercher des cours
    // La condition "match" permet de trouver des cours dont le titre, la description,
    // ou le nom de la catégorie correspondent au terme fourni (préfixé par le terme suivi d'un "*")
    const searchQuery = defineQuery(`*[_type == "course" && (
        title match $term + "*" ||
        description match $term + "*" ||
        category->name match $term + "*"
      )] {
        ...,
        "slug": slug.current,
        "category": category->{...}, 
        "instructor": instructor->{...} 
      }`)

    // Exécution de la requête en passant le terme de recherche comme paramètre
    const result = await sanityFetch({
        query: searchQuery,
        params: { term },
    })

    // Retourne les données trouvées ou un tableau vide si aucune donnée n'est retournée
    return result.data || []
}
