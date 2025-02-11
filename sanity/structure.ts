import { StructureBuilder } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Dashboard Admin')
        .items([
            // Course Content
            S.listItem()
                .title('Contenu du cours')
                .child(
                    S.documentTypeList('course')
                        .title('Cours')
                        .child((courseId) =>
                            S.list()
                                .title('Options du cours')
                                .items([
                                    // Option to edit course content
                                    S.listItem()
                                        .title('Modifier le contenu du cours')
                                        .child(
                                            S.document()
                                                .schemaType('course')
                                                .documentId(courseId)
                                        ),
                                    // Option to view course enrollments
                                    S.listItem()
                                        .title('Voir les étudiants')
                                        .child(
                                            S.documentList()
                                                .title('Inscriptions aux cours')
                                                .filter(
                                                    '_type == "enrollment" && course._ref == $courseId'
                                                )
                                                .params({ courseId })
                                        ),
                                ])
                        )
                ),

            S.divider(),

            // Users
            S.listItem()
                .title('Gestion des utilisateurs')
                .child(
                    S.list()
                        .title("Sélectionner un type d'utilisateur")
                        .items([
                            // Instructors with options
                            S.listItem()
                                .title('Formateurs')
                                .schemaType('instructor')
                                .child(
                                    S.documentTypeList('instructor')
                                        .title('Formateurs')
                                        .child((instructorId) =>
                                            S.list()
                                                .title(
                                                    'Options pour le formateur'
                                                )
                                                .items([
                                                    // Option to edit instructor details
                                                    S.listItem()
                                                        .title(
                                                            'Modifier les détails du formateur'
                                                        )
                                                        .child(
                                                            S.document()
                                                                .schemaType(
                                                                    'instructor'
                                                                )
                                                                .documentId(
                                                                    instructorId
                                                                )
                                                        ),
                                                    // Option to view instructor's courses
                                                    S.listItem()
                                                        .title('Voir les cours')
                                                        .child(
                                                            S.documentList()
                                                                .title(
                                                                    'Cours du formateur'
                                                                )
                                                                .filter(
                                                                    '_type == "course" && instructor._ref == $instructorId'
                                                                )
                                                                .params({
                                                                    instructorId,
                                                                })
                                                        ),
                                                ])
                                        )
                                ),
                            // Students with options
                            S.listItem()
                                .title('Les étudiants')
                                .schemaType('student')
                                .child(
                                    S.documentTypeList('student')
                                        .title('Les étudiants')
                                        .child((studentId) =>
                                            S.list()
                                                .title('Options des étudiants')
                                                .items([
                                                    // Option to edit student details
                                                    S.listItem()
                                                        .title(
                                                            "Modifier les détails de l'étudiant"
                                                        )
                                                        .child(
                                                            S.document()
                                                                .schemaType(
                                                                    'student'
                                                                )
                                                                .documentId(
                                                                    studentId
                                                                )
                                                        ),
                                                    // Option to view enrollments
                                                    S.listItem()
                                                        .title(
                                                            'Voir les inscriptions'
                                                        )
                                                        .child(
                                                            S.documentList()
                                                                .title(
                                                                    'Inscriptions des étudiants'
                                                                )
                                                                .filter(
                                                                    '_type == "enrollment" && student._ref == $studentId'
                                                                )
                                                                .params({
                                                                    studentId,
                                                                })
                                                        ),
                                                    // Option to view completed lessons
                                                    S.listItem()
                                                        .title(
                                                            'Voir les leçons terminées'
                                                        )
                                                        .child(
                                                            S.documentList()
                                                                .title(
                                                                    'Leçons terminées'
                                                                )
                                                                .schemaType(
                                                                    'lessonCompletion'
                                                                )
                                                                .filter(
                                                                    '_type == "lessonCompletion" && student._ref == $studentId'
                                                                )
                                                                .params({
                                                                    studentId,
                                                                })
                                                                .defaultOrdering(
                                                                    [
                                                                        {
                                                                            field: 'completedAt',
                                                                            direction:
                                                                                'desc',
                                                                        },
                                                                    ]
                                                                )
                                                        ),
                                                ])
                                        )
                                ),
                        ])
                ),

            S.divider(),

            // System Management
            S.listItem()
                .title('Gestion du système')
                .child(
                    S.list()
                        .title('Gestion du système')
                        .items([
                            S.documentTypeListItem('category').title(
                                'Catégories'
                            ),
                        ])
                ),
        ])
