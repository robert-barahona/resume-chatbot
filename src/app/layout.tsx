import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "../styles/globals.css"
import type { FC, PropsWithChildren } from "react"
import { ThemeScript } from "@/components/ui/ThemeScript"
import { cn } from "@/utils/cn"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Roberto Barahona | Resume Chatbot",
	description:
		"Ask an AI assistant about Roberto Barahona's professional profile, tech stack, and experience.",
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
	<html
		lang="en"
		suppressHydrationWarning
		className={cn("h-full bg-bg-primary antialiased", geistSans.variable)}
	>
		<head>
			<ThemeScript />
		</head>
		<body className="flex min-h-full flex-col">{children}</body>
	</html>
)

// biome-ignore lint/style/noDefaultExport: needed for layout
export default RootLayout
