'use client' // Indique que ce composant doit être exécuté côté client

// Importation des composants d'interface utilisateur et des icônes
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    Library,
    ChevronRight,
    PlayCircle,
    X,
    Check,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils' // Fonction utilitaire pour concaténer des classes conditionnellement
import { usePathname } from 'next/navigation' // Hook pour récupérer le chemin actuel
import {
    GetCourseByIdQueryResult,
    GetCompletionsQueryResult,
    Module,
} from '@/sanity.types'
import { useSidebar } from '@/components/providers/sidebar-provider' // Hook pour gérer l'état de la sidebar (ouverte/fermée)
import { useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import DarkModeToggle from '../DarkModeToggle'
import { CourseProgress } from '@/components/CourseProgress'
import { calculateCourseProgress } from '@/lib/courseProgress'

// Définition des propriétés attendues pour le composant Sidebar
interface SidebarProps {
    course: GetCourseByIdQueryResult
    completedLessons?: GetCompletionsQueryResult['completedLessons']
}

// Composant Sidebar qui affiche la navigation et la progression du cours
export function Sidebar({ course, completedLessons = [] }: SidebarProps) {
    const pathname = usePathname() // Récupère le chemin actuel pour déterminer la leçon active
    const { isOpen, toggle, close } = useSidebar() // Récupère l'état et les méthodes de contrôle de la sidebar
    const [isMounted, setIsMounted] = useState(false) // État pour vérifier si le composant est monté (évite le rendu côté serveur)
    const [openModules, setOpenModules] = useState<string[]>([]) // Liste des modules actuellement ouverts dans l'accordéon

    // Effet pour ouvrir automatiquement le module contenant la leçon active
    useEffect(() => {
        if (pathname && course?.modules) {
            // Recherche le module dont l'une des leçons correspond au chemin actuel
            const currentModuleId = course.modules.find((module) =>
                module.lessons?.some(
                    (lesson) =>
                        pathname ===
                        `/dashboard/cours/${course._id}/lecons/${lesson._id}`
                )
            )?._id

            // Si un module correspondant est trouvé et qu'il n'est pas déjà ouvert, l'ajoute à la liste des modules ouverts
            if (currentModuleId && !openModules.includes(currentModuleId)) {
                setOpenModules((prev) => [...prev, currentModuleId])
            }
        }
    }, [pathname, course, openModules])

    // Effet pour indiquer que le composant est monté (pour éviter le rendu initial sur le serveur)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Si le cours n'est pas défini ou que le composant n'est pas encore monté, ne rien afficher
    if (!course || !isMounted) {
        return null
    }

    // Calcul de la progression du cours à partir des modules et des leçons complétées
    const progress = calculateCourseProgress(
        course.modules as unknown as Module[],
        completedLessons
    )

    // Composant interne qui définit le contenu principal de la sidebar
    const SidebarContent = () => (
        <div className="h-full flex flex-col">
            {/* En-tête de la sidebar avec le lien vers la bibliothèque et les contrôles */}
            <div className="p-4 lg:p-6 border-b flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    {/* Lien pour retourner à la bibliothèque de cours */}
                    <Link
                        href="/mes-cours"
                        className="flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <div className="flex items-center gap-x-2">
                            <Library className="h-4 w-4" />
                            <span>Course Library</span>
                        </div>
                    </Link>
                    {/* Boutons de contrôle : bascule du mode sombre et fermeture de la sidebar sur mobile */}
                    <div className="space-x-2">
                        <DarkModeToggle />
                        <Button
                            onClick={close}
                            variant="ghost"
                            className="lg:hidden -mr-2"
                            size="icon"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {/* Affichage du titre du cours et de la progression */}
                <div className="space-y-4">
                    <h1 className="font-semibold text-2xl">{course.title}</h1>
                    <CourseProgress
                        progress={progress}
                        variant="success"
                        label="Progression du cours"
                    />
                </div>
            </div>
            {/* Zone de défilement contenant l'accordéon des modules et leçons */}
            <ScrollArea className="flex-1">
                <div className="p-2 lg:p-4">
                    <Accordion
                        type="multiple"
                        className="w-full space-y-4"
                        value={openModules}
                        onValueChange={setOpenModules}
                    >
                        {/* Itération sur chaque module du cours */}
                        {course.modules?.map((module, moduleIndex) => (
                            <AccordionItem
                                key={module._id}
                                value={module._id}
                                className={cn(
                                    'border-none',
                                    // Alterne le fond des modules pour une meilleure lisibilité
                                    moduleIndex % 2 === 0
                                        ? 'bg-muted/30'
                                        : 'bg-background'
                                )}
                            >
                                {/* Déclencheur de l'accordéon affichant le titre du module et le nombre de leçons */}
                                <AccordionTrigger className="px-2 py-2 hover:no-underline transition-colors">
                                    <div className="flex items-center gap-x-2 lg:gap-x-4 w-full">
                                        <span className="text-sm font-medium text-muted-foreground min-w-[28px]">
                                            {String(moduleIndex + 1).padStart(
                                                2,
                                                '0'
                                            )}
                                        </span>
                                        <div className="flex flex-col gap-y-1 text-left flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {module.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {module.lessons?.length || 0}{' '}
                                                lessons
                                            </p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                {/* Contenu de l'accordéon qui liste les leçons du module */}
                                <AccordionContent className="pt-2">
                                    <div className="flex flex-col space-y-1">
                                        {module.lessons?.map(
                                            (lesson, lessonIndex) => {
                                                // Vérifie si la leçon est active en comparant le chemin actuel
                                                const isActive =
                                                    pathname ===
                                                    `/dashboard/cours/${course._id}/lecons/${lesson._id}`
                                                // Vérifie si la leçon est complétée en parcourant les leçons complétées
                                                const isCompleted =
                                                    completedLessons.some(
                                                        (completion) =>
                                                            completion.lesson
                                                                ?._id ===
                                                            lesson._id
                                                    )

                                                return (
                                                    <Link
                                                        key={lesson._id}
                                                        prefetch={false}
                                                        href={`/dashboard/cours/${course._id}/lecons/${lesson._id}`}
                                                        onClick={close} // Ferme la sidebar lors du clic
                                                        className={cn(
                                                            'flex items-center pl-8 lg:pl-10 pr-2 lg:pr-4 py-2 gap-x-2 lg:gap-x-4 group hover:bg-muted/50 transition-colors relative',
                                                            isActive &&
                                                                'bg-muted',
                                                            isCompleted &&
                                                                'text-muted-foreground'
                                                        )}
                                                    >
                                                        {/* Affiche l'indice de la leçon */}
                                                        <span className="text-xs font-medium text-muted-foreground min-w-[28px]">
                                                            {String(
                                                                lessonIndex + 1
                                                            ).padStart(2, '0')}
                                                        </span>
                                                        {/* Icône indiquant si la leçon est complétée ou non */}
                                                        {isCompleted ? (
                                                            <Check className="h-4 w-4 shrink-0 text-green-500" />
                                                        ) : (
                                                            <PlayCircle
                                                                className={cn(
                                                                    'h-4 w-4 shrink-0',
                                                                    isActive
                                                                        ? 'text-primary'
                                                                        : 'text-muted-foreground group-hover:text-primary/80'
                                                                )}
                                                            />
                                                        )}
                                                        {/* Titre de la leçon avec gestion du texte tronqué */}
                                                        <span
                                                            className={cn(
                                                                'text-sm line-clamp-2 min-w-0',
                                                                isCompleted &&
                                                                    'text-muted-foreground line-through decoration-green-500/50'
                                                            )}
                                                        >
                                                            {lesson.title}
                                                        </span>
                                                        {/* Barre d'indication pour la leçon active */}
                                                        {isActive && (
                                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-primary" />
                                                        )}
                                                    </Link>
                                                )
                                            }
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ScrollArea>
        </div>
    )

    return (
        <>
            {/* Sidebar mobile réduite (affichée uniquement sur mobile) */}
            <aside className="fixed inset-y-0 left-0 z-50 flex flex-col items-center w-[60px] border-r bg-background lg:hidden py-4 gap-y-4">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/" prefetch={false}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10"
                                >
                                    <Library className="h-5 w-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Bibliothèque des cours</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={toggle} // Bascule l'état ouvert/fermé de la sidebar
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10"
                            >
                                <ChevronRight
                                    className={cn(
                                        'h-5 w-5 transition-transform',
                                        isOpen && 'rotate-180'
                                    )}
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Basculer la barre latérale</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </aside>

            {/* Sidebar principale pour desktop et mobile */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 bg-background transition-all duration-300 ease-in-out',
                    'lg:z-50 lg:block lg:w-96 lg:border-r',
                    isOpen
                        ? 'w-[calc(100%-60px)] translate-x-[60px] lg:translate-x-0 lg:w-96'
                        : 'translate-x-[-100%] lg:translate-x-0'
                )}
            >
                <div className="h-full">
                    <SidebarContent />
                </div>
            </aside>

            {/* Superposition (overlay) pour fermer la sidebar en cliquant en dehors sur mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={close}
                />
            )}
        </>
    )
}
