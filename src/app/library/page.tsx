'use client'

import React, {useState} from "react"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Flame, TrendingUp, Sparkles, BookOpen, Eye, ChevronRight} from "lucide-react"
import {Navbar} from "@/components/global/navbar";

import {useQuery} from '@tanstack/react-query'
import {getAllStories} from "@/db/repository/story";
import Link from "next/link";

// Mock data for stories
// const mockStories = [
//     { id: 1, title: "The Last Message", views: 15000, chapters: 5, category: "hot" },
//     { id: 2, title: "Whispers in the Chat", views: 12000, chapters: 3, category: "trending" },
//     { id: 3, title: "Digital Love Letters", views: 8000, chapters: 7, category: "new" },
//     { id: 4, title: "The Encrypted Diary", views: 10000, chapters: 4, category: "hot" },
//     { id: 5, title: "Texting Time Travel", views: 9000, chapters: 6, category: "trending" },
//     { id: 6, title: "Emoji Enigma", views: 7000, chapters: 2, category: "new" },
//     { id: 7, title: "The Viral Thread", views: 14000, chapters: 5, category: "hot" },
//     { id: 8, title: "Ghosted", views: 11000, chapters: 4, category: "trending" },
//     { id: 9, title: "Autocorrect Love Story", views: 6000, chapters: 3, category: "new" },
//     { id: 10, title: "Swipe Right for Mystery", views: 13000, chapters: 6, category: "hot" },
//     { id: 11, title: "The Group Chat Chronicles", views: 10500, chapters: 5, category: "trending" },
//     { id: 12, title: "Voicemail from the Future", views: 5500, chapters: 2, category: "new" },
// ]

type Story = {
    id: number
    title: string
    views: number
    chapters: number
    category: string
}

export default function LibraryPage() {


    const {data, error, isPending, isSuccess} = useQuery({
        queryKey: ['dbStories'],
        queryFn: async () => getAllStories()
    })

    const [searchTerm, setSearchTerm] = useState("")
    const [currentCategory, setCurrentCategory] = useState("all")

    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log("ERROR")
        return <div>Error: {error.message}</div>
    }
    if (isSuccess && data !== undefined) {
        console.log("BOOOM")
        const mockStories = data;


        const filteredStories = mockStories.filter(story =>
            story.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (currentCategory === "all" || story.category === currentCategory)
        )

        const getCategoryIcon = (category: string) => {
            switch (category) {
                case "hot":
                    return <Flame className="h-4 w-4 text-red-500"/>
                case "trending":
                    return <TrendingUp className="h-4 w-4 text-blue-500"/>
                case "new":
                    return <Sparkles className="h-4 w-4 text-yellow-500"/>
                default:
                    return null
            }
        }

        const StoryCard = ({story}: { story: Story }) => (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="truncate">{story.title}</span>
                        {getCategoryIcon(story.category)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4"/>
                        <span>{story.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                        <BookOpen className="h-4 w-4"/>
                        <span>{story.chapters} chapters</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link
                        href={`/story/${story.id}`}
                        // variant="outline"
                        className="w-full">
                        Read Now <ChevronRight className="ml-2 h-4 w-4"/>
                    </Link>
                </CardFooter>
            </Card>
        )

        return (
            <div className="container mx-auto p-4">
                <Navbar/>
                <h1 className="text-3xl font-bold mb-6">Discover Stories</h1>
                <div className="mb-6">
                    <Input
                        type="search"
                        placeholder="Search stories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                </div>
                <Tabs defaultValue="all" className="space-y-6" onValueChange={setCurrentCategory}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="hot">
                            <Flame className="h-4 w-4 mr-2"/>
                            Hot
                        </TabsTrigger>
                        <TabsTrigger value="trending">
                            <TrendingUp className="h-4 w-4 mr-2"/>
                            Trending
                        </TabsTrigger>
                        <TabsTrigger value="new">
                            <Sparkles className="h-4 w-4 mr-2"/>
                            New
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredStories.map(story => (
                                <StoryCard key={story.id} story={story}  />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="hot" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredStories.filter(story => story.category === "hot").map(story => (
                                <StoryCard key={story.id} story={story}/>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="trending" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredStories.filter(story => story.category === "trending").map(story => (
                                <StoryCard key={story.id} story={story}/>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="new" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredStories.filter(story => story.category === "new").map(story => (
                                <StoryCard key={story.id} story={story}/>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
                {filteredStories.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-muted-foreground">No stories found. Try adjusting your
                            search.</p>
                    </div>
                )}
            </div>
        )

    }
}