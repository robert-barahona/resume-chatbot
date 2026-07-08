import type { FC, PropsWithChildren } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/utils/cn"

interface MessageBubbleProps extends PropsWithChildren {
	readonly isUser: boolean
}

export const MessageBubble: FC<MessageBubbleProps> = ({ isUser, children }) =>
	!children ? null : (
		<div
			className={cn(
				"flex w-full flex-row",
				isUser ? "justify-end" : "justify-start",
			)}
		>
			<div
				className={cn(
					"flex min-h-9 max-w-4/5 rounded-2xl px-4 py-2 sm:max-w-3/4",
					isUser
						? "rounded-br-sm bg-accent"
						: "rounded-bl-sm bg-surface-primary",
				)}
			>
				{typeof children === "string" ? (
					<div
						className={cn(
							"space-y-3 text-sm",
							isUser ? "text-accent-text" : "text-text-primary",
						)}
					>
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								ul: ({ children }) => (
									<ul className="list-disc space-y-1 pl-6">{children}</ul>
								),
								ol: ({ children }) => (
									<ol className="list-decimal space-y-1 pl-6">{children}</ol>
								),
								a: ({ children, href }) => (
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="font-normal underline"
									>
										{children}
									</a>
								),
							}}
						>
							{children}
						</ReactMarkdown>
					</div>
				) : (
					children
				)}
			</div>
		</div>
	)
