import createImageUrlBuilder from '@sanity/image-url' // Importation de la fonction createImageUrlBuilder pour générer des URLs d'images depuis Sanity
import { SanityImageSource } from '@sanity/image-url/lib/types/types' // Importation du type SanityImageSource pour typer la source d'image

import { dataset, projectId } from '../env' // Importation des variables d'environnement définissant le dataset et l'ID du projet Sanity

// Création d'un "builder" d'URL d'image en passant l'ID du projet et le dataset à utiliser
// Documentation : https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

// Fonction utilitaire qui prend une source d'image Sanity et retourne un builder configuré pour générer l'URL de l'image
export const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
}
