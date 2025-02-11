import Image from 'next/image'
import { defineField, defineType } from 'sanity'

export const studentType = defineType({
    name: 'student',
    title: 'Etudiant',
    type: 'document',
    fields: [
        defineField({
            name: 'firstName',
            title: 'Prénom',
            type: 'string',
        }),
        defineField({
            name: 'lastName',
            title: 'Nom de famille',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'clerkId',
            title: 'ID utilisateur Clerk',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'imageUrl',
            title: 'URL de la photo de profil',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            firstName: 'firstName',
            lastName: 'lastName',
            imageUrl: 'imageUrl',
        },
        prepare({ firstName, lastName, imageUrl }) {
            return {
                title: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`,
                media: (
                    <Image
                        src={imageUrl}
                        alt={`${firstName} ${lastName}`}
                        width={100}
                        height={100}
                    />
                ),
            }
        },
    },
})
