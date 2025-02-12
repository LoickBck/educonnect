/**
 * Cette route est responsable de l'environnement d'édition intégré utilisant Sanity Studio.
 * Toutes les routes sous votre chemin "studio" sont gérées par ce fichier grâce aux routes catch-all de Next.js :
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * Vous pouvez en savoir plus sur le package next-sanity ici :
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio' // Importation du composant NextStudio pour intégrer Sanity Studio dans Next.js
import config from '../../../../sanity.config' // Importation de la configuration de Sanity à partir du fichier de configuration

export const dynamic = 'force-static' // Force le rendu statique de cette page pour de meilleures performances

export { metadata, viewport } from 'next-sanity/studio' // Réexporte les métadonnées et la configuration du viewport depuis next-sanity/studio

export default function StudioPage() {
    // Composant principal de la page Studio qui retourne le composant NextStudio avec la configuration passée en prop
    return <NextStudio config={config} />
}
