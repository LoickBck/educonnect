'use client' // Ce module est exécuté côté client

import { Progress } from '@/components/ui/progress' // Importation du composant Progress pour afficher une barre de progression
import { cn } from '@/lib/utils' // Importation de la fonction utilitaire 'cn' pour concaténer conditionnellement les classes CSS

// Définition de l'interface des propriétés attendues pour le composant CourseProgress
interface CourseProgressProps {
    progress: number // Pourcentage de progression (de 0 à 100)
    variant?: 'default' | 'success' // Variante de style (par défaut ou succès)
    size?: 'default' | 'sm' // Taille de la barre de progression (par défaut ou petite)
    showPercentage?: boolean // Indique si le pourcentage doit être affiché à côté de la barre
    label?: string // Libellé facultatif à afficher au-dessus de la barre de progression
    className?: string // Classes CSS supplémentaires pour le conteneur
}

// Composant CourseProgress qui affiche la progression d'un cours sous forme de barre
export function CourseProgress({
    progress, // Pourcentage de progression
    variant = 'default', // Variante par défaut si non spécifiée
    size = 'default', // Taille par défaut si non spécifiée
    showPercentage = true, // Affiche le pourcentage par défaut
    label, // Libellé optionnel
    className, // Classes CSS supplémentaires optionnelles
}: CourseProgressProps) {
    return (
        // Conteneur principal avec un espacement vertical, combiné avec d'éventuelles classes personnalisées
        <div className={cn('space-y-2', className)}>
            {/* Ligne supérieure affichant le libellé et/ou le pourcentage de progression */}
            <div className="flex items-center justify-between gap-2 text-sm">
                {/* Si un label est fourni, on l'affiche */}
                {label && (
                    <span className="text-muted-foreground">{label}</span>
                )}
                {/* Si showPercentage est true, on affiche le pourcentage de progression */}
                {showPercentage && (
                    <span className="text-muted-foreground font-medium">
                        {progress}%
                    </span>
                )}
            </div>
            {/* Composant Progress affichant la barre de progression */}
            <Progress
                value={progress} // Définit la valeur de la barre de progression
                className={cn(
                    'h-2 transition-all', // Hauteur par défaut et transition pour les changements
                    size === 'sm' && 'h-1', // Si la taille est 'sm', réduire la hauteur
                    variant === 'success' && '[&>div]:bg-emerald-600' // Si la variante est 'success', appliquer une couleur spécifique à la barre
                )}
            />
        </div>
    )
}
