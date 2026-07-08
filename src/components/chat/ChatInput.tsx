"use client"

import { type FC, type SubmitEventHandler, useState } from "react"

interface ChatInputProps {
	readonly onSend: (text: string) => void
	readonly disabled: boolean
}

export const ChatInput: FC<ChatInputProps> = ({ onSend, disabled }) => {
	const [value, setValue] = useState("")

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		const trimmed = value.trim()
		if (!trimmed || disabled) return
		onSend(trimmed)
		setValue("")
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-auto flex w-full max-w-3xl items-center gap-2 px-4 py-4 sm:px-6"
		>
			<input
				type="text"
				value={value}
				onChange={(event) => setValue(event.target.value)}
				disabled={disabled}
				placeholder="Ask about Roberto..."
				className="flex-1 rounded-xl bg-surface-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none disabled:opacity-60"
			/>
			<button
				type="submit"
				disabled={disabled || !value.trim()}
				className="rounded-xl bg-accent px-4 py-2.5 font-medium text-accent-text text-sm transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-30"
			>
				Send
			</button>
		</form>
	)
}
