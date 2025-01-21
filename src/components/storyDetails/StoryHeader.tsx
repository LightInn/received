import StoryProgress from "@/components/storyDetails/StoryProgress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Story } from "@/models/Story";
import { BookOpen, Clock, Eye, Star } from "lucide-react";
import React from "react";

type StoryHeaderProps = {
  handleLogin: () => void;
  handleReadChapter: (chapterNumber: number) => void;

  storyData: Story;
  userData: {
    currentChapter: number;
    isLoggedIn: boolean;
    username: string;
  };
};

export default function StoryHeader({
  handleLogin,
  handleReadChapter,
  storyData,
  userData,
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
          alt={storyData.title}
          className={"w-full h-48 object-cover mb-4"}
          src={`https://loremflickr.com/400/200/${storyData.category}`}
        />
        <p className="text-muted-foreground mb-4">{storyData.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {storyData.tags?.map((tag, index) => (
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
            <Button onClick={handleLogin} variant="outline">
              Log In
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
