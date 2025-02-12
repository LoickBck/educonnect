import { clerkMiddleware } from '@clerk/nextjs/server'
// Exporte le middleware Clerk qui gère l'authentification et les sessions utilisateur.
// Ce middleware sera appliqué à toutes les requêtes qui correspondent aux chemins définis dans la configuration.

export default clerkMiddleware()

export const config = {
    // Le "matcher" définit les routes sur lesquelles le middleware Clerk sera exécuté.
    matcher: [
        // Cette expression régulière exclut les fichiers statiques et les chemins internes de Next.js (par exemple, _next)
        // ainsi que les fichiers ayant des extensions courantes (html, css, js, images, fonts, etc.)
        // sauf si ces fichiers sont demandés avec des paramètres de recherche.
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Cette règle s'assure que le middleware s'exécute toujours pour les routes API et TRPC.
        '/(api|trpc)(.*)',
    ],
}
