import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Catégorie',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'icon',
            title: 'Icone',
            type: 'string',
            description:
                "Identifiant de l'icône (par exemple, pour l'utilisation avec des bibliothèques d'icônes))",
        }),
        defineField({
            name: 'color',
            title: 'Couleur',
            type: 'string',
            description: 'Code couleur de la catégorie (par exemple, #FF0000)',
        }),
    ],
})
