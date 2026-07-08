import { MessageBubble } from "./MessageBubble"

export const TypingIndicator = () => (
	<MessageBubble isUser={false}>
		<div className="flex items-center gap-1">
			<span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
			<span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
			<span className="size-1.5 animate-bounce rounded-full bg-zinc-400" />
		</div>
	</MessageBubble>
)
