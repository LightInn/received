import {Navbar} from "@/components/global/navbar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <div className="">
            <Navbar/>

            {children}</div>
        </body>
        </html>
    );
}
