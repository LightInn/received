'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Smartphone } from "lucide-react"

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MessageCircle className="h-6 w-6 mr-2" />
          <span className="font-bold">SMSStory</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create and Share SMS Stories
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Craft engaging stories in a familiar text message format. Connect with readers through the power of
                    conversational storytelling.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="px-8">Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[280px] h-[580px] bg-gray-900 rounded-[60px] border-[14px] border-gray-800 overflow-hidden shadow-xl">
                  <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-xl"></div>
                  <div className="absolute bottom-0 inset-x-0 h-6 bg-gray-800 rounded-t-xl"></div>
                  <div className="h-full w-full bg-gray-50 overflow-y-scroll">
                    <div className="flex flex-col p-4 space-y-4">
                      <div className="self-start bg-gray-200 rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">Hey! Have you heard about the new social platform for SMS stories?</p>
                      </div>
                      <div className="self-end bg-blue-500 text-white rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">No, what's it called?</p>
                      </div>
                      <div className="self-start bg-gray-200 rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">It's called SMSStory! You can create and share stories in a text message format.</p>
                      </div>
                      <div className="self-end bg-blue-500 text-white rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">That sounds interesting! How does it work?</p>
                      </div>
                      <div className="self-start bg-gray-200 rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">You write your story as a series of text messages. Readers can experience it like a real conversation!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Create Your Story</h3>
                <p className="text-muted-foreground">Write your narrative in a familiar text message format.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Share with Readers</h3>
                <p className="text-muted-foreground">Publish your story and reach a wide audience.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Engage and Connect</h3>
                <p className="text-muted-foreground">Interact with readers through comments and likes.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Your Story Today</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community of storytellers and readers. Create your first SMS story and connect with an
                  audience eager for bite-sized, engaging narratives.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 SMSStory. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}