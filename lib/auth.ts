import { isEnrolledInCourse } from '@/sanity/lib/student/isEnrolledInCourse' // Fonction qui vérifie si un étudiant est inscrit à un cours donné
import { getStudentByClerkId } from '@/sanity/lib/student/getStudentByClerkId' // Fonction pour récupérer les informations d'un étudiant en fonction de son identifiant Clerk
import getCourseById from '@/sanity/lib/courses/getCourseById' // Fonction pour récupérer les informations d'un cours via son identifiant

// Définition de l'interface AuthResult qui structure le résultat de la vérification d'accès
interface AuthResult {
    isAuthorized: boolean // Indique si l'accès au cours est autorisé (true) ou non (false)
    redirect?: string // Optionnel : URL vers laquelle rediriger l'utilisateur en cas d'accès non autorisé
    studentId?: string // Optionnel : identifiant de l'étudiant (si trouvé)
}

// Fonction asynchrone checkCourseAccess qui vérifie si un utilisateur (identifié par clerkId) a accès au cours spécifié par courseId
export async function checkCourseAccess(
    clerkId: string | null, // Identifiant de l'utilisateur (Clerk) ou null
    courseId: string // Identifiant du cours à accéder
): Promise<AuthResult> {
    // Si aucun clerkId n'est fourni, l'accès est refusé et l'utilisateur est redirigé vers la page d'accueil
    if (!clerkId) {
        return {
            isAuthorized: false,
            redirect: '/',
        }
    }

    // Récupération des informations de l'étudiant associé à ce clerkId
    const student = await getStudentByClerkId(clerkId)
    // Si l'étudiant n'existe pas (ou si l'identifiant de l'étudiant n'est pas trouvé), refuser l'accès et rediriger vers la page d'accueil
    if (!student?.data?._id) {
        return {
            isAuthorized: false,
            redirect: '/',
        }
    }

    // Vérification si l'étudiant est inscrit au cours (en fonction du clerkId et du courseId)
    const isEnrolled = await isEnrolledInCourse(clerkId, courseId)
    // Récupération des informations du cours pour pouvoir rediriger correctement en cas d'échec
    const course = await getCourseById(courseId)
    // Si l'étudiant n'est pas inscrit au cours, l'accès est refusé et l'utilisateur est redirigé vers la page du cours (potentiellement pour lui présenter des détails ou la possibilité de s'inscrire)
    if (!isEnrolled) {
        return {
            isAuthorized: false,
            redirect: `/cours/${course?.slug?.current}`,
        }
    }

    // Si toutes les vérifications sont passées, l'accès est autorisé et on retourne l'identifiant de l'étudiant
    return {
        isAuthorized: true,
        studentId: student.data._id,
    }
}
