import {motion, useScroll, useTransform} from "framer-motion";
import Link from "next/link";
import {MessageCircle, Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";


export function Navbar(){


    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const { scrollY } = useScroll()
    const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])

    useEffect(() => {
        setMounted(true)
    }, [])









    return (
        <motion.header
            style={{opacity: headerOpacity}}
            className="px-4 lg:px-6 h-14 flex items-center fixed top-0 left-0 right-0 bg-background z-50"
        >
            <Link className="flex items-center justify-center" href="#">
                <MessageCircle className="h-6 w-6 mr-2"/>
                <span className="font-bold">Received</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/library">
                    Bibliotech
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    Features
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    Pricing
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    About
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/account">
                    Sign In
                </Link>
            </nav>
            <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Theme"
                className="ml-4"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {mounted && (theme === "dark" ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>)}
            </Button>
        </motion.header>
    )
}