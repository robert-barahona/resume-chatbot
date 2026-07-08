import Anthropic from "@anthropic-ai/sdk"
import { RESUME_CONTEXT } from "@/lib/resume-context"
import type { ChatRequestBody } from "@/types/chatTypes"

const anthropic = new Anthropic()

const SYSTEM_PROMPT = `
You are an AI assistant that answers questions about Roberto Barahona's professional profile.

Today's date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}

Guidelines:
- Use ONLY the information provided in the context below to answer questions.
- DO NOT answer questions about unrelated topics.
- If the question is not related to Roberto's profile, politely say that you can only answer questions about his professional background and redirect the conversation.
- Be friendly and keep your answers concise and to the point.
- For more complex questions that require detail, use bullet points to organize the information clearly and avoid unnecessary filler text.

Context:
${RESUME_CONTEXT}
`

const ERROR_MSG =
	"Sorry, something went wrong while contacting the assistant. Please try again."

export const POST = async (request: Request): Promise<Response> => {
	let body: ChatRequestBody
	try {
		body = await request.json()
	} catch {
		return new Response(JSON.stringify({ error: "Invalid request body." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		})
	}

	const anthropicStream = anthropic.messages.stream({
		model: "claude-sonnet-5",
		max_tokens: 1024,
		thinking: { type: "disabled" },
		system: SYSTEM_PROMPT,
		messages: body.messages,
	})
	const iterator = anthropicStream[Symbol.asyncIterator]()

	// Await the first event outside the ReadableStream so failures that occur
	// before any output (e.g. an invalid API key) can still return a clean
	// JSON error instead of aborting an already-started stream response.
	let first: IteratorResult<Anthropic.Messages.MessageStreamEvent>
	try {
		first = await iterator.next()
	} catch {
		return new Response(
			JSON.stringify({
				error: ERROR_MSG,
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		)
	}

	const encoder = new TextEncoder()
	const textStream = new ReadableStream<Uint8Array>({
		async start(controller) {
			try {
				let result = first
				while (!result.done) {
					const event = result.value
					if (
						event.type === "content_block_delta" &&
						event.delta.type === "text_delta"
					) {
						controller.enqueue(encoder.encode(event.delta.text))
					}
					result = await iterator.next()
				}
			} catch {
				controller.enqueue(encoder.encode(`\n\n${ERROR_MSG}`))
			} finally {
				controller.close()
			}
		},
	})

	return new Response(textStream, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	})
}
