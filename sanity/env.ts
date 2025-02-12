// Définition de la version de l'API Sanity à utiliser.
// Si la variable d'environnement NEXT_PUBLIC_SANITY_API_VERSION n'est pas définie,
// la valeur par défaut '2025-02-10' sera utilisée.
export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-10'

// Définition du dataset à utiliser pour Sanity.
// On tente d'abord de récupérer la valeur de NEXT_PUBLIC_SANITY_DATASET,
// sinon on utilise SANITY_STUDIO_DATASET.
// La fonction assertValue vérifie que la valeur existe, sinon elle lance une erreur avec le message fourni.
export const dataset = assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
    "Variable d'environnement manquante: NEXT_PUBLIC_SANITY_DATASET or SANITY_STUDIO_DATASET"
)

// Définition de l'ID du projet Sanity.
// On essaie d'obtenir la valeur de NEXT_PUBLIC_SANITY_PROJECT_ID,
// sinon on utilise SANITY_STUDIO_PROJECT_ID.
// La fonction assertValue vérifie que l'ID du projet est bien défini.
export const projectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
        process.env.SANITY_STUDIO_PROJECT_ID,
    "Variable d'environnement manquante: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID"
)

// Fonction utilitaire qui vérifie qu'une valeur n'est pas undefined.
// Si la valeur est undefined, elle lance une erreur avec le message d'erreur fourni.
// Sinon, elle retourne la valeur passée.
function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }
    return v
}
