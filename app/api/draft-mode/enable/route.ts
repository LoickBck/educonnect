/**
 * Ce fichier permet de mettre l'application en mode brouillon (Draft Mode).
 * Ce mode active l'édition visuelle et permet de prévisualiser le contenu en version brouillon
 * tel qu'il apparaîtra une fois publié.
 */

import { validatePreviewUrl } from '@sanity/preview-url-secret' // Import de la fonction pour valider l'URL de prévisualisation
import { client } from '@/sanity/lib/client' // Import du client Sanity configuré pour interagir avec l'API de Sanity
import { redirect } from 'next/navigation' // Import de la fonction de redirection de Next.js
import { draftMode } from 'next/headers' // Import de la fonction pour gérer le mode brouillon via les headers

const token = process.env.SANITY_API_TOKEN // Récupération du token API de Sanity depuis les variables d'environnement

export async function GET(request: Request) {
    // Valide l'URL de prévisualisation en utilisant le client Sanity avec le token configuré
    const { isValid, redirectTo = '/' } = await validatePreviewUrl(
        client.withConfig({ token }),
        request.url
    )

    // Si l'URL n'est pas valide, renvoie une réponse 401 Unauthorized avec un message d'erreur
    if (!isValid) {
        return new Response('Secret non valide', { status: 401 })
    }

    // Active le mode brouillon en appelant enable() sur l'objet retourné par draftMode()
    ;(await draftMode()).enable()

    // Redirige l'utilisateur vers l'URL de prévisualisation validée (ou la racine '/' par défaut)
    redirect(redirectTo)
}
