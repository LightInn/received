"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Image as ImageIcon, Send, Trash2 } from "lucide-react";
import { useState } from "react";

type Chapter = {
  conversations: Conversation[];
  id: string;
  title: string;
};

type Character = {
  color: string;
  id: string;
  name: string;
};

type Conversation = {
  id: string;
  messages: Message[];
  title: string;
};

type Message = {
  characterId: string;
  content: string;
  id: string;
  type: "image" | "text";
};

export default function EditorPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentChapter, setCurrentChapter] = useState<null | string>(null);
  const [currentConversation, setCurrentConversation] = useState<null | string>(
    null,
  );
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [newCharacterName, setNewCharacterName] = useState("");
  const [newCharacterColor, setNewCharacterColor] = useState("#000000");
  const [newMessage, setNewMessage] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<null | string>(
    null,
  );

  const addChapter = () => {
    if (newChapterTitle) {
      const newChapter: Chapter = {
        conversations: [],
        id: Date.now().toString(),
        title: newChapterTitle,
      };
      setChapters([...chapters, newChapter]);
      setNewChapterTitle("");
      setCurrentChapter(newChapter.id);
    }
  };

  const addConversation = () => {
    if (currentChapter && newConversationTitle) {
      const updatedChapters = chapters.map((chapter) => {
        if (chapter.id === currentChapter) {
          return {
            ...chapter,
            conversations: [
              ...chapter.conversations,
              {
                id: Date.now().toString(),
                messages: [],
                title: newConversationTitle,
              },
            ],
          };
        }
        return chapter;
      });
      setChapters(updatedChapters);
      setNewConversationTitle("");
    }
  };

  const addCharacter = () => {
    if (newCharacterName && newCharacterColor) {
      const newCharacter: Character = {
        color: newCharacterColor,
        id: Date.now().toString(),
        name: newCharacterName,
      };
      setCharacters([...characters, newCharacter]);
      setNewCharacterName("");
      setNewCharacterColor("#000000");
    }
  };

  const addMessage = () => {
    if (
      currentChapter &&
      currentConversation &&
      selectedCharacter &&
      newMessage
    ) {
      const updatedChapters = chapters.map((chapter) => {
        if (chapter.id === currentChapter) {
          return {
            ...chapter,
            conversations: chapter.conversations.map((conv) => {
              if (conv.id === currentConversation) {
                return {
                  ...conv,
                  messages: [
                    ...conv.messages,
                    {
                      characterId: selectedCharacter,
                      content: newMessage,
                      id: Date.now().toString(),
                      type: "text",
                    },
                  ],
                };
              }
              return conv;
            }),
          };
        }
        return chapter;
      });
      setChapters(updatedChapters);
      setNewMessage("");
    }
  };

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentChapter && currentConversation && selectedCharacter) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedChapters = chapters.map((chapter) => {
          if (chapter.id === currentChapter) {
            return {
              ...chapter,
              conversations: chapter.conversations.map((conv) => {
                if (conv.id === currentConversation) {
                  return {
                    ...conv,
                    messages: [
                      ...conv.messages,
                      {
                        characterId: selectedCharacter,
                        content: e.target?.result as string,
                        id: Date.now().toString(),
                        type: "image",
                      },
                    ],
                  };
                }
                return conv;
              }),
            };
          }
          return chapter;
        });
        setChapters(updatedChapters);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
    if (currentChapter === chapterId) {
      setCurrentChapter(null);
      setCurrentConversation(null);
    }
  };

  const deleteCharacter = (characterId: string) => {
    setCharacters(
      characters.filter((character) => character.id !== characterId),
    );
    if (selectedCharacter === characterId) {
      setSelectedCharacter(null);
    }
  };

  const deleteMessage = (
    chapterId: string,
    conversationId: string,
    messageId: string,
  ) => {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          conversations: chapter.conversations.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: conv.messages.filter(
                  (message) => message.id !== messageId,
                ),
              };
            }
            return conv;
          }),
        };
      }
      return chapter;
    });
    setChapters(updatedChapters);
  };

  const nextChapter = (currentChapterId: string) => {
    const currentIndex = chapters.findIndex(
      (chapter) => chapter.id === currentChapterId,
    );
    if (currentIndex < chapters.length - 1) {
      setCurrentChapter(chapters[currentIndex + 1].id);
      setCurrentConversation(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Story Editor</h1>
      <Tabs className="space-y-4" defaultValue="chapters">
        <TabsList>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="editor">Conversation Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          <Card>
            <CardHeader>
              <CardTitle>Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  placeholder="New Chapter Title"
                  value={newChapterTitle}
                />
                <Button onClick={addChapter}>Add Chapter</Button>
              </div>
              <ScrollArea className="h-[300px]">
                {chapters.map((chapter) => (
                  <div
                    className="flex items-center justify-between p-2 border-b"
                    key={chapter.id}
                  >
                    <span>{chapter.title}</span>
                    <div>
                      <Button
                        onClick={() => setCurrentChapter(chapter.id)}
                        size="sm"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteChapter(chapter.id)}
                        size="sm"
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
        <TabsContent value="characters">
          <Card>
            <CardHeader>
              <CardTitle>Characters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  onChange={(e) => setNewCharacterName(e.target.value)}
                  placeholder="Character Name"
                  value={newCharacterName}
                />
                <Input
                  className="w-20"
                  onChange={(e) => setNewCharacterColor(e.target.value)}
                  type="color"
                  value={newCharacterColor}
                />
                <Button onClick={addCharacter}>Add Character</Button>
              </div>
              <ScrollArea className="h-[300px]">
                {characters.map((character) => (
                  <div
                    className="flex items-center justify-between p-2 border-b"
                    key={character.id}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: character.color }}
                      ></div>
                      <span>{character.name}</span>
                    </div>
                    <Button
                      onClick={() => deleteCharacter(character.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={setCurrentChapter}
                value={currentChapter || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id}>
                      {chapter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentChapter && (
                <div className="mt-4 space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      onChange={(e) => setNewConversationTitle(e.target.value)}
                      placeholder="New Conversation Title"
                      value={newConversationTitle}
                    />
                    <Button onClick={addConversation}>Add Conversation</Button>
                  </div>
                  <Select
                    onValueChange={setCurrentConversation}
                    value={currentConversation || undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a conversation" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters
                        .find((chapter) => chapter.id === currentChapter)
                        ?.conversations.map((conv) => (
                          <SelectItem key={conv.id} value={conv.id}>
                            {conv.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {currentConversation && (
                    <>
                      <Select
                        onValueChange={setSelectedCharacter}
                        value={selectedCharacter || undefined}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a character" />
                        </SelectTrigger>
                        <SelectContent>
                          {characters.map((character) => (
                            <SelectItem key={character.id} value={character.id}>
                              {character.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex space-x-2">
                        <Textarea
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message"
                          value={newMessage}
                        />
                        <Button onClick={addMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <input
                          accept="image/*"
                          className="hidden"
                          id="image-upload"
                          onChange={addImage}
                          type="file"
                        />
                        <label htmlFor="image-upload">
                          <Button asChild variant="outline">
                            <span>
                              <ImageIcon className="h-4 w-4 mr-2" /> Upload
                              Image
                            </span>
                          </Button>
                        </label>
                      </div>
                      <ScrollArea className="h-[300px] border rounded-md p-4">
                        {chapters
                          .find((chapter) => chapter.id === currentChapter)
                          ?.conversations.find(
                            (conv) => conv.id === currentConversation,
                          )
                          ?.messages.map((message) => {
                            const character = characters.find(
                              (c) => c.id === message.characterId,
                            );
                            return (
                              <div
                                className="flex items-start space-x-2 mb-2"
                                key={message.id}
                              >
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: character?.color }}
                                >
                                  {character?.name[0]}
                                </div>
                                <div className="flex-1">
                                  <div className="font-bold">
                                    {character?.name}
                                  </div>
                                  {message.type === "text" ? (
                                    <p>{message.content}</p>
                                  ) : (
                                    <img
                                      alt="Uploaded"
                                      className="max-w-xs rounded-md"
                                      src={message.content}
                                    />
                                  )}
                                </div>
                                <Button
                                  onClick={() =>
                                    deleteMessage(
                                      currentChapter,
                                      currentConversation,
                                      message.id,
                                    )
                                  }
                                  size="sm"
                                  variant="ghost"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })}
                      </ScrollArea>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Story Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-bold mb-4">Chapters</h2>
                  <ScrollArea className="h-[500px]">
                    {chapters.map((chapter) => (
                      <div className="mb-8" key={chapter.id}>
                        <h3 className="text-lg font-semibold mb-2">
                          {chapter.title}
                        </h3>
                        <div className="space-y-2">
                          {chapter.conversations.map((conversation) => (
                            <Button
                              className="w-full justify-start"
                              key={conversation.id}
                              onClick={() => {
                                setCurrentChapter(chapter.id);
                                setCurrentConversation(conversation.id);
                              }}
                              variant="outline"
                            >
                              {conversation.title}
                            </Button>
                          ))}
                        </div>
                        {chapter.id === currentChapter && (
                          <Button
                            className="mt-4"
                            onClick={() => nextChapter(chapter.id)}
                          >
                            Next Chapter{" "}
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4">Conversation</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 text-center font-semibold">
                      {chapters
                        .find((c) => c.id === currentChapter)
                        ?.conversations.find(
                          (conv) => conv.id === currentConversation,
                        )?.title || "Select a conversation"}
                    </div>
                    <ScrollArea
                      className="h-[500px] p-4"
                      style={{
                        backgroundImage:
                          "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')",
                      }}
                    >
                      {currentChapter && currentConversation && (
                        <div className="space-y-4">
                          {chapters
                            .find((c) => c.id === currentChapter)
                            ?.conversations.find(
                              (conv) => conv.id === currentConversation,
                            )
                            ?.messages.map((message) => {
                              const character = characters.find(
                                (c) => c.id === message.characterId,
                              );
                              return (
                                <div
                                  className={`flex ${message.characterId === characters[0]?.id ? "justify-start" : "justify-end"}`}
                                  key={message.id}
                                >
                                  <div
                                    className={`max-w-[70%] ${message.characterId === characters[0]?.id ? "bg-gray-200 dark:bg-gray-700" : "bg-blue-500 text-white"} rounded-lg p-2`}
                                  >
                                    <div className="font-bold text-sm">
                                      {character?.name}
                                    </div>
                                    {message.type === "text" ? (
                                      <p>{message.content}</p>
                                    ) : (
                                      <img
                                        alt="Uploaded"
                                        className="max-w-full rounded-md"
                                        src={message.content}
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
