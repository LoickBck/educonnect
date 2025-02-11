import { defineField, defineType } from 'sanity'

export const courseType = defineType({
    name: 'course',
    title: 'Cours',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        {
            name: 'price',
            title: 'Prix (EUR)',
            type: 'number',
            description: 'Prix en EUR',
            validation: (Rule) => Rule.min(0),
        },
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
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
            name: 'image',
            title: 'Image du cours',
            type: 'image',
        }),
        defineField({
            name: 'category',
            title: 'Catégorie',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'module' } }],
        }),
        defineField({
            name: 'instructor',
            title: 'Formateur',
            type: 'reference',
            to: { type: 'instructor' },
        }),
    ],
})
