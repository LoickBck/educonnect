import { headers } from 'next/headers' // Importation pour accéder aux headers de la requête
import { NextResponse } from 'next/server' // Importation de NextResponse pour construire les réponses HTTP
import Stripe from 'stripe' // Importation du module Stripe pour gérer les webhooks et les paiements
import { getStudentByClerkId } from '@/sanity/lib/student/getStudentByClerkId' // Fonction pour récupérer un étudiant depuis Sanity via son Clerk ID
import { createEnrollment } from '@/sanity/lib/student/createEnrollment' // Fonction pour créer un enregistrement d'inscription dans Sanity

// Création d'une instance Stripe en utilisant la clé secrète et en spécifiant la version d'API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
})

// Récupération du secret du webhook Stripe depuis les variables d'environnement
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Fonction POST pour gérer le webhook Stripe
export async function POST(req: Request) {
    try {
        // Lecture du corps de la requête en tant que texte brut
        const body = await req.text()
        // Récupération des headers de la requête
        const headersList = await headers()
        // Extraction de la signature Stripe depuis les headers
        const signature = headersList.get('stripe-signature')

        // Si aucune signature n'est trouvée, renvoie une réponse 400 (Bad Request)
        if (!signature) {
            return new NextResponse('Aucune signature trouvée', { status: 400 })
        }

        let event: Stripe.Event

        try {
            // Construction et vérification de l'événement Stripe à partir du corps, de la signature et du secret
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                webhookSecret
            )
        } catch (error: unknown) {
            // Gestion de l'erreur lors de la vérification de la signature
            const errorMessage =
                error instanceof Error ? error.message : 'Erreur inconnue'
            console.error(
                `Échec de la vérification de la signature du webhook: ${errorMessage}`
            )
            // Renvoie une réponse 400 avec le message d'erreur
            return new NextResponse(`Erreur du webhook: ${errorMessage}`, {
                status: 400,
            })
        }

        // Gestion de l'événement 'checkout.session.completed'
        if (event.type === 'checkout.session.completed') {
            // Récupération de l'objet session provenant de l'événement
            const session = event.data.object as Stripe.Checkout.Session

            // Extraction des métadonnées pour obtenir l'ID du cours et l'ID de l'utilisateur
            const courseId = session.metadata?.courseId
            const userId = session.metadata?.userId

            // Vérifie que les métadonnées nécessaires sont présentes
            if (!courseId || !userId) {
                return new NextResponse('Métadonnées manquantes', {
                    status: 400,
                })
            }

            // Récupération de l'étudiant en utilisant son Clerk ID
            const student = await getStudentByClerkId(userId)

            // Si l'étudiant n'est pas trouvé, renvoie une réponse 400
            if (!student.data) {
                return new NextResponse('Étudiant non trouvé', { status: 400 })
            }

            // Création d'un enregistrement d'inscription dans Sanity
            await createEnrollment({
                studentId: student.data._id,
                courseId,
                paymentId: session.id,
                amount: session.amount_total! / 100, // Conversion du montant total de cents en euros
            })

            // Renvoie une réponse 200 indiquant un traitement réussi
            return new NextResponse(null, { status: 200 })
        }

        // Pour tous les autres types d'événements, renvoie simplement une réponse 200
        return new NextResponse(null, { status: 200 })
    } catch (error) {
        // Gestion globale des erreurs et renvoi d'une réponse 500 en cas d'échec
        console.error('Erreur dans le gestionnaire du webhook:', error)
        return new NextResponse('Échec du gestionnaire du webhook', {
            status: 500,
        })
    }
}
