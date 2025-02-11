import Image from 'next/image'
import { defineField, defineType } from 'sanity'

export const enrollmentType = defineType({
    name: 'enrollment',
    title: 'Inscription',
    type: 'document',
    fields: [
        defineField({
            name: 'student',
            title: 'Étudiant',
            type: 'reference',
            to: [{ type: 'student' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'course',
            title: 'Cours',
            type: 'reference',
            to: [{ type: 'course' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'amount',
            title: 'Montant',
            type: 'number',
            validation: (rule) => rule.required().min(0),
            description: "Le montant payé pour l'inscription au cours en cents",
        }),
        defineField({
            name: 'paymentId',
            title: 'ID de paiement',
            type: 'string',
            validation: (rule) => rule.required(),
            description: "L'identifiant de la session de paiement Stripe.",
        }),
        defineField({
            name: 'enrolledAt',
            title: 'Inscrit le',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            courseTitle: 'course.title',
            studentFirstName: 'student.firstName',
            studentLastName: 'student.lastName',
            studentImage: 'student.imageUrl',
        },
        prepare({
            courseTitle,
            studentFirstName,
            studentLastName,
            studentImage,
        }) {
            return {
                title: `${studentFirstName} ${studentLastName}`,
                subtitle: courseTitle,
                media: (
                    <Image
                        src={studentImage}
                        alt={`${studentFirstName} ${studentLastName}`}
                        width={100}
                        height={100}
                    />
                ),
            }
        },
    },
})
