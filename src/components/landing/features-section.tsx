import { Tv, Film, BookOpen } from "lucide-react"

export function FeaturesSection() {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Don&apos;t see Your Story...</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <Film className="h-12 w-12 text-[#3195b3]" />
                        </div>
                        <h3 className="text-xl font-semibold">Get produced to movie or film</h3>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <Tv className="h-12 w-12 text-[#3195b3]" />
                        </div>
                        <h3 className="text-xl font-semibold">Get adapted to a TV series</h3>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <BookOpen className="h-12 w-12 text-[#3195b3]" />
                        </div>
                        <h3 className="text-xl font-semibold">Get published</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

