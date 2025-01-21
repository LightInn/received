"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Eye, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock data for the creator's stories
const creatorStories = [
  {
    chapters: 5,
    id: 1,
    status: "published",
    title: "The Last Message",
    views: 15000,
  },
  {
    chapters: 3,
    id: 2,
    status: "draft",
    title: "Whispers in the Chat",
    views: 12000,
  },
  {
    chapters: 7,
    id: 3,
    status: "published",
    title: "Digital Love Letters",
    views: 8000,
  },
];

// Mock data for the creator's account
const creatorAccount = {
  avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=JaneDoe",
  bio: "Passionate storyteller, weaving tales through text messages and digital conversations.",
  email: "jane.doe@example.com",
  name: "Jane Doe",
  username: "janestoryteller",
};

export default function CreatorDashboard() {
  const [stories, setStories] = useState(creatorStories);
  const [account, setAccount] = useState(creatorAccount);
  const [newStoryTitle, setNewStoryTitle] = useState("");

  const handleCreateStory = () => {
    if (newStoryTitle.trim()) {
      const newStory = {
        chapters: 0,
        id: Date.now(),
        status: "draft",
        title: newStoryTitle,
        views: 0,
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
      bio: formData.get("bio") as string,
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      username: formData.get("username") as string,
    });
    alert("Account updated successfully!");
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>

      <Tabs className="space-y-4" defaultValue="stories">
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
                    className="flex items-center justify-between p-4 border-b last:border-b-0"
                    key={story.id}
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
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteStory(story.id)}
                        size="icon"
                        variant="ghost"
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
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                    placeholder="Enter your story title"
                    value={newStoryTitle}
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
              <form className="space-y-4" onSubmit={handleUpdateAccount}>
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
                  <Input defaultValue={account.name} id="name" name="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    defaultValue={account.email}
                    id="email"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    defaultValue={account.username}
                    id="username"
                    name="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input defaultValue={account.bio} id="bio" name="bio" />
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
