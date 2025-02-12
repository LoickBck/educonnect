'use client' // Indique que ce composant doit être rendu côté client (Next.js 13)

// Importation des fonctions et des composants nécessaires
import { createStripeCheckout } from '@/actions/createStripeCheckout'
import { useUser } from '@clerk/nextjs'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

// Composant EnrollButton pour gérer l'affichage du bouton d'inscription à un cours
function EnrollButton({
    courseId,
    isEnrolled,
}: {
    courseId: string
    isEnrolled: boolean
}) {
    // Récupération de l'utilisateur et de l'état de chargement via Clerk
    const { user, isLoaded: isUserLoaded } = useUser()
    // Initialisation du routeur pour la navigation
    const router = useRouter()
    // Hook pour gérer les transitions d'état (chargement, actions asynchrones)
    const [isPending, startTransition] = useTransition()

    // Fonction pour gérer l'inscription et rediriger vers la page de paiement Stripe
    const handleEnroll = async (courseId: string) => {
        startTransition(async () => {
            try {
                // Récupération de l'identifiant de l'utilisateur connecté
                const userId = user?.id
                if (!userId) return

                // Création d'une session de paiement Stripe pour le cours
                const { url } = await createStripeCheckout(courseId, userId)
                if (url) {
                    // Redirection vers l'URL fournie par Stripe pour finaliser le paiement
                    router.push(url)
                }
            } catch (error) {
                // Affichage de l'erreur dans la console en cas d'échec de la création de la session
                console.error('Erreur dans handleEnroll:', error)
                throw new Error(
                    "Échec de la création d'une session de paiement"
                )
            }
        })
    }

    // Affichage d'un indicateur de chargement tant que l'utilisateur n'est pas chargé ou que la transition est en cours
    if (!isUserLoaded || isPending) {
        return (
            <div className="w-full h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
            </div>
        )
    }

    // Si l'utilisateur est déjà inscrit, on affiche un lien vers le cours
    if (isEnrolled) {
        return (
            <Link
                prefetch={false}
                href={`/dashboard/cours/${courseId}`}
                className="w-full rounded-lg px-6 py-3 font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 h-12 flex items-center justify-center gap-2 group"
            >
                <span>Accès au cours</span>
                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
        )
    }

    // Affichage du bouton d'inscription lorsque l'utilisateur n'est pas encore inscrit
    return (
        <button
            className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out relative h-12
        ${
            isPending || !user?.id
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100'
                : 'bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-black/10'
        }
      `}
            disabled={!user?.id || isPending}
            onClick={() => handleEnroll(courseId)}
        >
            {/* Affichage du texte du bouton en fonction de l'état de connexion de l'utilisateur */}
            {!user?.id ? (
                <span className={`${isPending ? 'opacity-0' : 'opacity-100'}`}>
                    Se connecter !
                </span>
            ) : (
                <span className={`${isPending ? 'opacity-0' : 'opacity-100'}`}>
                    Acheter maintenant
                </span>
            )}
            {/* Si une action est en cours, affiche un indicateur de chargement sur le bouton */}
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                </div>
            )}
        </button>
    )
}

// Exportation du composant EnrollButton par défaut
export default EnrollButton
