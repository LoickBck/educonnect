// Importation de la fonction pour récupérer l'utilisateur courant depuis Clerk (côté serveur)
import { currentUser } from '@clerk/nextjs/server'
// Importation de la fonction de redirection de Next.js
import { redirect } from 'next/navigation'
// Importation de la fonction pour obtenir les cours auxquels l'étudiant est inscrit depuis Sanity
import { getEnrolledCourses } from '@/sanity/lib/student/getEnrolledCourses'
// Importation du composant Link de Next.js pour la navigation
import Link from 'next/link'
// Importation de l'icône GraduationCap depuis lucide-react pour l'affichage
import { GraduationCap } from 'lucide-react'
// Importation de la fonction pour obtenir le progrès d'un cours depuis Sanity
import { getCourseProgress } from '@/sanity/lib/lessons/getCourseProgress'
// Importation du composant CourseCard pour afficher chaque cours
import { CourseCard } from '@/components/CourseCard'

// Définition de la page MyCoursesPage en tant que fonction asynchrone
export default async function MyCoursesPage() {
    // Récupération de l'utilisateur courant
    const user = await currentUser()

    // Si l'utilisateur n'est pas connecté, redirection vers la page d'accueil
    if (!user?.id) {
        return redirect('/')
    }

    // Récupération des cours auxquels l'utilisateur est inscrit
    const enrolledCourses = await getEnrolledCourses(user.id)

    // Récupération du progrès pour chaque cours inscrit
    const coursesWithProgress = await Promise.all(
        enrolledCourses.map(async ({ course }) => {
            // Si le cours n'existe pas, renvoyer null
            if (!course) return null
            // Récupération du progrès du cours pour l'utilisateur courant
            const progress = await getCourseProgress(user.id, course._id)
            // Retourne un objet contenant le cours et son progrès
            return {
                course,
                progress: progress.courseProgress,
            }
        })
    )

    // Rendu de la page
    return (
        <div className="h-full pt-16">
            <div className="container mx-auto px-4 py-8">
                {/* En-tête de la page avec icône et titre */}
                <div className="flex items-center gap-4 mb-8">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">Mes cours</h1>
                </div>

                {/* Vérification si l'utilisateur n'est inscrit à aucun cours */}
                {enrolledCourses.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold mb-4">
                            Pas encore de cours
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Vous n&apos;êtes pas encore inscrit à un cours.
                            Parcourez nos cours pour commencer !
                        </p>
                        {/* Lien pour rediriger l'utilisateur vers la page d'accueil pour parcourir les cours */}
                        <Link
                            href="/"
                            prefetch={false}
                            className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Parcourir les cours
                        </Link>
                    </div>
                ) : (
                    // Si des cours sont trouvés, les afficher dans une grille responsive
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coursesWithProgress.map((item) => {
                            // Vérifier que l'item et le cours existent
                            if (!item || !item.course) return null

                            // Rendu du composant CourseCard pour chaque cours avec son progrès
                            return (
                                <CourseCard
                                    key={item.course._id}
                                    course={item.course}
                                    progress={item.progress}
                                    href={`/dashboard/cours/${item.course._id}`}
                                />
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
