"use client"

import { ChatHeader } from "@/components/feature/chat/ChatHeader"
import { ChatInput } from "@/components/feature/chat/ChatInput"
import { ChatMessages } from "@/components/feature/chat/ChatMessages"
import { SuggestedQuestions } from "@/components/feature/chat/SuggestedQuestions"
import { useChat } from "@/hooks/useChat"

const Home = () => {
	const { messages, isLoading, isWaitingForResponse, sendMessage } = useChat()

	return (
		<main className="flex h-full flex-1 flex-col">
			<ChatHeader />

			<div className="flex h-0 grow flex-col">
				{messages.length === 0 ? (
					<div className="flex flex-1 flex-col items-center justify-center">
						<SuggestedQuestions onSelect={sendMessage} />
					</div>
				) : (
					<ChatMessages
						messages={messages}
						isWaitingForResponse={isWaitingForResponse}
					/>
				)}
			</div>

			<div className="border-border border-t">
				<ChatInput onSend={sendMessage} disabled={isLoading} />
				<p className="mx-auto max-w-3xl px-4 pb-4 text-center text-text-muted text-xs sm:px-6">
					This AI assistant can only answer questions about Roberto&apos;s
					professional profile.
				</p>
			</div>
		</main>
	)
}

// biome-ignore lint/style/noDefaultExport: needed for pages
export default Home
