'use client' // Indique que ce composant est destiné à être rendu côté client

// Définition des propriétés attendues par le composant LoomEmbed
interface LoomEmbedProps {
    shareUrl: string // URL de partage de la vidéo Loom
}

// Composant LoomEmbed qui convertit une URL de partage en URL d'intégration et affiche la vidéo Loom
export function LoomEmbed({ shareUrl }: LoomEmbedProps) {
    // Conversion de l'URL de partage en URL d'intégration :
    // - Remplace '/share/' par '/embed/'
    // - Supprime les éventuels paramètres de requête (en ne gardant que la partie avant le '?')
    const embedUrl = shareUrl.replace('/share/', '/embed/').split('?')[0]

    return (
        // Conteneur pour l'iframe, avec une proportion d'aspect "vidéo" et des coins arrondis
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {/* Iframe pour intégrer la vidéo Loom en utilisant l'URL d'intégration générée */}
            <iframe
                src={embedUrl} // URL de la vidéo Loom à intégrer
                allowFullScreen // Permet à l'iframe d'être affichée en mode plein écran
                className="absolute top-0 left-0 w-full h-full" // L'iframe occupe toute la taille du conteneur
            />
        </div>
    )
}
