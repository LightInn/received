import Link from "next/link";

import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NavbarClient from "@/components/global/navbar-client";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-[#3195b3]">
          <svg
            width="29"
            height="36"
            viewBox="0 0 29 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.54339 35.3407C0.574525 35.3407 0.492489 32.4917 0.697579 31.0672C0.697579 30.6602 0.574525 29.7241 0.0823087 29.2358C-0.532961 28.6253 2.54339 21.9099 1.31285 20.6889C0.0823088 19.4679 3.77393 13.9735 2.54339 10.3105C1.31285 6.64757 3.77393 4.20561 3.77393 2.98462C3.77393 1.76364 11.1572 1.76364 11.1572 0.542659C11.1572 -0.678324 18.5404 0.542659 20.3862 0.542659C22.232 0.542659 22.232 0.542659 25.9237 6.03708C29.6153 11.5315 27.7695 9.70003 28.3847 11.5315C29 13.363 27.1542 16.4154 26.5389 17.6364C25.9236 18.8574 22.232 19.4679 21.6168 20.0784C21.0015 20.6889 19.771 21.2994 19.1557 22.5203C18.5404 23.7413 20.3862 23.1308 21.0015 23.7413L24.6931 27.4043C25.9236 28.6253 26.5389 28.6253 27.7695 29.8462C29 31.0672 29 31.6777 29 32.8987C29 34.1197 28.3847 34.1197 26.5389 34.7302C24.6931 35.3407 24.6931 34.7302 24.0778 34.7302C23.5856 34.7302 21.8218 33.1022 21.0015 32.2882L14.8488 26.1833L10.5419 21.2994C10.3368 20.4854 10.1727 18.4911 11.1572 17.0259C12.3877 15.1945 12.3877 16.4154 14.8488 16.4154C17.3099 16.4154 16.6946 15.8049 19.1557 13.9735C21.6168 12.142 20.3862 10.921 19.771 7.86856C19.1557 4.8161 17.3099 6.64757 13.6183 5.42659C9.92663 4.20561 11.1572 6.03708 9.31136 6.64757C7.46555 7.25807 9.31136 13.9735 9.31136 15.1945C9.31136 16.4154 8.69609 24.3518 9.31136 27.4043C9.92663 30.4567 10.5419 32.2882 8.69609 34.7302C6.85028 37.1721 5.00447 35.3407 2.54339 35.3407Z"
              fill="#3195b3"
            />
          </svg>
        </Link>
        <Link href={`/library`}>Library</Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium">
           Browse
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Categories</DropdownMenuItem>
            <DropdownMenuItem>What&apos;s Hot</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium">
            Community
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Forums</DropdownMenuItem>
            <DropdownMenuItem>Writers</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search"
            className="w-full pl-8 pr-4 py-2 rounded-md border bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium">
            Write
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Create a Story</DropdownMenuItem>
            <DropdownMenuItem>My Stories</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <NavbarClient />
      </div>
    </nav>
  );
}
