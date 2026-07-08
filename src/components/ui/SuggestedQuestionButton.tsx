import type { FC } from "react"

interface SuggestedQuestionButtonProps {
	readonly question: string
	readonly onClick: () => void
}

export const SuggestedQuestionButton: FC<SuggestedQuestionButtonProps> = ({
	question,
	onClick,
}) => (
	<button
		type="button"
		onClick={onClick}
		className="rounded-xl border border-border bg-surface-primary px-4 py-3 text-left text-sm text-text-primary transition-colors hover:bg-surface-secondary"
	>
		{question}
	</button>
)
