import { defineField, defineType } from 'sanity'

export const instructorType = defineType({
    name: 'instructor',
    title: 'Formateur',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
        }),
    ],
})
