import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/chat")({
	component: RouteComponent,
});


function RouteComponent() {
	return (
		<div className="min-h-screen bg-[#EDE7D8] flex items-center justify-center p-6">
			<ChatBot />
		</div>
	);
}


export function ChatBot() {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [history, setHistory] = useState<
		{
			role: "user" | "assistant";
			content: string;
		}[]
	>([]);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");


	async function askAI() {
		if (!question.trim() || isLoading) return;

		const currentQuestion = question;

		setQuestion("");
		setAnswer("");
		setError("");
		setIsLoading(true);


		try {
			const res = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: currentQuestion,
					history,
				}),
			});


			if (!res.ok) {
				throw new Error(
					`Request failed ${res.status}`
				);
			}


			if (!res.body) {
				throw new Error("No response body");
			}


			const reader = res.body.getReader();
			const decoder = new TextDecoder();


			let finalAnswer = "";


			while (true) {
				const { done, value } = await reader.read();


				if (done) break;


				const chunk = decoder.decode(value, {
					stream: true,
				});


				finalAnswer += chunk;


				setAnswer((prev) => prev + chunk);
			}


			// Save conversation
			setHistory((prev) => [
				...prev,
				{
					role: "user",
					content: currentQuestion,
				},
				{
					role: "assistant",
					content: finalAnswer,
				},
			]);


		} catch (err) {
			console.error(err);
			setError(
				"Something went wrong. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	}
	return (
	<div className="
		w-full
		max-w-lg
	"
	>

		<div className="
			mb-10
		">
			<p className="
				font-mono
				text-xs
				tracking-[0.35em]
				uppercase
				text-[#8A4036]
				mb-3
			">
				Museum Guide
			</p>

			<h2 className="
				font-serif
				text-4xl
				text-[#20232B]
				leading-tight
			">
				Ask about India's history
			</h2>
		</div>


		<div className="
			min-h-32
			mb-8
			text-[#20232B]
			font-serif
			text-xl
			leading-relaxed
		">
			{
				answer ||
				<span className="text-[#20232B]/40">
					Explore events, people, and moments that shaped India.
				</span>
			}
		</div>


		<div className="
			border-b
			border-[#20232B]/20
			flex
			items-center
			gap-4
			pb-3
		">

			<textarea
				value={question}
				onChange={(e) =>
					setQuestion(e.target.value)
				}
				rows={1}
				placeholder="Ask a question..."
				className="
					flex-1
					resize-none
					bg-transparent
					outline-none
					text-[#20232B]
					placeholder:text-[#20232B]/40
				"
			/>


			<button
				onClick={askAI}
				disabled={
					isLoading ||
					!question.trim()
				}
				className="
					font-mono
					text-xs
					uppercase
					tracking-widest
					text-[#8A4036]
					disabled:opacity-30
				"
			>
				{
					isLoading
						? "..."
						: "Ask"
				}
			</button>

		</div>


		{
			error && (
				<p className="
					mt-4
					text-sm
					text-red-600
				">
					{error}
				</p>
			)
		}

	</div>
);
}