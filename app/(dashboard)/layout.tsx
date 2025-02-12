import { ThemeProvider } from '@/components/theme-provider' // Importation du provider de thème pour gérer l'apparence (mode clair/sombre) de l'application
import { SanityLive } from '@/sanity/lib/live' // Importation du composant SanityLive pour activer le live preview des contenus Sanity
import { ClerkProvider } from '@clerk/nextjs' // Importation du provider Clerk pour la gestion de l'authentification utilisateur
import { SidebarProvider } from '@/components/providers/sidebar-provider' // Importation du provider pour gérer la sidebar dans l'interface

// Composant layout pour le dashboard
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode // Les enfants (contenu de la page) qui seront injectés dans ce layout
}) {
    return (
        // Fournisseur d'authentification Clerk, qui englobe toute l'application pour gérer l'état de l'utilisateur
        <ClerkProvider>
            {/* Fournisseur de thème qui permet d'appliquer un thème (mode système par défaut) à l'application */}
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {/* Fournisseur de la sidebar pour la gestion de la navigation latérale dans le dashboard */}
                <SidebarProvider>
                    <div className="h-full">{children}</div>{' '}
                    {/* Zone principale où le contenu de la page est affiché */}
                </SidebarProvider>
            </ThemeProvider>
            <SanityLive />{' '}
            {/* Composant pour activer le live preview des contenus gérés par Sanity */}
        </ClerkProvider>
    )
}
