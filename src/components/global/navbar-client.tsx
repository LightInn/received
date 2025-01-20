"use client";
import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";

export default function NavbarClient() {


    return (
        <>
            <Button variant="ghost" className="text-purple-600 font-medium">
                Try Premium
            </Button>


            <SignedOut>
                <SignInButton>
                    <Button variant="ghost">Log in</Button>
                </SignInButton>
                <SignUpButton>
                    <Button>Sign Up</Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>


        </>
    );
}