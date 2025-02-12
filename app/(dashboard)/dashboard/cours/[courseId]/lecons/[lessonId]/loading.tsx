import { Skeleton } from '@/components/ui/skeleton'

// Composant Loading qui affiche des "skeletons" pour simuler le contenu pendant le chargement
function Loading() {
    return (
        // Conteneur principal avec un padding, une largeur maximale et centré horizontalement
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-y-8">
                {/* Skeleton pour simuler le titre (hauteur 8, largeur 50%) */}
                <Skeleton className="h-8 w-[50%]" />

                {/* Skeleton pour simuler le lecteur vidéo avec un ratio d'aspect vidéo */}
                <div className="aspect-video w-full">
                    <Skeleton className="h-full w-full rounded-md" />
                </div>

                {/* Skeleton pour simuler le contenu textuel avec plusieurs lignes */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[75%]" />
                    <Skeleton className="h-4 w-[85%]" />

                    {/* Espace pour simuler une séparation entre paragraphes */}
                    <div className="py-2" />

                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[60%]" />
                </div>
            </div>
        </div>
    )
}

export default Loading
