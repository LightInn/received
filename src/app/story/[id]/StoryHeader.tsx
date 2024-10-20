import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, BookOpen, Clock } from "lucide-react";
import StoryProgress from "@/app/story/[id]/StoryProgress";
import { Button } from "@/components/ui/button";
import React from "react";

type StoryHeaderProps = {
  storyData: {
    title: string;
    author: string;
    category: string;
    description: string;
    tags: string[];
    rating: number;
    reviews: number;
    views: number;
    chapters: number;
    estimatedReadTime: string;
  };
  userData: {
    isLoggedIn: boolean;
    currentChapter: number;
    username: string;
  };

  handleReadChapter: (chapterNumber: number) => void;
  handleLogin: () => void;
};

export default function StoryHeader({
  storyData,
  userData,
  handleReadChapter,
  handleLogin,
}: StoryHeaderProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl mb-2">{storyData.title}</CardTitle>
            <CardDescription>by {storyData.author}</CardDescription>
          </div>
          <Badge variant="secondary">{storyData.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <img
          src={`https://loremflickr.com/400/200/${storyData.category}`}
          alt={storyData.title}
          className={"w-full h-48 object-cover mb-4"}
        />
        <p className="text-muted-foreground mb-4">{storyData.description}</p>
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
        {userData.isLoggedIn && (
          <StoryProgress
            currentChapter={userData.currentChapter}
            totalChapters={storyData.chapters}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex justify-between my-4">
          <Button
            onClick={() =>
              handleReadChapter(
                userData.isLoggedIn ? userData.currentChapter : 1,
              )
            }
          >
            {userData.isLoggedIn ? "Continue Reading" : "Start Reading"}
          </Button>
          {!userData.isLoggedIn && (
            <Button variant="outline" onClick={handleLogin}>
              Log In
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
