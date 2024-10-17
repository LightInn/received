'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Image as ImageIcon, Send } from "lucide-react"

type Character = {
    id: string
    name: string
    color: string
}

type Message = {
    id: string
    characterId: string
    content: string
    type: 'text' | 'image'
}

type Chapter = {
    id: string
    title: string
    conversations: Message[]
}

export default function EditorPage() {
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [characters, setCharacters] = useState<Character[]>([])
    const [currentChapter, setCurrentChapter] = useState<string | null>(null)
    const [newChapterTitle, setNewChapterTitle] = useState("")
    const [newCharacterName, setNewCharacterName] = useState("")
    const [newCharacterColor, setNewCharacterColor] = useState("#000000")
    const [newMessage, setNewMessage] = useState("")
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)

    const addChapter = () => {
        if (newChapterTitle) {
            const newChapter: Chapter = {
                id: Date.now().toString(),
                title: newChapterTitle,
                conversations: []
            }
            setChapters([...chapters, newChapter])
            setNewChapterTitle("")
            setCurrentChapter(newChapter.id)
        }
    }

    const addCharacter = () => {
        if (newCharacterName && newCharacterColor) {
            const newCharacter: Character = {
                id: Date.now().toString(),
                name: newCharacterName,
                color: newCharacterColor
            }
            setCharacters([...characters, newCharacter])
            setNewCharacterName("")
            setNewCharacterColor("#000000")
        }
    }

    const addMessage = () => {
        if (currentChapter && selectedCharacter && newMessage) {
            const updatedChapters = chapters.map(chapter => {
                if (chapter.id === currentChapter) {
                    return {
                        ...chapter,
                        conversations: [
                            ...chapter.conversations,
                            {
                                id: Date.now().toString(),
                                characterId: selectedCharacter,
                                content: newMessage,
                                type: 'text'
                            }
                        ]
                    }
                }
                return chapter
            })
            setChapters(updatedChapters)
            setNewMessage("")
        }
    }

    const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && currentChapter && selectedCharacter) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const updatedChapters = chapters.map(chapter => {
                    if (chapter.id === currentChapter) {
                        return {
                            ...chapter,
                            conversations: [
                                ...chapter.conversations,
                                {
                                    id: Date.now().toString(),
                                    characterId: selectedCharacter,
                                    content: e.target?.result as string,
                                    type: 'image'
                                }
                            ]
                        }
                    }
                    return chapter
                })
                setChapters(updatedChapters)
            }
            reader.readAsDataURL(file)
        }
    }

    const deleteChapter = (chapterId: string) => {
        setChapters(chapters.filter(chapter => chapter.id !== chapterId))
        if (currentChapter === chapterId) {
            setCurrentChapter(null)
        }
    }

    const deleteCharacter = (characterId: string) => {
        setCharacters(characters.filter(character => character.id !== characterId))
        if (selectedCharacter === characterId) {
            setSelectedCharacter(null)
        }
    }

    const deleteMessage = (chapterId: string, messageId: string) => {
        const updatedChapters = chapters.map(chapter => {
            if (chapter.id === chapterId) {
                return {
                    ...chapter,
                    conversations: chapter.conversations.filter(message => message.id !== messageId)
                }
            }
            return chapter
        })
        setChapters(updatedChapters)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Story Editor</h1>
            <Tabs defaultValue="chapters" className="space-y-4">
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
                                    placeholder="New Chapter Title"
                                    value={newChapterTitle}
                                    onChange={(e) => setNewChapterTitle(e.target.value)}
                                />
                                <Button onClick={addChapter}>Add Chapter</Button>
                            </div>
                            <ScrollArea className="h-[300px]">
                                {chapters.map(chapter => (
                                    <div key={chapter.id} className="flex items-center justify-between p-2 border-b">
                                        <span>{chapter.title}</span>
                                        <div>
                                            <Button variant="ghost" size="sm" onClick={() => setCurrentChapter(chapter.id)}>Edit</Button>
                                            <Button variant="ghost" size="sm" onClick={() => deleteChapter(chapter.id)}><Trash2 className="h-4 w-4" /></Button>
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
                                    placeholder="Character Name"
                                    value={newCharacterName}
                                    onChange={(e) => setNewCharacterName(e.target.value)}
                                />
                                <Input
                                    type="color"
                                    value={newCharacterColor}
                                    onChange={(e) => setNewCharacterColor(e.target.value)}
                                    className="w-20"
                                />
                                <Button onClick={addCharacter}>Add Character</Button>
                            </div>
                            <ScrollArea className="h-[300px]">
                                {characters.map(character => (
                                    <div key={character.id} className="flex items-center justify-between p-2 border-b">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: character.color }}></div>
                                            <span>{character.name}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => deleteCharacter(character.id)}><Trash2 className="h-4 w-4" /></Button>
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
                            <Select onValueChange={setCurrentChapter} value={currentChapter || undefined}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a chapter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {chapters.map(chapter => (
                                        <SelectItem key={chapter.id} value={chapter.id}>{chapter.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {currentChapter && (
                                <div className="mt-4 space-y-4">
                                    <Select onValueChange={setSelectedCharacter} value={selectedCharacter || undefined}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a character" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {characters.map(character => (
                                                <SelectItem key={character.id} value={character.id}>{character.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="flex space-x-2">
                                        <Textarea
                                            placeholder="Type your message"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <Button onClick={addMessage}><Send className="h-4 w-4" /></Button>
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={addImage}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload">
                                            <Button variant="outline" asChild>
                                                <span><ImageIcon className="h-4 w-4 mr-2" /> Upload Image</span>
                                            </Button>
                                        </label>
                                    </div>
                                    <ScrollArea className="h-[300px] border rounded-md p-4">
                                        {chapters.find(chapter => chapter.id === currentChapter)?.conversations.map(message => {
                                            const character = characters.find(c => c.id === message.characterId)
                                            return (
                                                <div key={message.id} className="flex items-start space-x-2 mb-2">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: character?.color }}>
                                                        {character?.name[0]}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold">{character?.name}</div>
                                                        {message.type === 'text' ? (
                                                            <p>{message.content}</p>
                                                        ) : (
                                                            <img src={message.content} alt="Uploaded" className="max-w-xs rounded-md" />
                                                        )}
                                                    </div>
                                                    <Button variant="ghost" size="sm" onClick={() => deleteMessage(currentChapter, message.id)}><Trash2 className="h-4 w-4" /></Button>
                                                </div>
                                            )
                                        })}
                                    </ScrollArea>
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
                            <ScrollArea className="h-[500px]">
                                {chapters.map(chapter => (
                                    <div key={chapter.id} className="mb-8">
                                        <h2 className="text-2xl font-bold mb-4">{chapter.title}</h2>
                                        <div className="space-y-4">
                                            {chapter.conversations.map(message => {
                                                const character = characters.find(c => c.id === message.characterId)
                                                return (
                                                    <div key={message.id} className="flex items-start space-x-2">
                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: character?.color }}>
                                                            {character?.name[0]}
                                                        </div>
                                                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                                                            <div className="font-bold">{character?.name}</div>
                                                            {message.type === 'text' ? (
                                                                <p>{message.content}</p>
                                                            ) : (
                                                                <img src={message.content} alt="Uploaded" className="max-w-xs rounded-md" />
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}