'use client' // Indique que ce composant doit être exécuté côté client

import dynamic from 'next/dynamic' // Importation de la fonction dynamic de Next.js pour charger des composants de manière asynchrone

// Chargement dynamique de ReactPlayer depuis 'react-player/lazy'
// Le rendu côté serveur (SSR) est désactivé grâce à { ssr: false }
// Cela permet de s'assurer que ReactPlayer est chargé uniquement dans le navigateur
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

// Définition de l'interface pour les propriétés du composant VideoPlayer
interface VideoPlayerProps {
    url: string // URL de la vidéo à lire
}

// Composant VideoPlayer qui affiche une vidéo en utilisant ReactPlayer
export const VideoPlayer = ({ url }: VideoPlayerProps) => {
    return (
        // Conteneur qui assure une proportion d'aspect "vidéo" (aspect-video)
        <div className="relative aspect-video">
            {/* Composant ReactPlayer configuré pour occuper 100% de la largeur et de la hauteur du conteneur */}
            <ReactPlayer
                url={url} // L'URL de la vidéo à lire
                width="100%" // Largeur du lecteur égale à 100% du conteneur
                height="100%" // Hauteur du lecteur égale à 100% du conteneur
                controls // Affiche les contrôles de lecture (play, pause, etc.)
                playing={false} // La vidéo ne démarre pas automatiquement
            />
        </div>
    )
}
