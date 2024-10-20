"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash2, Eye, BookOpen, Plus, Save } from "lucide-react";

// Mock data for the creator's stories
const creatorStories = [
  {
    id: 1,
    title: "The Last Message",
    views: 15000,
    chapters: 5,
    status: "published",
  },
  {
    id: 2,
    title: "Whispers in the Chat",
    views: 12000,
    chapters: 3,
    status: "draft",
  },
  {
    id: 3,
    title: "Digital Love Letters",
    views: 8000,
    chapters: 7,
    status: "published",
  },
];

// Mock data for the creator's account
const creatorAccount = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  username: "janestoryteller",
  bio: "Passionate storyteller, weaving tales through text messages and digital conversations.",
  avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=JaneDoe",
};

export default function CreatorDashboard() {
  const [stories, setStories] = useState(creatorStories);
  const [account, setAccount] = useState(creatorAccount);
  const [newStoryTitle, setNewStoryTitle] = useState("");

  const handleCreateStory = () => {
    if (newStoryTitle.trim()) {
      const newStory = {
        id: Date.now(),
        title: newStoryTitle,
        views: 0,
        chapters: 0,
        status: "draft",
      };
      setStories([newStory, ...stories]);
      setNewStoryTitle("");
    }
  };

  const handleDeleteStory = (id: number) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  const handleUpdateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setAccount({
      ...account,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      bio: formData.get("bio") as string,
    });
    alert("Account updated successfully!");
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>

      <Tabs defaultValue="stories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stories">My Stories</TabsTrigger>
          <TabsTrigger value="create">Create New Story</TabsTrigger>
          <TabsTrigger value="account">Account Management</TabsTrigger>
        </TabsList>

        <TabsContent value="stories">
          <Card>
            <CardHeader>
              <CardTitle>My Stories</CardTitle>
              <CardDescription>
                Manage and track your created stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="flex items-center justify-between p-4 border-b last:border-b-0"
                  >
                    <div>
                      <h3 className="font-semibold">{story.title}</h3>
                      <div className="flex space-x-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {story.views}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {story.chapters}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          story.status === "published" ? "default" : "secondary"
                        }
                      >
                        {story.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteStory(story.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Story</CardTitle>
              <CardDescription>
                Start a new story and bring your ideas to life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Story Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your story title"
                    value={newStoryTitle}
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateStory}>
                <Plus className="mr-2 h-4 w-4" /> Create Story
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateAccount} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={account.avatar} />
                    <AvatarFallback>
                      {account.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={account.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={account.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={account.username}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" name="bio" defaultValue={account.bio} />
                </div>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Update Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
