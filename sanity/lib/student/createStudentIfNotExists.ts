import groq from 'groq' // Importation de GROQ pour construire des requêtes destinées à Sanity
import { client } from '../adminClient' // Importation du client administrateur Sanity pour effectuer des opérations d'écriture (création, mise à jour, etc.)
import { sanityFetch } from '../live' // Importation de la fonction sanityFetch pour effectuer des requêtes de lecture sur Sanity

// Définition de l'interface des propriétés nécessaires pour créer un étudiant
// Ces propriétés incluent l'identifiant Clerk, l'email, et éventuellement le prénom, le nom et l'URL de l'image
interface CreateStudentProps {
    clerkId: string
    email: string
    firstName?: string
    lastName?: string
    imageUrl?: string
}

// Fonction asynchrone qui crée un étudiant dans Sanity s'il n'existe pas déjà
export async function createStudentIfNotExists({
    clerkId,
    email,
    firstName,
    lastName,
    imageUrl,
}: CreateStudentProps) {
    // D'abord, vérifie si un étudiant avec le même clerkId existe déjà dans Sanity
    // La requête GROQ cherche un document de type "student" dont le champ "clerkId" correspond à la valeur passée
    const existingStudentQuery = await sanityFetch({
        query: groq`*[_type == "student" && clerkId == $clerkId][0]`,
        params: { clerkId },
    })

    // Si un étudiant existe déjà, on le log et on retourne ses données
    if (existingStudentQuery.data) {
        console.log("L'étudiant existe déjà", existingStudentQuery.data)
        return existingStudentQuery.data
    }

    // Si aucun étudiant n'a été trouvé, on crée un nouvel étudiant
    const newStudent = await client.create({
        _type: 'student', // Spécifie que le document créé est de type "student"
        clerkId, // Associe le clerkId fourni
        email, // Associe l'email fourni
        firstName, // Optionnel : prénom de l'étudiant
        lastName, // Optionnel : nom de l'étudiant
        imageUrl, // Optionnel : URL de l'image de l'étudiant
    })

    // Log de confirmation de la création du nouvel étudiant
    console.log('Nouvel étudiant créé', newStudent)

    // Retourne les données du nouvel étudiant créé
    return newStudent
}
