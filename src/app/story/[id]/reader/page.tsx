"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  MessageCircle,
  ArrowLeft,
  Camera,
  Phone,
  Calendar,
  Music,
  Settings,
  Grid,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for the story
const storyData = {
  title: "The Last Message",
  chapters: [
    { id: "1", title: "The Beginning" },
    { id: "2", title: "The Mystery Unfolds" },
    { id: "3", title: "The Revelation" },
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
        with: "Bob",
        lastMessage: "I'm not sure. He was supposed to meet me an hour ago.",
        timestamp: "10:07",
      },
      {
        id: "2",
        with: "Charlie",
        lastMessage: "Charlie! I was worried. What happened?",
        timestamp: "10:22",
      },
    ],
    "2": [
      {
        id: "3",
        with: "Alice",
        lastMessage: "No, I haven't. Is everything okay?",
        timestamp: "10:05",
      },
      {
        id: "4",
        with: "Charlie",
        lastMessage: "Charlie, where are you? Alice is looking for you.",
        timestamp: "10:10",
      },
    ],
    "3": [
      {
        id: "5",
        with: "Bob",
        lastMessage:
          "I'm sorry, I got caught up in something. I'll call her now.",
        timestamp: "10:15",
      },
      {
        id: "6",
        with: "Alice",
        lastMessage: "I'll explain everything when I see you. It's important.",
        timestamp: "10:25",
      },
    ],
  },
  messages: {
    "1": {
      Bob: [
        {
          id: "1",
          sender: "Alice",
          content: "Hey Bob, have you heard from Charlie?",
          timestamp: "10:00",
        },
        {
          id: "2",
          sender: "Bob",
          content: "No, I haven't. Is everything okay?",
          timestamp: "10:05",
        },
        {
          id: "3",
          sender: "Alice",
          content: "I'm not sure. He was supposed to meet me an hour ago.",
          timestamp: "10:07",
        },
      ],
      Charlie: [
        {
          id: "6",
          sender: "Charlie",
          content: "Alice, I'm so sorry. I'm on my way now.",
          timestamp: "10:20",
        },
        {
          id: "7",
          sender: "Alice",
          content: "Charlie! I was worried. What happened?",
          timestamp: "10:22",
        },
        {
          id: "8",
          sender: "Charlie",
          content: "I'll explain everything when I see you. It's important.",
          timestamp: "10:25",
        },
      ],
    },
    "2": {
      Alice: [
        {
          id: "1",
          sender: "Alice",
          content: "Hey Bob, have you heard from Charlie?",
          timestamp: "10:00",
        },
        {
          id: "2",
          sender: "Bob",
          content: "No, I haven't. Is everything okay?",
          timestamp: "10:05",
        },
        {
          id: "3",
          sender: "Alice",
          content: "I'm not sure. He was supposed to meet me an hour ago.",
          timestamp: "10:07",
        },
      ],
      Charlie: [
        {
          id: "4",
          sender: "Bob",
          content: "Charlie, where are you? Alice is looking for you.",
          timestamp: "10:10",
        },
        {
          id: "5",
          sender: "Charlie",
          content:
            "I'm sorry, I got caught up in something. I'll call her now.",
          timestamp: "10:15",
        },
      ],
    },
    "3": {
      Bob: [
        {
          id: "4",
          sender: "Bob",
          content: "Charlie, where are you? Alice is looking for you.",
          timestamp: "10:10",
        },
        {
          id: "5",
          sender: "Charlie",
          content:
            "I'm sorry, I got caught up in something. I'll call her now.",
          timestamp: "10:15",
        },
      ],
      Alice: [
        {
          id: "6",
          sender: "Charlie",
          content: "Alice, I'm so sorry. I'm on my way now.",
          timestamp: "10:20",
        },
        {
          id: "7",
          sender: "Alice",
          content: "Charlie! I was worried. What happened?",
          timestamp: "10:22",
        },
        {
          id: "8",
          sender: "Charlie",
          content: "I'll explain everything when I see you. It's important.",
          timestamp: "10:25",
        },
      ],
    },
  },
};

const apps = [
  { id: "chapters", name: "Chapters", icon: BookOpen },
  { id: "messages", name: "Messages", icon: MessageCircle },
  { id: "camera", name: "Camera", icon: Camera },
  { id: "phone", name: "Phone", icon: Phone },
  { id: "calendar", name: "Calendar", icon: Calendar },
  { id: "music", name: "Music", icon: Music },
  { id: "settings", name: "Settings", icon: Settings },
];

export default function StoryReaderComponent() {
  const [currentChapter, setCurrentChapter] = useState(
    storyData.chapters[0].id,
  );
  const [currentCharacter, setCurrentCharacter] = useState(
    storyData.characters[0].id,
  );
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
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
    <div className="grid grid-cols-3 gap-4 p-4">
      {apps.map((app) => (
        <Button
          key={app.id}
          variant="ghost"
          className="flex flex-col items-center justify-center h-24"
          onClick={() => handleAppSelect(app.id)}
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
                key={message.id}
                className={`max-w-[80%] ${message.sender === storyData.characters.find((c) => c.id === currentCharacter)?.name ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 dark:bg-gray-700"}`}
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
              key={conversation.id}
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
            key={chapter.id}
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
      case "messages":
        return renderMessagesApp();
      case "chapters":
        return renderChaptersApp();
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
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
        <Button variant="ghost" size="icon" onClick={handleBackToHome}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">
          {selectedApp
            ? selectedConversation ||
              apps.find((app) => app.id === selectedApp)?.name
            : storyData.characters.find((c) => c.id === currentCharacter)?.name}
        </h1>
        <Button variant="ghost" size="icon">
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
          <Button onClick={handleBackToConversations} className="w-full">
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
              variant={currentCharacter === character.id ? "default" : "ghost"}
              onClick={() => setCurrentCharacter(character.id)}
            >
              {character.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
