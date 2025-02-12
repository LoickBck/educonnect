'use client' // Indique que ce composant est destiné à être rendu côté client

import { Search } from 'lucide-react' // Importation de l'icône "Search" pour l'afficher dans le champ de recherche
import { useRouter } from 'next/navigation' // Importation du hook useRouter pour gérer la navigation Next.js
import { useState } from 'react' // Importation du hook useState pour gérer l'état local du composant

// Composant SearchInput qui affiche un champ de recherche
export function SearchInput() {
    // Initialisation du routeur pour pouvoir naviguer programmatiquement
    const router = useRouter()
    // État local pour stocker la valeur saisie dans le champ de recherche
    const [searchQuery, setSearchQuery] = useState('')

    // Fonction de gestion de la soumission du formulaire de recherche
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault() // Empêche le comportement par défaut de soumission du formulaire (rechargement de la page)
        // Si la chaîne de recherche n'est pas vide (après suppression des espaces inutiles)
        if (searchQuery.trim()) {
            // Redirige vers la page de recherche en encodant la requête dans l'URL
            router.push(`/recherche/${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        // Formulaire de recherche avec gestion de la soumission
        <form
            onSubmit={handleSubmit}
            className="relative w-full flex-1 max-w-[300px]"
        >
            {/* Champ de saisie de la recherche */}
            <input
                type="text"
                placeholder="Rechercher vos cours..." // Texte d'indication dans le champ
                value={searchQuery} // Valeur actuelle liée à l'état searchQuery
                onChange={(e) => setSearchQuery(e.target.value)} // Met à jour l'état lorsque l'utilisateur tape dans le champ
                className="w-full rounded-full bg-secondary/80 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {/* Icône de recherche positionnée absolument à l'intérieur du champ */}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </form>
    )
}
