import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour effectuer des requêtes vers Sanity
import { defineQuery } from 'groq' // Importation de la fonction defineQuery pour définir des requêtes GROQ

// Fonction asynchrone qui récupère les informations d'un cours à partir de son identifiant
async function getCourseById(id: string) {
    // Définition de la requête GROQ pour obtenir le cours correspondant à l'identifiant fourni
    const getCourseByIdQuery =
        defineQuery(`*[_type == "course" && _id == $id][0] {
      ...,  
      "category": category->{...}, 
      "instructor": instructor->{...}, 
      "modules": modules[]-> {  
        ..., 
        "lessons": lessons[]-> {...} 
      }
    }`)

    // Exécution de la requête via sanityFetch en passant l'identifiant du cours comme paramètre
    const course = await sanityFetch({
        query: getCourseByIdQuery,
        params: { id },
    })

    // Retourne uniquement la portion de données de la réponse
    return course.data
}

export default getCourseById
