// Importation de la fonction `clsx` et du type `ClassValue` depuis le package "clsx".
// `clsx` permet de concaténer conditionnellement des classes CSS en fonction de valeurs passées en argument.
import { clsx, type ClassValue } from 'clsx'

// Importation de la fonction `twMerge` depuis "tailwind-merge".
// `twMerge` fusionne les classes Tailwind CSS et résout les conflits éventuels entre elles.
import { twMerge } from 'tailwind-merge'

// La fonction `cn` est une fonction utilitaire qui combine `clsx` et `twMerge`.
// Elle permet de prendre une liste de classes (possiblement conditionnelles) et de retourner une chaîne
// de classes optimisée en résolvant les conflits de classes propres à Tailwind CSS.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
