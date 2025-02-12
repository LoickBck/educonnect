import { Search } from 'lucide-react' // Importation de l'icône Search depuis lucide-react
import { CourseCard } from '@/components/CourseCard' // Importation du composant CourseCard pour afficher les cours
import { searchCourses } from '@/sanity/lib/courses/searchCourses' // Importation de la fonction de recherche de cours depuis Sanity

// Définition de l'interface des propriétés attendues par la page de recherche
interface SearchPageProps {
    params: Promise<{
        term: string
    }>
}

// Composant asynchrone représentant la page de recherche
export default async function SearchPage({ params }: SearchPageProps) {
    // Récupération et décodage du terme de recherche depuis les paramètres
    const { term } = await params
    const decodedTerm = decodeURIComponent(term)

    // Exécution de la recherche de cours en utilisant le terme décodé
    const courses = await searchCourses(decodedTerm)

    // Rendu du contenu de la page de recherche
    return (
        <div className="h-full pt-16">
            <div className="container mx-auto px-4 py-8">
                {/* En-tête de la page avec l'icône de recherche et le titre */}
                <div className="flex items-center gap-4 mb-8">
                    <Search className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold">
                            Résultat des recherches
                        </h1>
                        <p className="text-muted-foreground">
                            {/* Affichage dynamique du nombre de résultats trouvés */}
                            Trouvé {courses.length} résultat
                            {courses.length === 1 ? '' : 's'} pour &quot;
                            {decodedTerm}&quot;
                        </p>
                    </div>
                </div>

                {/* Condition: si aucun cours n'est trouvé, afficher un message d'information */}
                {courses.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold mb-4">
                            Pas de cours trouvé
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Essayez avec des mots différents
                        </p>
                    </div>
                ) : (
                    // Sinon, afficher les cours trouvés dans une grille responsive
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <CourseCard
                                key={course._id} // Clé unique pour chaque cours
                                course={course} // Passage des données du cours au composant CourseCard
                                href={`/cours/${course.slug}`} // Lien vers la page détaillée du cours
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
