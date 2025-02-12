'use client' // Ce composant est exécuté côté client

import Image from 'next/image' // Composant Next.js pour optimiser le chargement des images
import Link from 'next/link' // Composant pour la navigation client
import { BookOpen } from 'lucide-react' // Importation de l'icône BookOpen depuis lucide-react
import { urlFor } from '@/sanity/lib/image' // Fonction pour générer l'URL d'une image depuis Sanity
import { Loader } from '@/components/ui/loader' // Composant Loader pour afficher un indicateur de chargement
import { CourseProgress } from '@/components/CourseProgress' // Composant pour afficher la progression du cours
import {
    GetCoursesQueryResult,
    GetEnrolledCoursesQueryResult,
} from '@/sanity.types' // Importation des types relatifs aux cours depuis Sanity

// Définition des propriétés attendues par le composant CourseCard
interface CourseCardProps {
    course:
        | GetCoursesQueryResult[number]
        | NonNullable<
              NonNullable<GetEnrolledCoursesQueryResult>['enrolledCourses'][number]['course']
          >
    progress?: number // Progression du cours (facultative)
    href: string // Lien vers la page du cours ou de la leçon
}

// Composant CourseCard qui affiche une carte représentant un cours
export function CourseCard({ course, progress, href }: CourseCardProps) {
    return (
        // Le composant Link rend la carte cliquable et redirige vers l'URL spécifiée
        <Link
            href={href}
            prefetch={false}
            className="group hover:no-underline flex"
        >
            {/* Carte du cours avec un style d'ombre et d'animation */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border flex flex-col flex-1">
                {/* Section supérieure de la carte : image du cours */}
                <div className="relative h-52 w-full overflow-hidden">
                    {course.image ? (
                        // Affiche l'image du cours si elle est disponible
                        <Image
                            src={urlFor(course.image).url() || ''}
                            alt={course.title || 'Image du cours'}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    ) : (
                        // Sinon, affiche un loader dans un conteneur de fond atténué
                        <div className="h-full w-full flex items-center justify-center bg-muted">
                            <Loader size="lg" />
                        </div>
                    )}
                    {/* Superposition d'un dégradé pour améliorer la lisibilité du texte sur l'image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    {/* Affichage de la catégorie et du prix dans le coin inférieur de l'image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        {/* Affiche la catégorie du cours, ou "Non catégorisé" par défaut */}
                        <span className="text-sm font-medium px-3 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm">
                            {course.category?.name || 'Non catégorisé'}
                        </span>
                        {/* Affiche le prix du cours si la propriété "price" existe et est un nombre */}
                        {'price' in course &&
                            typeof course.price === 'number' && (
                                <span className="text-white font-bold px-3 py-1 bg-black/50 dark:bg-white/20 rounded-full backdrop-blur-sm">
                                    {course.price === 0
                                        ? 'Gratuit'
                                        : `€${course.price.toLocaleString(
                                              'fr-FR',
                                              {
                                                  minimumFractionDigits: 2,
                                              }
                                          )}`}
                                </span>
                            )}
                    </div>
                </div>
                {/* Section inférieure de la carte : titre, description, formateur et progression */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Titre du cours */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {course.title}
                    </h3>
                    {/* Description du cours, limitée à deux lignes */}
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {course.description}
                    </p>
                    <div className="space-y-4 mt-auto">
                        {/* Informations sur l'instructeur si disponibles */}
                        {course.instructor && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {course.instructor.photo ? (
                                        // Affiche la photo de l'instructeur si elle existe
                                        <div className="relative h-8 w-8 mr-2">
                                            <Image
                                                src={
                                                    urlFor(
                                                        course.instructor.photo
                                                    ).url() || ''
                                                }
                                                alt={
                                                    course.instructor.name ||
                                                    'Formateur'
                                                }
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        // Sinon, affiche un loader dans un conteneur circulaire
                                        <div className="h-8 w-8 mr-2 rounded-full bg-muted flex items-center justify-center">
                                            <Loader size="sm" />
                                        </div>
                                    )}
                                    {/* Affiche le nom de l'instructeur */}
                                    <span className="text-sm text-muted-foreground">
                                        De {course.instructor.name}
                                    </span>
                                </div>
                                {/* Icône BookOpen pour symboliser l'accès au cours */}
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </div>
                        )}
                        {/* Affiche la progression du cours si la valeur progress est définie */}
                        {typeof progress === 'number' && (
                            <CourseProgress
                                progress={progress}
                                variant="default"
                                size="sm"
                                label="Progression du cours"
                            />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
