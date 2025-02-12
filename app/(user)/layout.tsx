import type { Metadata } from 'next' // Importation du type Metadata depuis Next.js pour typer les métadonnées
import { ThemeProvider } from '@/components/theme-provider' // Importation du provider pour la gestion des thèmes de l'application
import { ClerkProvider } from '@clerk/nextjs' // Importation du provider d'authentification Clerk
import { SanityLive } from '@/sanity/lib/live' // Importation du composant pour le live preview de Sanity
import Header from '@/components/Header' // Importation du composant Header

// Définition des métadonnées de la page (SEO, réseaux sociaux, etc.)
export const metadata: Metadata = {
    title: 'EduConnect - Votre plateforme de formation en ligne', // Titre de la page
    description:
        'EduConnect est une plateforme innovante proposant des cours gratuits et payants, adaptés à vos besoins. Apprenez à votre rythme grâce à des contenus de qualité élaborés par des experts.', // Description de la page
    openGraph: {
        // Configuration des métadonnées Open Graph pour le partage sur les réseaux sociaux
        title: 'EduConnect - Votre plateforme de formation en ligne', // Titre pour Open Graph
        description:
            'Découvrez EduConnect, une solution complète offrant un large choix de cours gratuits et payants pour tous niveaux. Apprenez, partagez et progressez dans votre domaine.', // Description pour Open Graph
        url: 'https://educonnect.vercel.app', // URL du site
        siteName: 'EduConnect', // Nom du site
        images: [
            // Images à utiliser lors du partage
            {
                url: 'https://educonnect.vercel.app/images/logo.png', // URL de l'image
                width: 100, // Largeur de l'image
                height: 100, // Hauteur de l'image
                alt: 'EduConnect - Logo', // Texte alternatif de l'image
            },
        ],
        locale: 'fr_FR', // Locale de la page
        type: 'website', // Type de contenu (site web)
    },
    twitter: {
        // Configuration des métadonnées pour Twitter
        card: 'summary_large_image', // Type de carte Twitter à utiliser
        title: 'EduConnect - Votre plateforme de formation en ligne', // Titre pour Twitter
        description:
            'EduConnect est une plateforme innovante proposant des cours gratuits et payants. Apprenez à votre rythme avec des contenus de qualité élaborés par des experts.', // Description pour Twitter
        site: '@educonnect', // Compte Twitter associé au site
        images: ['https://educonnect.vercel.app/images/logo.png'], // Images à utiliser pour Twitter
    },
    icons: {
        // Définition des icônes du site
        icon: '/favicon.ico', // Chemin vers l'icône
    },
}

// Composant de layout pour l'utilisateur, qui englobe la structure globale de la page
export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // Fournisseur d'authentification Clerk pour gérer l'état de connexion de l'utilisateur
        <ClerkProvider>
            {/* Fournisseur de thème pour gérer le thème (clair/sombre, etc.) de l'application */}
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {/* Conteneur principal avec une hauteur minimale égale à celle de l'écran et une disposition en colonne */}
                <div className="min-h-screen flex flex-col">
                    <Header />{' '}
                    {/* Composant Header affiché en haut de la page */}
                    <main className="flex-1">{children}</main>{' '}
                    {/* Zone principale où le contenu enfant est rendu */}
                </div>
            </ThemeProvider>
            <SanityLive />{' '}
            {/* Composant pour le live preview des contenus gérés par Sanity */}
        </ClerkProvider>
    )
}
