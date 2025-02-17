'use client' // Ce composant est exécuté côté client

// Importations des composants et utilitaires nécessaires
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
// Ces composants de Clerk gèrent l'affichage conditionnel selon que l'utilisateur soit connecté ou non

import { BookMarkedIcon } from 'lucide-react' // Icône représentant des cours ou favoris
import Link from 'next/link' // Composant Next.js pour la navigation client
import { SearchInput } from './SearchInput' // Composant personnalisé pour la barre de recherche
import { Button } from './ui/button' // Composant bouton personnalisé pour l'interface utilisateur
import DarkModeToggle from './DarkModeToggle' // Composant pour basculer entre le thème clair et sombre
import Image from 'next/image' // Composant optimisé de Next.js pour afficher des images

// Composant Header qui représente l'en-tête de l'application
export default function Header() {
    return (
        // Balise header fixée en haut de la page avec un fond semi-transparent et un flou d'arrière-plan
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            {/* Conteneur centralisé */}
            <div className="container mx-auto px-4">
                {/* Zone flex pour aligner les éléments verticalement et répartir l'espace */}
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Section gauche contenant le logo et la barre de recherche */}
                    <div className="flex items-center gap-4">
                        {/* Lien vers la page d'accueil */}
                        <Link
                            href="/"
                            prefetch={false}
                            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
                        >
                            {/* Logo de l'application */}
                            <Image
                                src="/images/logo.png"
                                width={25}
                                height={25}
                                alt="Logo EduConnect"
                                className="h-6 w-6 text-primary"
                            />
                            {/* Nom de l'application avec un dégradé sur le texte */}
                            <span className="nom-logo text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                                EduConnect
                            </span>
                        </Link>

                        {/* Composant de recherche intégré */}
                        <SearchInput />
                    </div>

                    {/* Section droite contenant la navigation et les boutons d'authentification */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <nav>
                            {/* Lien vers la page "Mes cours" */}
                            <Link
                                prefetch={false}
                                href="/mes-cours"
                                className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
                            >
                                {/* Icône de cours */}
                                <BookMarkedIcon className="h-4 w-4" />
                                {/* Texte affiché uniquement sur les écrans moyens et plus */}
                                <span className="hidden md:block">
                                    Mes cours
                                </span>
                            </Link>
                        </nav>

                        {/* Bouton de bascule pour le mode sombre/clair */}
                        <DarkModeToggle />

                        {/* Affichage conditionnel du bouton utilisateur en fonction de l'état de connexion */}
                        <SignedIn>
                            {/* Bouton affiché lorsque l'utilisateur est connecté */}
                            <UserButton />
                        </SignedIn>

                        <SignedOut>
                            {/* Bouton de connexion affiché lorsque l'utilisateur n'est pas connecté */}
                            <SignInButton mode="modal">
                                <Button variant="outline" size="default">
                                    Connexion
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    )
}
