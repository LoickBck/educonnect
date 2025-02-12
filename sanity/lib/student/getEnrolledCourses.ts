import { defineQuery } from 'groq' // Importation de defineQuery pour construire une requête GROQ
import { sanityFetch } from '../live' // Importation de sanityFetch pour exécuter la requête sur Sanity

// Fonction asynchrone pour récupérer les cours auxquels un étudiant est inscrit
export async function getEnrolledCourses(clerkId: string) {
    // Définition de la requête GROQ :
    // 1. On récupère le document "student" dont le champ "clerkId" correspond à $clerkId.
    // 2. Pour ce document étudiant (le premier trouvé grâce à [0]), on définit une propriété "enrolledCourses"
    //    qui est une sous-requête récupérant tous les documents "enrollment" où le champ "student._ref" correspond à l'_id de l'étudiant (^._id).
    // 3. Pour chaque enregistrement d'inscription, on étend toutes les propriétés avec "..."
    //    et on inclut le champ "course" en le résolvant (via course->) pour obtenir :
    //    - Tous les champs du cours,
    //    - Le champ "slug" transformé en "slug.current",
    //    - Les références "category" et "instructor" développées pour inclure tous leurs champs.
    const getEnrolledCoursesQuery =
        defineQuery(`*[_type == "student" && clerkId == $clerkId][0] {
    "enrolledCourses": *[_type == "enrollment" && student._ref == ^._id] {
      ...,
      "course": course-> {
        ...,
        "slug": slug.current,
        "category": category->{...},
        "instructor": instructor->{...}
      }
    }
  }`)

    // Exécute la requête en passant "clerkId" comme paramètre
    const result = await sanityFetch({
        query: getEnrolledCoursesQuery,
        params: { clerkId },
    })

    // Retourne la liste des cours inscrits (enrolledCourses) si elle existe,
    // sinon retourne un tableau vide
    return result?.data?.enrolledCourses || []
}
