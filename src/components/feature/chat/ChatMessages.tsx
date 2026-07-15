"use client"

import { type FC, useEffect, useRef } from "react"
import { MessageBubble } from "@/components/ui/MessageBubble"
import { TypingIndicator } from "@/components/ui/TypingIndicator"
import type { ChatbotMessage } from "@/types/chatTypes"

interface ChatMessagesProps {
	readonly messages: ChatbotMessage[]
	readonly isWaitingForResponse: boolean
}

export const ChatMessages: FC<ChatMessagesProps> = ({
	messages,
	isWaitingForResponse,
}) => {
	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (messages.length === 0) return
		bottomRef.current?.scrollIntoView({ behavior: "auto" })
	}, [messages])

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-3 overflow-y-auto p-4 sm:py-6">
			{messages.map(({ content, role }, index) => (
				<MessageBubble
					// biome-ignore lint/suspicious/noArrayIndexKey: message list is append-only
					key={index}
					isUser={role === "user"}
				>
					{content}
				</MessageBubble>
			))}
			{isWaitingForResponse && <TypingIndicator />}
			<div ref={bottomRef} className="-mt-3" />
		</div>
	)
}
