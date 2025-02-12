'use client' // Indique que ce composant s'exécute côté client

// Importation des icônes depuis lucide-react pour illustrer les différents états de la leçon
import { CheckCircle, Loader2, XCircle } from 'lucide-react'

// Importation du composant Button depuis notre bibliothèque d'interface utilisateur
import { Button } from './ui/button'

// Importation des hooks React pour gérer l'état, les effets et les transitions
import { useState, useEffect, useTransition } from 'react'

// Importation du hook useRouter de Next.js pour gérer la navigation (ex: rafraîchissement de la page)
import { useRouter } from 'next/navigation'

// Importation des actions côté serveur pour marquer une leçon comme complétée ou incomplète
import { completeLessonAction } from '@/app/actions/completeLessonAction'
import { uncompleteLessonAction } from '@/app/actions/uncompleteLessonAction'
import { getLessonCompletionStatusAction } from '@/app/actions/getLessonCompletionStatusAction'

// Importation de la fonction utilitaire pour concaténer conditionnellement les classes CSS
import { cn } from '@/lib/utils'

// Définition de l'interface des propriétés attendues par le composant
interface LessonCompleteButtonProps {
    lessonId: string // Identifiant de la leçon
    clerkId: string // Identifiant de l'utilisateur (Clerk)
}

// Composant affichant le bouton pour marquer une leçon comme complétée ou incomplète
export function LessonCompleteButton({
    lessonId,
    clerkId,
}: LessonCompleteButtonProps) {
    // isPending : indique si une action est en cours (attente de réponse)
    const [isPending, setIsPending] = useState(false)
    // isCompleted : état de complétion de la leçon (true, false ou null si non déterminé)
    const [isCompleted, setIsCompleted] = useState<boolean | null>(null)
    // useTransition pour gérer les mises à jour d'état en transition
    const [isPendingTransition, startTransition] = useTransition()
    // useRouter pour rafraîchir la page après modification
    const router = useRouter()

    // Effet pour récupérer l'état d'achèvement de la leçon dès le montage du composant ou au changement de lessonId/clerkId
    useEffect(() => {
        startTransition(async () => {
            try {
                // Récupère le statut d'achèvement de la leçon via une action asynchrone
                const status = await getLessonCompletionStatusAction(
                    lessonId,
                    clerkId
                )
                setIsCompleted(status)
            } catch (error) {
                console.error(
                    "Erreur de vérification de l'état d'achèvement de la leçon:",
                    error
                )
                // En cas d'erreur, on considère que la leçon n'est pas complétée
                setIsCompleted(false)
            }
        })
    }, [lessonId, clerkId])

    // Fonction qui gère le clic sur le bouton pour basculer l'état de complétion de la leçon
    const handleToggle = async () => {
        try {
            setIsPending(true)
            // Si la leçon est déjà complétée, on la marque comme incomplète
            if (isCompleted) {
                await uncompleteLessonAction(lessonId, clerkId)
            } else {
                // Sinon, on la marque comme complétée
                await completeLessonAction(lessonId, clerkId)
            }

            // Après le changement, on met à jour le statut en récupérant la nouvelle valeur
            startTransition(async () => {
                const newStatus = await getLessonCompletionStatusAction(
                    lessonId,
                    clerkId
                )
                setIsCompleted(newStatus)
            })

            // Rafraîchit la page pour refléter les changements
            router.refresh()
        } catch (error) {
            console.error(
                "Erreur de basculement de l'achèvement d'une leçon:",
                error
            )
        } finally {
            // Indique que l'action est terminée
            setIsPending(false)
        }
    }

    // Détermine si le composant est en train de charger (état initial ou transition)
    const isLoading = isCompleted === null || isPendingTransition

    return (
        // Conteneur fixe en bas de l'écran pour afficher le bouton d'action sur la leçon
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                {/* Zone d'information sur l'état de la leçon */}
                <div className="flex-1">
                    <p className="text-sm font-medium">
                        {isCompleted
                            ? 'Leçon terminée !'
                            : 'Prêt à terminer cette leçon ?'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {isCompleted
                            ? 'Vous pouvez le marquer comme incomplèt si vous devez recommencer.'
                            : 'Marquez-le comme complet lorsque vous avez terminé.'}
                    </p>
                </div>
                {/* Bouton d'action pour basculer l'état de la leçon */}
                <Button
                    onClick={handleToggle}
                    disabled={isPending || isLoading}
                    size="lg"
                    variant="default"
                    // Applique des classes conditionnelles en fonction de l'état de complétion de la leçon
                    className={cn(
                        'min-w-[200px] transition-all duration-200 ease-in-out',
                        isCompleted
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    )}
                >
                    {/* Affiche le contenu du bouton en fonction de l'état de chargement et de complétion */}
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Mise à jour...
                        </>
                    ) : isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            {isCompleted ? 'Inachèvement...' : 'Achèvement...'}
                        </>
                    ) : isCompleted ? (
                        <>
                            <XCircle className="h-4 w-4 mr-2" />
                            Marquer comme incomplet
                        </>
                    ) : (
                        <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marquer comme complet
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
