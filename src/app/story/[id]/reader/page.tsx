"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Camera,
  ChevronLeft,
  Grid,
  MessageCircle,
  Music,
  Phone,
  Settings,
} from "lucide-react";
import { useState } from "react";

// Mock data for the story
const storyData = {
  chapters: [
    { id: "1", title: "The Beginning" },
    { id: "2", title: "The Mystery Unfolds" },
    {
      id: "3",
      title: "The Revelation",
    },
  ],
  characters: [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ],
  conversations: {
    "1": [
      {
        id: "1",
        lastMessage: "I'm not sure. He was supposed to meet me an hour ago.",
        timestamp: "10:07",
        with: "Bob",
      },
      {
        id: "2",
        lastMessage: "Charlie! I was worried. What happened?",
        timestamp: "10:22",
        with: "Charlie",
      },
    ],
    "2": [
      {
        id: "3",
        lastMessage: "No, I haven't. Is everything okay?",
        timestamp: "10:05",
        with: "Alice",
      },
      {
        id: "4",
        lastMessage: "Charlie, where are you? Alice is looking for you.",
        timestamp: "10:10",
        with: "Charlie",
      },
    ],
    "3": [
      {
        id: "5",
        lastMessage:
          "I'm sorry, I got caught up in something. I'll call her now.",
        timestamp: "10:15",
        with: "Bob",
      },
      {
        id: "6",
        lastMessage: "I'll explain everything when I see you. It's important.",
        timestamp: "10:25",
        with: "Alice",
      },
    ],
  },
  messages: {
    "1": {
      Bob: [
        {
          content: "Hey Bob, have you heard from Charlie?",
          id: "1",
          sender: "Alice",
          timestamp: "10:00",
        },
        {
          content: "No, I haven't. Is everything okay?",
          id: "2",
          sender: "Bob",
          timestamp: "10:05",
        },
        {
          content: "I'm not sure. He was supposed to meet me an hour ago.",
          id: "3",
          sender: "Alice",
          timestamp: "10:07",
        },
      ],
      Charlie: [
        {
          content: "Alice, I'm so sorry. I'm on my way now.",
          id: "6",
          sender: "Charlie",
          timestamp: "10:20",
        },
        {
          content: "Charlie! I was worried. What happened?",
          id: "7",
          sender: "Alice",
          timestamp: "10:22",
        },
        {
          content: "I'll explain everything when I see you. It's important.",
          id: "8",
          sender: "Charlie",
          timestamp: "10:25",
        },
      ],
    },
    "2": {
      Alice: [
        {
          content: "Hey Bob, have you heard from Charlie?",
          id: "1",
          sender: "Alice",
          timestamp: "10:00",
        },
        {
          content: "No, I haven't. Is everything okay?",
          id: "2",
          sender: "Bob",
          timestamp: "10:05",
        },
        {
          content: "I'm not sure. He was supposed to meet me an hour ago.",
          id: "3",
          sender: "Alice",
          timestamp: "10:07",
        },
      ],
      Charlie: [
        {
          content: "Charlie, where are you? Alice is looking for you.",
          id: "4",
          sender: "Bob",
          timestamp: "10:10",
        },
        {
          content:
            "I'm sorry, I got caught up in something. I'll call her now.",
          id: "5",
          sender: "Charlie",
          timestamp: "10:15",
        },
      ],
    },
    "3": {
      Alice: [
        {
          content: "Alice, I'm so sorry. I'm on my way now.",
          id: "6",
          sender: "Charlie",
          timestamp: "10:20",
        },
        {
          content: "Charlie! I was worried. What happened?",
          id: "7",
          sender: "Alice",
          timestamp: "10:22",
        },
        {
          content: "I'll explain everything when I see you. It's important.",
          id: "8",
          sender: "Charlie",
          timestamp: "10:25",
        },
      ],
      Bob: [
        {
          content: "Charlie, where are you? Alice is looking for you.",
          id: "4",
          sender: "Bob",
          timestamp: "10:10",
        },
        {
          content:
            "I'm sorry, I got caught up in something. I'll call her now.",
          id: "5",
          sender: "Charlie",
          timestamp: "10:15",
        },
      ],
    },
  },
  title: "The Last Message",
};

