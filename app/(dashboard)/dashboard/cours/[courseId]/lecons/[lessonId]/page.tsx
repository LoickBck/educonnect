import { redirect } from 'next/navigation' // Importation de la fonction de redirection de Next.js
import { currentUser } from '@clerk/nextjs/server' // Importation de la fonction pour récupérer l'utilisateur courant via Clerk
import { getLessonById } from '@/sanity/lib/lessons/getLessonById' // Importation de la fonction pour obtenir les données d'une leçon par son identifiant depuis Sanity
import { PortableText } from '@portabletext/react' // Importation du composant pour rendre le contenu portable (Portable Text)
import { LoomEmbed } from '@/components/LoomEmbed' // Importation du composant pour intégrer une vidéo Loom
import { VideoPlayer } from '@/components/VideoPlayer' // Importation du composant pour lire une vidéo via une URL
import { LessonCompleteButton } from '@/components/LessonCompleteButton' // Importation du composant pour marquer la leçon comme complétée

// Définition de l'interface des propriétés attendues par la page de leçon
interface LessonPageProps {
    params: Promise<{
        // Les paramètres de la route sont fournis sous forme de promesse
        courseId: string // Identifiant du cours
        lessonId: string // Identifiant de la leçon
    }>
}

// Composant asynchrone représentant la page d'une leçon
export default async function LessonPage({ params }: LessonPageProps) {
    const user = await currentUser() // Récupération de l'utilisateur courant
    const { courseId, lessonId } = await params // Extraction des identifiants du cours et de la leçon depuis les paramètres

    const lesson = await getLessonById(lessonId) // Récupération des données de la leçon

    // Si la leçon n'existe pas, rediriger vers la page du cours dans le dashboard
    if (!lesson) {
        return redirect(`/dashboard/cours/${courseId}`)
    }

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
                    {/* Affichage du titre de la leçon */}
                    <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

                    {/* Affichage de la description de la leçon si elle est disponible */}
                    {lesson.description && (
                        <p className="text-muted-foreground mb-8">
                            {lesson.description}
                        </p>
                    )}

                    <div className="space-y-8">
                        {/* Section vidéo : affiche le lecteur vidéo si une URL de vidéo est fournie */}
                        {lesson.videoUrl && (
                            <VideoPlayer url={lesson.videoUrl} />
                        )}

                        {/* Section Loom : affiche l'intégration Loom si une URL Loom est fournie */}
                        {lesson.loomUrl && (
                            <LoomEmbed shareUrl={lesson.loomUrl} />
                        )}

                        {/* Section de contenu de la leçon : affiche les notes de cours en utilisant PortableText */}
                        {lesson.content && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Notes de cours
                                </h2>
                                <div className="prose prose-blue dark:prose-invert max-w-none">
                                    <PortableText value={lesson.content} />
                                </div>
                            </div>
                        )}

                        {/* Bouton pour marquer la leçon comme complétée, aligné à droite */}
                        <div className="flex justify-end">
                            <LessonCompleteButton
                                lessonId={lesson._id}
                                clerkId={user!.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
