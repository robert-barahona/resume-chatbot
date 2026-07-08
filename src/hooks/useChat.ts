import { useEffect, useRef, useState } from "react"
import {
	MESSAGE_REVEAL_CHARS_PER_TICK,
	MESSAGE_REVEAL_INTERVAL_MS,
} from "@/config/constants"
import type { ChatbotMessage } from "@/types/chatTypes"

const ERROR_MESSAGE =
	"Sorry, I ran into a problem answering that. Please try again."

export const useChat = () => {
	const [messages, setMessages] = useState<ChatbotMessage[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const revealIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const stopReveal = () => {
		if (revealIntervalRef.current === null) return
		clearInterval(revealIntervalRef.current)
		revealIntervalRef.current = null
	}

	useEffect(() => {
		return () => {
			if (revealIntervalRef.current === null) return
			clearInterval(revealIntervalRef.current)
		}
	}, [])

	const updateLastAssistantMessage = (content: string) =>
		setMessages((prev) => {
			const updated = [...prev]
			updated[updated.length - 1] = { role: "assistant", content }
			return updated
		})

	const sendMessage = async (text: string) => {
		if (isLoading) return

		stopReveal()

		const history: ChatbotMessage[] = [
			...messages,
			{ role: "user", content: text },
		]
		setMessages([...history, { role: "assistant", content: "" }])
		setIsLoading(true)

		let fullText = ""
		let revealedLength = 0
		let isStreamComplete = false

		const finishIfCaughtUp = () => {
			if (!isStreamComplete || revealedLength < fullText.length) return
			stopReveal()
			setIsLoading(false)
		}

		revealIntervalRef.current = setInterval(() => {
			if (revealedLength >= fullText.length) return
			revealedLength = Math.min(
				revealedLength + MESSAGE_REVEAL_CHARS_PER_TICK,
				fullText.length,
			)
			updateLastAssistantMessage(fullText.slice(0, revealedLength))
			finishIfCaughtUp()
		}, MESSAGE_REVEAL_INTERVAL_MS)

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: history }),
			})

			if (!response.ok || !response.body) {
				throw new Error("Request failed")
			}

			const reader = response.body.getReader()
			const decoder = new TextDecoder()

			while (true) {
				const { done, value } = await reader.read()
				if (done) break
				fullText += decoder.decode(value, { stream: true })
			}
		} catch {
			fullText = ERROR_MESSAGE
			revealedLength = 0
		} finally {
			isStreamComplete = true
			finishIfCaughtUp()
		}
	}

	const lastMessage = messages[messages.length - 1]
	const isWaitingForResponse =
		isLoading && lastMessage?.role === "assistant" && lastMessage.content === ""

	return { messages, isLoading, isWaitingForResponse, sendMessage }
}
