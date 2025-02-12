import { defineType } from 'sanity' // Importation de la fonction defineType pour définir un type de schéma

// Définition d'un type de contenu appelé "blockContent"
// Ce type est utilisé pour structurer le contenu riche dans Sanity, comme des paragraphes, titres, etc.
export const blockContent = defineType({
    name: 'blockContent', // Nom interne du type, utilisé pour les références dans le schéma
    title: 'Contenu', // Titre affiché dans l'interface de Sanity Studio
    type: 'array', // Le type est un tableau, permettant de contenir plusieurs blocs de contenu
    of: [{ type: 'block' }], // Chaque élément du tableau est de type "block", qui représente un bloc de texte structuré
})
