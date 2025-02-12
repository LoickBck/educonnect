'use client' // Indique que ce module est destiné à être exécuté côté client

import * as React from 'react' // Importation de React pour utiliser JSX et créer des composants
import { ThemeProvider as NextThemesProvider } from 'next-themes' // Importation du ThemeProvider de next-themes, renommé ici en NextThemesProvider pour plus de clarté

// Composant ThemeProvider personnalisé qui encapsule le NextThemesProvider de next-themes
// Ce composant permet de fournir le contexte du thème (clair, sombre, etc.) à toute l'application
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
