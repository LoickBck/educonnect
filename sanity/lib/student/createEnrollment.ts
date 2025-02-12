import { client } from '../adminClient' // Importation du client admin de Sanity pour effectuer des opérations d'écriture

// Définition de l'interface des paramètres requis pour créer une inscription (enrollment)
interface CreateEnrollmentParams {
    studentId: string // Identifiant de l'étudiant (référence dans Sanity)
    courseId: string // Identifiant du cours (référence dans Sanity)
    paymentId: string // Identifiant du paiement (provenant de Stripe ou autre système de paiement)
    amount: number // Montant payé pour le cours
}

// Fonction asynchrone qui crée un document d'inscription dans Sanity
export async function createEnrollment({
    studentId,
    courseId,
    paymentId,
    amount,
}: CreateEnrollmentParams) {
    return client.create({
        _type: 'enrollment', // Type du document dans Sanity
        student: {
            _type: 'reference', // Indique qu'il s'agit d'une référence vers un document
            _ref: studentId, // Référence à l'identifiant de l'étudiant
        },
        course: {
            _type: 'reference', // Référence vers le document du cours
            _ref: courseId, // Référence à l'identifiant du cours
        },
        paymentId, // Stocke l'identifiant du paiement
        amount, // Stocke le montant payé
        enrolledAt: new Date().toISOString(), // Enregistre la date et l'heure de l'inscription au format ISO
    })
}
