// src/components/DisableDraftMode.tsx

'use client' // Ce composant s'exécute côté client

import { useDraftModeEnvironment } from 'next-sanity/hooks' // Importation du hook pour obtenir l'environnement de mode brouillon (draft)
import { useRouter } from 'next/navigation' // Importation du hook de navigation pour gérer les redirections et rafraîchissements

// Composant qui affiche un bouton pour désactiver le mode brouillon
export function DisableDraftMode() {
    // Récupère l'environnement de mode brouillon ("live", "preview", etc.)
    const environment = useDraftModeEnvironment()
    // Initialise le routeur pour gérer la navigation
    const router = useRouter()

    // N'affiche le bouton que si l'environnement est "live" ou "unknown"
    // Cela signifie qu'on n'affiche pas le bouton dans d'autres environnements, comme dans l'outil de présentation
    if (environment !== 'live' && environment !== 'unknown') {
        return null
    }

    // Fonction appelée lors du clic sur le bouton pour désactiver le mode brouillon
    const handleClick = async () => {
        // Envoie une requête à l'API pour désactiver le mode brouillon
        await fetch('/api/draft-mode/disable')
        // Rafraîchit la page pour refléter le changement de mode
        router.refresh()
    }

    // Rendu du bouton permettant de désactiver le mode brouillon
    return (
        <button
            onClick={handleClick}
            className="fixed bottom-4 text-black right-4 bg-gray-50 px-4 py-2 z-50"
        >
            Désactiver le mode d&apos;édition
        </button>
    )
}
