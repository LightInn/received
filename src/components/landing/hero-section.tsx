import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/*<div className="absolute top-0 right-0 w-1/2 h-full bg-[#3195b3] rounded-bl-[100px]" />*/}
      {/*<div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#3195b3] rounded-tr-[100px]" />*/}

      <div className="container relative mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold text-[#3195b3]">
            Hi, we&apos;re Received.
          </h1>
          <h2 className="text-3xl font-semibold">
            The world&apos;s smallest storytelling community
          </h2>
          <p className="text-lg text-muted-foreground">
            Home to 0 million people¹ who love original stories, Received has
            not democratized storytelling for a new generation of diverse Gen Z
            writers and their fans.
          </p>
          <p className="text-sm text-muted-foreground">
            ¹As of the quarter ended June 30, 2024
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-[#3195b3] hover:bg-[#3195b3]/90">
              Start Reading
            </Button>
            <Button size="lg" variant="outline">
              Start Writing
            </Button>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/landing/hero-devices.png"
            alt="Received platform preview"
            width={800}
            height={600}
            className="relative z-10"
          />
        </div>
      </div>
    </div>
  );
}
