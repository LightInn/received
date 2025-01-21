"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStoryById } from "@/repository/story.repository";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

import StoryChapters from "../../../components/storyDetails/StoryChapters";
import StoryComments from "../../../components/storyDetails/StoryComments";
import StoryHeader from "../../../components/storyDetails/StoryHeader";

// Mock user data
const userData = {
  currentChapter: 2,
  isLoggedIn: true,
  username: "reader123",
};

type StoryLobbyPageProps = {
  id: string;
};

export default function StoryLobbyPage({
  params,
}: {
  params: Promise<StoryLobbyPageProps>;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(userData.isLoggedIn);
  const router = useRouter();

  const { id } = use(params);

  // Fetch story data with React Query
  const {
    data: storyData,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: async () => getStoryById(id),
    queryKey: ["dbStory", id],
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
        // router.push(`/story/${storyData.id}/reader/${chapterNumber}`);
        router.push(`/story/${storyData.id}/reader`);
      }
    };

    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <StoryHeader
          handleLogin={handleLogin}
          handleReadChapter={handleReadChapter}
          storyData={storyData}
          userData={userData}
        />

        <Tabs defaultValue="chapters">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger disabled={true} value="comments">
              Comments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chapters">
            <StoryChapters
              chapters={storyData.chaptersNumber}
              isLoggedIn={isLoggedIn}
              onReadChapter={handleReadChapter}
            />
          </TabsContent>
          <TabsContent value="comments">
            <StoryComments />
          </TabsContent>
        </Tabs>
      </div>
    );
  }
}
