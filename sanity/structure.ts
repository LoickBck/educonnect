import { StructureBuilder } from 'sanity/structure'
// Ce module configure la structure du Sanity Studio en utilisant le builder de structure

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
    // Crée une liste principale pour le tableau de bord d'administration
    S.list()
        .title('Dashboard Admin')
        .items([
            // SECTION : Contenu du cours
            S.listItem()
                .title('Contenu du cours')
                .child(
                    // Liste des cours (documents de type "course")
                    S.documentTypeList('course')
                        .title('Cours')
                        .child((courseId) =>
                            // Pour un cours donné, on affiche un sous-menu avec différentes options
                            S.list()
                                .title('Options du cours')
                                .items([
                                    // Option : Modifier le contenu du cours
                                    S.listItem()
                                        .title('Modifier le contenu du cours')
                                        .child(
                                            // Permet d'éditer le document du cours
                                            S.document()
                                                .schemaType('course')
                                                .documentId(courseId)
                                        ),
                                    // Option : Voir les inscriptions au cours
                                    S.listItem()
                                        .title('Voir les étudiants')
                                        .child(
                                            // Affiche la liste des inscriptions filtrées pour le cours donné
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

            // Séparateur visuel
            S.divider(),

            // SECTION : Gestion des utilisateurs
            S.listItem()
                .title('Gestion des utilisateurs')
                .child(
                    // Permet de choisir le type d'utilisateur à gérer
                    S.list()
                        .title("Sélectionner un type d'utilisateur")
                        .items([
                            // Sous-section pour les formateurs
                            S.listItem()
                                .title('Formateurs')
                                .schemaType('instructor')
                                .child(
                                    // Liste des documents "instructor" avec un sous-menu d'options pour chaque formateur
                                    S.documentTypeList('instructor')
                                        .title('Formateurs')
                                        .child((instructorId) =>
                                            S.list()
                                                .title(
                                                    'Options pour le formateur'
                                                )
                                                .items([
                                                    // Option : Modifier les détails du formateur
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
                                                    // Option : Voir les cours du formateur
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
                            // Sous-section pour les étudiants
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
                                                    // Option : Modifier les détails de l'étudiant
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
                                                    // Option : Voir les inscriptions de l'étudiant
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
                                                    // Option : Voir les leçons terminées par l'étudiant
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

            // Séparateur visuel
            S.divider(),

            // SECTION : Gestion du système
            S.listItem()
                .title('Gestion du système')
                .child(
                    // Liste de documents pour la gestion du système, ici uniquement les catégories
                    S.list()
                        .title('Gestion du système')
                        .items([
                            S.documentTypeListItem('category').title(
                                'Catégories'
                            ),
                        ])
                ),
        ])
