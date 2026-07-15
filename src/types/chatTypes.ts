type MessageRole = "user" | "assistant"

export interface ChatbotMessage {
	role: MessageRole
	content: string
}

export interface ChatRequestBody {
	messages: ChatbotMessage[]
}
