'use client' // Indique que ce module doit être exécuté côté client

// Importation des icônes Moon et Sun depuis lucide-react pour représenter respectivement le thème sombre et le thème clair
import { Moon, Sun } from 'lucide-react'
// Importation du hook useTheme de next-themes pour gérer le changement de thème de l'application
import { useTheme } from 'next-themes'

// Importation du composant Button pour afficher un bouton stylisé
import { Button } from '@/components/ui/button'
// Importation des composants du menu déroulant pour créer l'interface de sélection du thème
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Composant DarkModeToggle permettant de basculer entre les thèmes clair, sombre et système
function DarkModeToggle() {
    // Récupération de la fonction setTheme pour modifier le thème courant
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            {/* Déclencheur du menu déroulant, rendu en tant qu'enfant pour hériter du style du bouton */}
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {/* Icône Sun affichée pour le thème clair
                        - Transition et transformation pour animer la rotation et l'échelle lors du changement de thème */}
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    {/* Icône Moon affichée pour le thème sombre
                        - Positionnée de manière absolue pour se superposer à l'icône Sun et animée lors du changement de thème */}
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    {/* Texte accessible pour les lecteurs d'écran */}
                    <span className="sr-only">Changer le thème</span>
                </Button>
            </DropdownMenuTrigger>
            {/* Contenu du menu déroulant aligné à droite */}
            <DropdownMenuContent align="end">
                {/* Item pour sélectionner le thème clair */}
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    Clair
                </DropdownMenuItem>
                {/* Item pour sélectionner le thème sombre */}
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Sombre
                </DropdownMenuItem>
                {/* Item pour sélectionner le thème système */}
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    Système
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DarkModeToggle
