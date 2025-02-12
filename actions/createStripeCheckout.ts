'use server' // Ce module est exécuté côté serveur

// Importation de l'instance Stripe configurée pour interagir avec l'API Stripe
import stripe from '@/lib/stripe'
// Importation de la base URL de l'application pour construire les URLs de redirection après paiement
import baseUrl from '@/lib/baseUrl'

// Importation de la fonction urlFor pour générer des URLs d'images à partir des données Sanity
import { urlFor } from '@/sanity/lib/image'
// Fonction qui récupère les détails d'un cours via son ID depuis Sanity
import getCourseById from '@/sanity/lib/courses/getCourseById'
// Fonction qui crée un étudiant dans Sanity s'il n'existe pas déjà, en se basant sur Clerk
import { createStudentIfNotExists } from '@/sanity/lib/student/createStudentIfNotExists'
// Importation du client Clerk pour récupérer les informations utilisateur côté serveur
import { clerkClient } from '@clerk/nextjs/server'
// Fonction qui crée une inscription (enrollment) dans Sanity pour le cours acheté
import { createEnrollment } from '@/sanity/lib/student/createEnrollment'

// Fonction asynchrone pour créer une session de paiement Stripe pour l'achat d'un cours
export async function createStripeCheckout(courseId: string, userId: string) {
    try {
        console.log('=== Début de createStripeCheckout ===')
        console.log('Paramètres reçus:', { courseId, userId })

        // 1. Récupération des détails du cours depuis Sanity en utilisant son ID
        const course = await getCourseById(courseId)
        console.log('Cours récupéré:', course)

        // Si aucun cours n'est trouvé, on lance une erreur
        if (!course) {
            throw new Error('Cours non trouvé')
        }

        // 2. Récupération de l'utilisateur via Clerk
        // Ici, on utilise clerkClient pour obtenir les informations de l'utilisateur identifié par userId
        const clerkUser = await (await clerkClient()).users.getUser(userId)
        console.log('Utilisateur Clerk récupéré:', clerkUser)

        // Extraction des informations essentielles de l'utilisateur (email, prénom, nom et image)
        const { emailAddresses, firstName, lastName, imageUrl } = clerkUser
        const email = emailAddresses[0]?.emailAddress
        console.log('Email de l’utilisateur:', email)

        // Vérification que l'utilisateur possède une adresse email valide
        if (!emailAddresses || !email) {
            throw new Error("Détails de l'utilisateur non trouvés")
        }

        // 3. Création de l'utilisateur dans Sanity s'il n'existe pas déjà
        const user = await createStudentIfNotExists({
            clerkId: userId,
            email: email || '',
            firstName: firstName || email, // Si le prénom n'est pas disponible, on utilise l'email comme substitut
            lastName: lastName || '',
            imageUrl: imageUrl || '',
        })
        console.log('Utilisateur Sanity:', user)

        // Si l'utilisateur n'a pas pu être créé ou récupéré, on lance une erreur
        if (!user) {
            throw new Error('Utilisateur non trouvé')
        }

        // 4. Validation des données du cours et préparation du prix pour Stripe
        // Vérification que le cours possède un prix défini (même si celui-ci est 0)
        if (!course.price && course.price !== 0) {
            throw new Error("Le prix du cours n'est pas fixé")
        }
        // Conversion du prix en centimes pour Stripe (1 EUR = 100 centimes)
        const priceInCents = Math.round(course.price * 100)
        console.log('Prix du cours (en centimes):', priceInCents)

        // Si le cours est gratuit (prix de 0 centime), on crée directement une inscription sans passer par Stripe
        if (priceInCents === 0) {
            await createEnrollment({
                studentId: user._id,
                courseId: course._id,
                paymentId: 'free',
                amount: 0,
            })
            console.log(
                'Cours gratuit : inscription créée et redirection vers le cours:',
                course.slug?.current
            )
            return { url: `/cours/${course.slug?.current}` }
        }

        // 5. Vérification des données obligatoires du cours (titre, description, image et slug)
        const { title, description, image, slug } = course
        console.log('Détails du cours:', { title, description, image, slug })

        if (!title || !description || !image || !slug) {
            throw new Error('Les données relatives aux cours sont incomplètes')
        }

        // 6. Préparation de l'URL de l'image à utiliser dans Stripe
        const imageUrlForStripe = urlFor(image).url()
        console.log("URL de l'image pour Stripe:", imageUrlForStripe)

        // 7. Création de la session de paiement Stripe
        // On crée une session de paiement avec un article (line_item) correspondant au cours
        // La session définit des URLs de succès et d'annulation basées sur la base URL de l'application et le slug du cours
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: title,
                            description: description,
                            images: [imageUrlForStripe || ''],
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment', // Mode de paiement unique
            success_url: `${baseUrl}/cours/${slug.current}`, // URL de redirection en cas de paiement réussi
            cancel_url: `${baseUrl}/cours/${slug.current}?canceled=true`, // URL de redirection en cas d'annulation du paiement
            metadata: {
                courseId: course._id,
                userId: userId,
            },
        })
        console.log('Session Stripe créée:', session)

        // 8. Retour de l'URL de la session de paiement Stripe pour rediriger l'utilisateur vers Stripe Checkout
        console.log("Redirection vers l'URL de la session Stripe:", session.url)
        console.log('=== Fin de createStripeCheckout ===')
        return { url: session.url }
    } catch (error) {
        // En cas d'erreur, on log l'erreur et on lance une nouvelle erreur avec un message générique
        console.error('Erreur dans createStripeCheckout:', error)
        throw new Error("Échec de la création d'une session de paiement")
    }
}
