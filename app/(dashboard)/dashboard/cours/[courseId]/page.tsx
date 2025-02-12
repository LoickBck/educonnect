import getCourseById from '@/sanity/lib/courses/getCourseById' // Importation de la fonction permettant de récupérer un cours par son identifiant depuis Sanity
import { redirect } from 'next/navigation' // Importation de la fonction redirect de Next.js pour rediriger l'utilisateur

// Définition de l'interface des propriétés attendues par la page du cours
interface CoursePageProps {
    params: Promise<{
        // Les paramètres de la route sont récupérés de manière asynchrone
        courseId: string // Le paramètre attendu est l'identifiant du cours
    }>
}

// Composant asynchrone représentant la page d'un cours
export default async function CoursePage({ params }: CoursePageProps) {
    // Extraction de l'identifiant du cours depuis les paramètres asynchrones
    const { courseId } = await params
    // Récupération des informations du cours en appelant la fonction getCourseById avec l'identifiant récupéré
    const course = await getCourseById(courseId)

    // Si le cours n'existe pas, redirection vers la page d'accueil
    if (!course) {
        return redirect('/')
    }

    // Si le cours contient au moins un module avec au moins une leçon (et que cette leçon possède un identifiant),
    // rediriger l'utilisateur vers la première leçon du premier module du cours
    if (course.modules?.[0]?.lessons?.[0]?._id) {
        return redirect(
            `/dashboard/cours/${courseId}/lecons/${course.modules[0].lessons[0]._id}`
        )
    }

    // Si le cours existe mais ne contient pas de modules ou de leçons, afficher un message informatif
    return (
        <div className="h-full flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold">
                    Commençons: {course.title}
                </h2>
                <p className="text-muted-foreground">
                    Ce cours n&apos;a pas encore de contenu. Veuillez revenir
                    plus tard.
                </p>
            </div>
        </div>
    )
}
