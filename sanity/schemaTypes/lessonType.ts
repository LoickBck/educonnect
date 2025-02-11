import { defineField, defineType } from 'sanity'

export const lessonType = defineType({
    name: 'lesson',
    title: 'Leçon',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
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
            name: 'videoUrl',
            title: 'URL de la vidéo',
            type: 'url',
            description: 'The URL for the video player (e.g. YouTube, Vimeo)',
        }),
        defineField({
            name: 'loomUrl',
            title: 'URL de Loom',
            type: 'url',
            description:
                "L'URL complète du partage de Loom (par exemple, https://www.loom.com/share/...)",
            validation: (rule) =>
                rule.custom((value) => {
                    if (!value) return true // Allow empty value
                    try {
                        const url = new URL(value)
                        if (!url.hostname.endsWith('loom.com')) {
                            return "L'URL doit provenir de loom.com"
                        }
                        if (!url.pathname.startsWith('/share/')) {
                            return "Il doit s'agir d'une URL de partage de Loom"
                        }
                        const videoId = url.pathname.split('/share/')[1]
                        if (!/^[a-f0-9-]{32,36}/.test(videoId)) {
                            return "ID de la vidéo Loom invalide dans l'URL"
                        }
                        return true
                    } catch {
                        return 'Veuillez saisir une URL valide'
                    }
                }),
        }),
        defineField({
            name: 'content',
            title: 'Contenu',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
