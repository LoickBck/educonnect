// Composant Loading qui affiche une animation de chargement (spinner)
function Loading() {
    return (
        // Conteneur principal qui occupe toute la hauteur et la largeur de l'écran,
        // et centre son contenu horizontalement et verticalement.
        <div className="h-screen w-full flex items-center justify-center">
            {/* Conteneur relatif de taille fixe pour positionner le spinner et l'icône SVG */}
            <div className="h-16 w-16 relative">
                {/* Conteneur absolu qui occupe tout l'espace du parent */}
                <div className="absolute inset-0">
                    {/* Spinner animé :
                        - Occupe toute la largeur et la hauteur du conteneur parent.
                        - Applique une animation de rotation avec "animate-spin".
                        - Bordure de 4px avec une couleur générale (border-muted-foreground)
                          et une bordure supérieure d'une autre couleur (border-t-primary).
                        - Bordures arrondies pour obtenir un cercle. */}
                    <div className="h-full w-full animate-spin border-4 border-muted-foreground border-t-primary rounded-full" />
                </div>
                {/* Icône SVG positionnée au centre du conteneur pour ajouter un détail visuel.
                    - L'icône est centrée grâce aux classes utilitaires de positionnement et de translation. */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    {/* Chemin SVG définissant la forme de l'icône, avec des extrémités arrondies */}
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                </svg>
            </div>
        </div>
    )
}

// Exportation du composant Loading pour pouvoir l'utiliser ailleurs dans l'application
export default Loading
