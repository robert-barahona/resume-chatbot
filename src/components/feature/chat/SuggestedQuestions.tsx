import type { FC } from "react"
import { SuggestedQuestionButton } from "@/components/ui/SuggestedQuestionButton"

const SUGGESTED_QUESTIONS = [
	"What is Roberto's main tech stack?",
	"Has Roberto worked remotely before?",
	"What are Roberto's key achievements?",
	"Does Roberto have experience with AI tools?",
]

interface SuggestedQuestionsProps {
	onSelect: (question: string) => void
}

export const SuggestedQuestions: FC<SuggestedQuestionsProps> = ({
	onSelect,
}) => (
	<div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-2 px-4 py-6 sm:grid-cols-2 sm:px-6">
		{SUGGESTED_QUESTIONS.map((question) => (
			<SuggestedQuestionButton
				key={question}
				question={question}
				onClick={() => onSelect(question)}
			/>
		))}
	</div>
)
