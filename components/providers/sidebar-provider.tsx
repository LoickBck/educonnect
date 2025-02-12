'use client' // Indique que ce module doit être exécuté côté client

import { createContext, useContext, useState } from 'react'

// Définition du type du contexte pour la sidebar
// Ce type définit l'état d'ouverture de la sidebar ainsi que les fonctions pour la basculer et la fermer
type SidebarContextType = {
    isOpen: boolean // Indique si la sidebar est ouverte (true) ou fermée (false)
    toggle: () => void // Fonction pour inverser l'état d'ouverture de la sidebar
    close: () => void // Fonction pour fermer la sidebar (mettre isOpen à false)
}

// Création du contexte pour la sidebar avec une valeur initiale undefined
const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

// Composant fournisseur du contexte de la sidebar
export function SidebarProvider({ children }: { children: React.ReactNode }) {
    // État local pour gérer l'ouverture de la sidebar
    const [isOpen, setIsOpen] = useState(false)

    // Fonction pour basculer l'état d'ouverture (ouverture/fermeture)
    const toggle = () => setIsOpen(!isOpen)
    // Fonction pour fermer la sidebar
    const close = () => setIsOpen(false)

    return (
        // Fournit le contexte à tous les composants enfants
        <SidebarContext.Provider value={{ isOpen, toggle, close }}>
            {children}
        </SidebarContext.Provider>
    )
}

// Hook personnalisé pour accéder au contexte de la sidebar
export function useSidebar() {
    const context = useContext(SidebarContext)
    // Si le hook est utilisé en dehors du SidebarProvider, on lance une erreur
    if (!context) {
        throw new Error('useSidebar doit être utilisé dans un SidebarProvider')
    }
    // Retourne le contexte de la sidebar
    return context
}
