import type { Metadata } from 'next' // Importation du type Metadata pour définir les métadonnées de la page
import { Geist, Geist_Mono } from 'next/font/google' // Importation des polices Google Geist et Geist_Mono pour l'application
import './globals.css' // Importation des styles globaux de l'application
import { ThemeProvider } from '@/components/theme-provider' // Importation du fournisseur de thème pour gérer les thèmes (clair/sombre)
import { draftMode } from 'next/headers' // Importation de la fonction draftMode pour vérifier le mode brouillon via les headers
import { VisualEditing } from 'next-sanity' // Importation du composant VisualEditing pour l'édition visuelle avec Sanity
import { DisableDraftMode } from '@/components/DisableDraftMode' // Importation du composant pour désactiver le mode brouillon

// Définition de la police Geist Sans avec une variable CSS personnalisée et le subset latin
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

// Définition de la police Geist Mono avec une variable CSS personnalisée et le subset latin
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

// Définition des métadonnées de l'application, utilisées notamment pour le SEO
export const metadata: Metadata = {
    title: 'EduConnect',
    description:
        'EduConnect est une plateforme innovante proposant des cours gratuits et payants, adaptés à vos besoins. Apprenez à votre rythme grâce à des contenus de qualité élaborés par des experts.',
}

// Composant racine (layout) de l'application
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode // Contenu de l'application qui sera rendu dans ce layout
}>) {
    return (
        // Structure de base du document HTML avec langue définie en français
        <html lang="fr" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* Vérification si le mode brouillon est activé */}
                {(await draftMode()).isEnabled && (
                    <>
                        {/* Composant pour désactiver le mode brouillon */}
                        <DisableDraftMode />
                        {/* Composant pour l'édition visuelle en mode brouillon avec Sanity */}
                        <VisualEditing />
                    </>
                )}

                {/* Fournisseur de thème qui englobe le contenu de l'application */}
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children} {/* Rendu du contenu enfant de l'application */}
                </ThemeProvider>
            </body>
        </html>
    )
}
