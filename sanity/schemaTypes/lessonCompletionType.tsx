import Image from 'next/image'
import { defineField, defineType } from 'sanity'
import { urlFor } from '../lib/image'

export const lessonCompletionType = defineType({
    name: 'lessonCompletion',
    title: 'Achèvement de la leçon',
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
            name: 'lesson',
            title: 'Leçon',
            type: 'reference',
            to: [{ type: 'lesson' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'module',
            title: 'Module',
            type: 'reference',
            to: [{ type: 'module' }],
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
            name: 'completedAt',
            title: 'Achevé le',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            courseTitle: 'course.title',
            lessonTitle: 'lesson.title',
            completedAt: 'completedAt',
            courseImage: 'course.image',
        },
        prepare({ courseTitle, lessonTitle, completedAt, courseImage }) {
            return {
                title: `${courseTitle || 'Course'}: "${lessonTitle || 'Lesson'}"`,
                subtitle: completedAt
                    ? new Date(completedAt).toLocaleDateString()
                    : '',
                media: (
                    <Image
                        src={urlFor(courseImage).url()}
                        alt={courseTitle}
                        width={100}
                        height={100}
                    />
                ),
            }
        },
    },
})
