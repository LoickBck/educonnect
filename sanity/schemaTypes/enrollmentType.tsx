import Image from 'next/image' // Importation du composant Image de Next.js pour afficher des images optimisées
import { defineField, defineType } from 'sanity' // Importation des fonctions pour définir des types de schéma dans Sanity

export const enrollmentType = defineType({
    name: 'enrollment', // Nom interne du type, utilisé pour référencer ce document dans Sanity
    title: 'Inscription', // Titre affiché dans Sanity Studio
    type: 'document', // Ce type est un document autonome
    fields: [
        // Champ "student" : référence au document étudiant
        defineField({
            name: 'student',
            title: 'Étudiant',
            type: 'reference',
            to: [{ type: 'student' }], // Le document référencé doit être de type "student"
            validation: (rule) => rule.required(), // Ce champ est obligatoire
        }),
        // Champ "course" : référence au document du cours
        defineField({
            name: 'course',
            title: 'Cours',
            type: 'reference',
            to: [{ type: 'course' }], // Le document référencé doit être de type "course"
            validation: (rule) => rule.required(), // Ce champ est obligatoire
        }),
        // Champ "amount" : montant payé pour l'inscription en euro
        defineField({
            name: 'amount',
            title: 'Montant',
            type: 'number',
            validation: (rule) => rule.required().min(0), // Le montant est requis et ne peut être négatif
            description: "Le montant payé pour l'inscription au cours en euro",
        }),
        // Champ "paymentId" : identifiant de la session de paiement (par exemple, Stripe)
        defineField({
            name: 'paymentId',
            title: 'ID de paiement',
            type: 'string',
            validation: (rule) => rule.required(), // Ce champ est obligatoire
            description: "L'identifiant de la session de paiement Stripe.",
        }),
        // Champ "enrolledAt" : date et heure d'inscription, initialisée à la date actuelle
        defineField({
            name: 'enrolledAt',
            title: 'Inscrit le',
            type: 'datetime',
            initialValue: () => new Date().toISOString(), // Valeur initiale : date et heure actuelles au format ISO
        }),
    ],
    // Configuration de l'aperçu du document dans Sanity Studio
    preview: {
        select: {
            courseTitle: 'course.title', // Sélectionne le titre du cours depuis le document référencé "course"
            studentFirstName: 'student.firstName', // Sélectionne le prénom de l'étudiant depuis le document référencé "student"
            studentLastName: 'student.lastName', // Sélectionne le nom de l'étudiant depuis le document référencé "student"
            studentImage: 'student.imageUrl', // Sélectionne l'URL de l'image de l'étudiant
        },
        prepare({
            courseTitle,
            studentFirstName,
            studentLastName,
            studentImage,
        }) {
            return {
                // Le titre affiché combine le prénom et le nom de l'étudiant
                title: `${studentFirstName} ${studentLastName}`,
                // Le sous-titre affiche le titre du cours
                subtitle: courseTitle,
                // L'image affichée est celle de l'étudiant, redimensionnée à 100x100 pixels
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
