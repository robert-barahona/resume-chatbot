import Image from "next/image"
import Link from "next/link"
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton"

export const ChatHeader = () => (
	<header className="border-border border-b px-4 py-4 sm:px-6">
		<div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6">
			<div className="flex flex-col">
				<h1 className="font-semibold text-base text-text-primary">
					Roberto Barahona
				</h1>
				<p className="text-sm text-text-secondary">Senior Frontend Engineer</p>
			</div>
			<div className="flex items-center gap-2">
				<ThemeToggleButton />
				<Link
					className="ms-4"
					href="https://www.linkedin.com/in/robert-barahona"
				>
					<Image
						className="dark:invert"
						src="/linkedin.svg"
						alt="Linkedin logo"
						width={30}
						height={30}
					/>
				</Link>
				<Link href="https://github.com/robert-barahona/resume-chatbot">
					<Image
						className="dark:invert"
						src="/github.svg"
						alt="Github logo"
						width={30}
						height={30}
					/>
				</Link>
			</div>
		</div>
	</header>
)
