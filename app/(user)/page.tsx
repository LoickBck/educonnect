import Hero from '@/components/Hero' // Importation du composant Hero pour l'affichage de la section d'accueil
import { CourseCard } from '@/components/CourseCard' // Importation du composant CourseCard pour afficher les cours
import { getCourses } from '@/sanity/lib/courses/getCourses'
import Link from 'next/link' // Importation de la fonction pour récupérer la liste des cours depuis Sanity

export const dynamic = 'force-static' // Forcer le rendu statique de la page (Next.js)
export const revalidate = 3600 // Régénérer la page au maximum toutes les heures (3600 secondes)

export default async function Home() {
    // Récupération asynchrone des cours depuis la base de données Sanity
    const courses = await getCourses()

    return (
        // Conteneur principal de la page avec une hauteur minimale égale à celle de l'écran et un fond personnalisé
        <div className="min-h-screen bg-background pt-16">
            <Hero /> {/* Affichage du composant Hero en haut de la page */}
            {/* Grille des cours */}
            <div className="container mx-auto px-4">
                {/* Séparateur avec un texte indiquant "Cours populaires" */}
                <div className="flex items-center gap-4 py-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-border/0 via-border to-border/0" />
                    <span className="text-sm font-medium text-muted-foreground">
                        Cours populaires
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-border/0 via-border to-border/0" />
                </div>

                {/* Grille responsive pour afficher les cours */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                    {courses.map((course) => (
                        // Pour chaque cours, on affiche une carte de cours avec un lien vers sa page dédiée
                        <CourseCard
                            key={course._id}
                            course={course}
                            href={`/cours/${course.slug}`}
                        />
                    ))}
                </div>
            </div>
            <p className="text-14-regular justify-items-end text-center text-dark-600 xl:text-left py-12 xl:ml-10">
                ©2025 <Link href="https://buckloick.com/">Loick Buck</Link>
            </p>
        </div>
    )
}
