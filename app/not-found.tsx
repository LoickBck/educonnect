'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Custom404 = () => {
    const router = useRouter()

    return (
        <section className="">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div>
                    <p className="text-5xl font-bold text-red-700">
                        Erreur 404
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold  md:text-3xl">
                        Page introuvable
                    </h1>
                    <p className="mt-4 text-gray-400">
                        Désolé, la page que vous cherchez n&apos;existe pas ou a
                        été supprimée.
                    </p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <button
                            onClick={() => router.back()}
                            className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-purple-500 p-4 px-6 py-3 font-medium text-purple-600 shadow-md transition duration-300 ease-out hover:border-4 hover:border-double rounded-lg"
                        >
                            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-purple-500 text-white duration-300 group-hover:translate-x-0">
                                <svg
                                    className="h-6 w-6 rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </span>
                            <span className="ease absolute flex h-full w-full transform items-center justify-center text-purple-500 transition-all duration-300 group-hover:translate-x-full">
                                Retour
                            </span>
                            <span className="invisible relative">Retour</span>
                        </button>

                        <Link href="/">
                            <button className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-purple-500 p-4 px-6 py-3 font-medium text-purple-600 shadow-md transition duration-300 ease-out hover:border-4 hover:border-double rounded-lg">
                                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-purple-500 text-white duration-300 group-hover:translate-x-0">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                                <span className="ease absolute flex h-full w-full transform items-center justify-center text-purple-500 transition-all duration-300 group-hover:translate-x-full">
                                    Accueil
                                </span>
                                <span className="invisible relative">
                                    Accueil
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <p className="text-14-regular justify-items-end text-center text-dark-600 xl:text-left py-12 xl:ml-10">
                ©2025 <Link href="https://buckloick.com/">Loick Buck</Link>
            </p>
        </section>
    )
}

export default Custom404
