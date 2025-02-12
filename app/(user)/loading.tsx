// Importation du composant Loader pour afficher un indicateur de chargement
import { Loader } from '@/components/ui/loader'
// Importation du composant Skeleton pour afficher des espaces réservés pendant le chargement du contenu
import { Skeleton } from '@/components/ui/skeleton'

// Définition du composant Loading qui affiche des éléments de substitution pendant le chargement
function Loading() {
    return (
        // Conteneur principal avec marges et padding
        <div className="container mx-auto px-4 py-8 mt-16">
            {/* Section "Hero" simulée par des Skeletons */}
            <div className="mb-12 space-y-6">
                {/* Skeleton pour simuler un titre ou une grande zone de texte */}
                <Skeleton className="h-32 w-4/5 max-w-3xl" />
                {/* Skeleton pour simuler une sous-titre ou un texte complémentaire */}
                <Skeleton className="h-8 w-3/5 max-w-2xl" />
            </div>

            {/* Grille de cartes de cours simulées par des Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    // Chaque élément représente une carte de cours en chargement
                    <div
                        key={i}
                        className="bg-card rounded-xl overflow-hidden shadow-lg border border-border flex flex-col"
                    >
                        {/* Zone réservée pour l'image du cours avec un Loader au centre */}
                        <div className="relative h-52 w-full bg-muted flex items-center justify-center">
                            <Loader size="lg" />
                        </div>

                        {/* Zone de contenu de la carte de cours */}
                        <div className="p-6 flex flex-col flex-1 space-y-4">
                            {/* Skeleton pour simuler le titre du cours */}
                            <Skeleton className="h-8 w-3/4" />
                            <div className="space-y-2">
                                {/* Skeleton pour simuler la description ou le résumé du cours */}
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>

                            <div className="mt-auto space-y-4">
                                {/* Section simulant les informations de l'instructeur */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {/* Skeleton pour simuler l'avatar de l'instructeur */}
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        {/* Skeleton pour simuler le nom de l'instructeur */}
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    {/* Skeleton pour simuler une icône ou un indicateur */}
                                    <Skeleton className="h-4 w-4" />
                                </div>

                                {/* Section simulant la progression ou les statistiques du cours */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        {/* Skeleton pour simuler une étiquette de progression */}
                                        <Skeleton className="h-4 w-24" />
                                        {/* Skeleton pour simuler un pourcentage ou une valeur numérique */}
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    {/* Skeleton pour simuler la barre de progression */}
                                    <Skeleton className="h-2 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Exportation du composant Loading pour qu'il puisse être utilisé dans d'autres parties de l'application
export default Loading
