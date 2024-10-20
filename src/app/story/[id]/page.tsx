'use client'

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {getStoryById} from "@/db/repository/story";
import StoryHeader from "./StoryHeader";
import StoryChapters from "./StoryChapters";
import StoryComments from "./StoryComments";
import StoryProgress from "./StoryProgress";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {MessageCircle} from "lucide-react";

// Mock user data
const userData = {
    isLoggedIn: true,
    currentChapter: 2,
    username: "reader123"
};

type StoryLobbyPageProps = {
    params: {
        id: string;
    };
};

export default function StoryLobbyPage({params}: StoryLobbyPageProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(userData.isLoggedIn);
    const router = useRouter();

    // Fetch story data with React Query
    const {data: storyData, error, isLoading, isSuccess} = useQuery({
        queryKey: ['dbStory', params.id],
        queryFn: async () => getStoryById(params.id),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("ERROR", error);
        return <div>Error: {error.message}</div>;
    }


    if (isSuccess && storyData) {

        const handleReadChapter = (chapterNumber: number) => {
            if (!isLoggedIn && chapterNumber > 1) {
                alert("Please log in to continue reading beyond the first chapter.");
            } else {
                router.push(`/story/${storyData.id}/chapter/${chapterNumber}`);
            }
        };

        const handleLogin = () => {
            setIsLoggedIn(true);
        }


        return (
            <div className="container mx-auto p-4 max-w-4xl">
                <StoryHeader storyData={storyData} userData={userData} handleLogin={handleLogin}
                             handleReadChapter={handleReadChapter}/>


                <Tabs defaultValue="chapters">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="chapters">Chapters</TabsTrigger>
                        <TabsTrigger value="comments" disabled={true}>Comments</TabsTrigger>
                    </TabsList>


                    <TabsContent value="chapters">
                        <StoryChapters chapters={storyData.chapters} onReadChapter={handleReadChapter}
                                       isLoggedIn={isLoggedIn}/>
                    </TabsContent>
                    <TabsContent value="comments">
                        <StoryComments/>
                    </TabsContent>
                </Tabs>


            </div>
        );
    }
}