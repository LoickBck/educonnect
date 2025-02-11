import { defineType } from 'sanity'

export const blockContent = defineType({
    name: 'blockContent',
    title: 'Contenu',
    type: 'array',
    of: [{ type: 'block' }],
})
