import { defineField, defineType } from 'sanity'

export const moduleType = defineType({
    name: 'module',
    title: 'Module',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre du module',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'lessons',
            title: 'Leçons',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'lesson' } }],
        }),
    ],
})
