"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Star, MessageCircle, Clock, Eye } from "lucide-react";
import { getStoryById } from "@/db/repository/story";
import { useQuery } from "@tanstack/react-query";

// Mock user data
const userData = {
  isLoggedIn: false,
  currentChapter: 2,
  username: "reader123",
};

export default function StoryLobbyPage({ params }: { params: { id: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState(userData.isLoggedIn);
  const router = useRouter();

  // fetch story data with react query
  const { data, error, isPending, isSuccess } = useQuery({
    queryKey: ["dbStory", params.id],
    queryFn: async () => getStoryById(params.id),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("ERROR");
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess && data !== undefined) {
    const storyData = data;

    const handleReadChapter = (chapterNumber: number) => {
      if (!isLoggedIn && chapterNumber > 1) {
        // Prompt user to log in
        alert("Please log in to continue reading beyond the first chapter.");
      } else {
        // Navigate to the chapter
        router.push(`/story/${storyData.id}/chapter/${chapterNumber}`);
      }
    };

    const handleLogin = () => {
      // In a real app, this would open a login modal or redirect to a login page
      setIsLoggedIn(true);
    };

    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2">
                  {storyData.title}
                </CardTitle>
                <CardDescription>by {storyData.author}</CardDescription>
              </div>
              <Badge variant="secondary">{storyData.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* image of the story */}
            <img
              src={`https://loremflickr.com/400/200/${storyData.category}`}
              alt={storyData.title}
              className={"w-full h-48 object-cover mb-4"}
            />

            <p className="text-muted-foreground mb-4">
              {storyData.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {storyData.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>
                  {storyData.rating} ({storyData.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                <span>{storyData.views.toLocaleString("en-US")} views</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>{storyData.chapters} chapters</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{storyData.estimatedReadTime}</span>
              </div>
            </div>
            {isLoggedIn && (
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Your Progress</span>
                  <span>
                    {userData.currentChapter} / {storyData.chapters} chapters
                  </span>
                </div>
                <Progress
                  value={(userData.currentChapter / storyData.chapters) * 100}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() =>
                handleReadChapter(isLoggedIn ? userData.currentChapter : 1)
              }
            >
              {isLoggedIn ? "Continue Reading" : "Start Reading"}
            </Button>
            {!isLoggedIn && (
              <Button variant="outline" onClick={handleLogin}>
                Log In
              </Button>
            )}
          </CardFooter>
        </Card>

        <Tabs defaultValue="chapters">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="comments" disabled={true}>
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chapters">
            <Card>
              <CardHeader>
                <CardTitle>Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.from(
                  { length: storyData.chapters },
                  (_, i) => i + 1,
                ).map((chapterNum) => (
                  <Button
                    key={chapterNum}
                    variant="ghost"
                    className="w-full justify-start mb-2"
                    onClick={() => handleReadChapter(chapterNum)}
                  >
                    Chapter {chapterNum}
                    {isLoggedIn && chapterNum <= userData.currentChapter && (
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((commentId) => (
                    <div key={commentId} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=User${commentId}`}
                        />
                        <AvatarFallback>U{commentId}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">User{commentId}</p>
                        <p className="text-sm text-muted-foreground">
                          Great story! Can't wait for the next chapter.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" /> Add Comment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/*<StoryLobbyPage params={params} />*/}
      </div>
    );
  }
}
