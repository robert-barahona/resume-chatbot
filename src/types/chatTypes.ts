type MessageRole = "user" | "assistant"

export type ChatbotMessage = {
	role: MessageRole
	content: string
}

export type ChatRequestBody = {
	messages: ChatbotMessage[]
}
