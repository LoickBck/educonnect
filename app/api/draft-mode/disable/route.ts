// Importation de la fonction draftMode depuis next/headers pour gérer le mode brouillon
import { draftMode } from 'next/headers'
// Importation des classes NextRequest et NextResponse depuis next/server pour gérer la requête et la réponse HTTP
import { NextRequest, NextResponse } from 'next/server'

// Fonction GET qui désactive le mode brouillon et redirige vers la page d'accueil
export async function GET(request: NextRequest) {
    // Désactive le mode brouillon en appelant la méthode disable() sur l'objet retourné par draftMode()
    await (await draftMode()).disable()
    // Redirige l'utilisateur vers la page d'accueil ('/') en utilisant l'URL de la requête actuelle
    return NextResponse.redirect(new URL('/', request.url))
}