const apps = [
  { icon: BookOpen, id: "chapters", name: "Chapters" },
  {
    icon: MessageCircle,
    id: "messages",
    name: "Messages",
  },
  { icon: Camera, id: "camera", name: "Camera" },
  { icon: Phone, id: "phone", name: "Phone" },
  {
    icon: Calendar,
    id: "calendar",
    name: "Calendar",
  },
  { icon: Music, id: "music", name: "Music" },
  { icon: Settings, id: "settings", name: "Settings" },
];

export default function StoryReaderComponent() {
  const [currentChapter, setCurrentChapter] = useState(
    storyData.chapters[0].id,
  );
  const [currentCharacter, setCurrentCharacter] = useState(
    storyData.characters[0].id,
  );
  const [selectedApp, setSelectedApp] = useState<null | string>(null);
  const [selectedConversation, setSelectedConversation] = useState<
    null | string
  >(null);

  const handleAppSelect = (appId: string) => {
    setSelectedApp(appId);
    if (appId !== "messages") {
      setSelectedConversation(null);
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleBackToHome = () => {
    setSelectedApp(null);
    setSelectedConversation(null);
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
  };

  const handleChapterSelect = (chapterId: string) => {
    setCurrentChapter(chapterId);
    setSelectedApp(null);
    setSelectedConversation(null);
  };

  const renderHomeScreen = () => (
    <div className="px-24 grid grid-cols-3 gap-4 p-4">
      {apps.map((app) => (
        <Button
          className="flex flex-col items-center justify-center h-24"
          key={app.id}
          onClick={() => handleAppSelect(app.id)}
          variant="ghost"
        >
          <app.icon className="h-8 w-8 mb-2" />
          <span className="text-xs">{app.name}</span>
        </Button>
      ))}
    </div>
  );

  const renderMessagesApp = () => (
    <ScrollArea className="flex-1">
      {selectedConversation ? (
        <div className="p-4 space-y-4">
          {storyData.messages[currentCharacter][selectedConversation].map(
            (message) => (
              <Card
                className={`max-w-[80%] ${message.sender === storyData.characters.find((c) => c.id === currentCharacter)?.name ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 dark:bg-gray-700"}`}
                key={message.id}
              >
                <CardContent className="p-3">
                  <p className="text-sm font-semibold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {message.timestamp}
                  </p>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {storyData.conversations[currentCharacter].map((conversation) => (
            <Card
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation.with)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{conversation.with}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {conversation.timestamp}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );

  const renderChaptersApp = () => (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {storyData.chapters.map((chapter) => (
          <Card
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            key={chapter.id}
            onClick={() => handleChapterSelect(chapter.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{chapter.title}</p>
                {chapter.id === currentChapter && (
                  <Badge variant="secondary">Current</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  const renderAppContent = () => {
    switch (selectedApp) {
      case "chapters":
        return renderChaptersApp();
      case "messages":
        return renderMessagesApp();
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              This app is not available in the current chapter.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center">
      {/* everything under is the "phone"*/}
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900  max-w-[450px]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
          <Button onClick={handleBackToHome} size="icon" variant="ghost">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">
            {selectedApp
              ? selectedConversation ||
                apps.find((app) => app.id === selectedApp)?.name
              : storyData.characters.find((c) => c.id === currentCharacter)
                  ?.name}
          </h1>
          <Button size="icon" variant="ghost">
            <Grid className="h-6 w-6" />
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {selectedApp ? renderAppContent() : renderHomeScreen()}
        </div>

        {/* Footer */}
        {selectedApp === "messages" && selectedConversation && (
          <div className="p-4 bg-white dark:bg-gray-800 shadow-top">
            <Button className="w-full" onClick={handleBackToConversations}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Conversations
            </Button>
          </div>
        )}

        {/* Character selection */}
        <div className="p-4 bg-white dark:bg-gray-800 shadow-top">
          <div className="flex justify-around">
            {storyData.characters.map((character) => (
              <Button
                key={character.id}
                onClick={() => setCurrentCharacter(character.id)}
                variant={
                  currentCharacter === character.id ? "default" : "ghost"
                }
              >
                {character.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
