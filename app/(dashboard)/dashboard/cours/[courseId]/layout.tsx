import { redirect } from 'next/navigation' // Importation de la fonction redirect de Next.js pour rediriger l'utilisateur
import { currentUser } from '@clerk/nextjs/server' // Importation de la fonction pour récupérer l'utilisateur courant côté serveur avec Clerk
import getCourseById from '@/sanity/lib/courses/getCourseById' // Importation de la fonction pour récupérer un cours par son identifiant depuis Sanity
import { Sidebar } from '@/components/dashboard/Sidebar' // Importation du composant Sidebar pour le dashboard du cours
import { getCourseProgress } from '@/sanity/lib/lessons/getCourseProgress' // Importation de la fonction pour obtenir la progression du cours pour l'utilisateur
import { checkCourseAccess } from '@/lib/auth' // Importation de la fonction d'autorisation pour vérifier l'accès au cours

// Définition de l'interface des propriétés attendues par le layout du cours
interface CourseLayoutProps {
    children: React.ReactNode // Contenu enfant qui sera affiché dans le layout
    params: Promise<{
        // Paramètres de la route, ici un objet promis contenant l'identifiant du cours
        courseId: string
    }>
}

// Composant asynchrone pour le layout du cours
export default async function CourseLayout({
    children,
    params,
}: CourseLayoutProps) {
    // Récupération de l'utilisateur courant
    const user = await currentUser()
    // Extraction de l'identifiant du cours depuis les paramètres asynchrones
    const { courseId } = await params

    // Si l'utilisateur n'est pas authentifié, rediriger vers la page d'accueil
    if (!user?.id) {
        return redirect('/')
    }

    // Vérification de l'accès au cours pour l'utilisateur courant
    const authResult = await checkCourseAccess(user?.id || null, courseId)
    // Si l'utilisateur n'est pas autorisé à accéder au cours, le rediriger vers l'URL spécifiée dans authResult
    if (!authResult.isAuthorized || !user?.id) {
        return redirect(authResult.redirect!)
    }

    // Récupération simultanée des informations du cours et de la progression de l'utilisateur
    const [course, progress] = await Promise.all([
        getCourseById(courseId),
        getCourseProgress(user.id, courseId),
    ])

    // Si le cours n'existe pas, rediriger l'utilisateur vers la liste de ses cours
    if (!course) {
        return redirect('/mes-cours')
    }

    // Rendu du layout du cours avec la Sidebar et la zone principale pour le contenu
    return (
        <div className="h-full">
            {/* Composant Sidebar affichant les informations du cours et la progression */}
            <Sidebar
                course={course}
                completedLessons={progress.completedLessons}
            />
            {/* Zone principale affichant le contenu passé en enfant,
                avec des marges et un padding adaptés pour une bonne mise en page */}
            <main className="h-full lg:pt-[64px] pl-20 lg:pl-96">
                {children}
            </main>
        </div>
    )
}
