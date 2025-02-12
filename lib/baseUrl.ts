// Définition de la constante baseUrl qui est utilisée pour configurer l'URL de base de l'application
// Si l'environnement est en production, on utilise l'URL définie par VERCEL_PROJECT_PRODUCTION_URL avec le préfixe "https://"
// Sinon, on utilise l'URL définie dans NEXT_PUBLIC_BASE_URL pour l'environnement de développement
const baseUrl =
    process.env.NODE_ENV === 'production'
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`

// Exportation par défaut de la constante baseUrl pour qu'elle puisse être utilisée dans d'autres parties de l'application
export default baseUrl
