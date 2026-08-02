import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/chat")({
	component: RouteComponent,
});

type Message = {
	id: string;
	role: "user" | "assistant";
	content: string;
};

function RouteComponent() {
	return (
		<div className="min-h-screen bg-[#faf9f6] text-stone-900">
			<ChatBot />
		</div>
	);
}

function ChatBot() {
	const [question, setQuestion] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [streamingAnswer, setStreamingAnswer] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, []);

	async function askAI(customQuestion?: string) {
		const currentQuestion = customQuestion ?? question;

		if (!currentQuestion.trim() || loading) return;

		setQuestion("");
		setError("");
		setLoading(true);
		setStreamingAnswer("");

		setMessages((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				role: "user",
				content: currentQuestion,
			},
		]);

		try {
			const res = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: currentQuestion,
					history: messages,
				}),
			});

			if (!res.ok) {
				throw new Error(`Request failed ${res.status}`);
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
				setStreamingAnswer(finalAnswer);
			}

			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: finalAnswer,
				},
			]);

			setStreamingAnswer("");
		} catch (err) {
			console.error(err);

			setError("Unable to connect to Museum AI.");

			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: "Sorry, something went wrong while generating the response.",
				},
			]);

			setStreamingAnswer("");
		} finally {
			setLoading(false);
		}
	}

	const suggestions = [
		"Tell me about the Taj Mahal",
		"Who was Emperor Ashoka?",
		"Explain the Ajanta Caves",
		"Best museums in Delhi",
	];

	return (
		<div className="flex min-h-screen flex-col">
			{/* Minimal Header */}
			<header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#faf9f6]/90 backdrop-blur-md">
				<div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between">
					<Link
						to="/home"
						className="flex items-center gap-2.5 text-sm font-medium text-stone-700 transition hover:text-stone-950"
					>
						<span className="hidden sm:inline font-boska">Dekho Bharat</span>
					</Link>

					<Link
						to="/"
						className="flex items-center gap-1.5 rounded-full border bg-white px-3.5 py-2 text-xs font-medium text-stone-600 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900"
					>
						<span>←</span>
						<span>Back to Home</span>
					</Link>
				</div>
			</header>

			{/* Main */}
			<main className="flex flex-1">
				<div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 sm:px-6">
					{/* Empty State */}
					{messages.length === 0 && (
						<section className="flex flex-col items-center px-2 pb-8 pt-14 text-center sm:pt-20">
							<h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
								Explore India with AI
							</h1>

							<p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
								Ask about India's history, monuments, art, architecture,
								culture, and people.
							</p>
						</section>
					)}

					{/* Conversation */}
					<div className="flex-1 pb-40 pt-4">
						{messages.length === 0 ? (
							<div className="mx-auto grid max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-2">
								{suggestions.map((suggestion) => (
									<button
										key={suggestion}
										type="button"
										onClick={() => askAI(suggestion)}
										className="rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-left text-sm text-stone-600 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900"
									>
										{suggestion}
									</button>
								))}
							</div>
						) : (
							<div className="mx-auto max-w-3xl space-y-6">
								{messages.map((msg) => (
									<div
										key={msg.id}
										className={`flex ${
											msg.role === "user" ? "justify-end" : "justify-start"
										}`}
									>
										<div
											className={`max-w-[90%] sm:max-w-[78%] ${
												msg.role === "user"
													? "rounded-2xl rounded-br-md bg-stone-900 px-4 py-3.5 text-white"
													: "rounded-2xl rounded-tl-md border border-stone-200 bg-white px-4 py-3.5 text-stone-800 shadow-sm"
											}`}
										>
											<p
												className={`mb-1.5 text-[10px] font-medium uppercase tracking-wider ${
													msg.role === "user"
														? "text-stone-400"
														: "text-stone-400"
												}`}
											>
												{msg.role === "user" ? "You" : "AI Guide"}
											</p>

											<p className="whitespace-pre-wrap text-sm leading-6">
												{msg.content}
											</p>
										</div>
									</div>
								))}

								{loading && (
									<div className="flex justify-start">
										<div className="max-w-[90%] rounded-2xl rounded-tl-md border border-stone-200 bg-white px-4 py-3.5 shadow-sm sm:max-w-[78%]">
											<p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-stone-400">
												AI Guide
											</p>

											{streamingAnswer ? (
												<p className="whitespace-pre-wrap text-sm leading-6">
													{streamingAnswer}
													<span className="ml-1 inline-block h-4 w-1 animate-pulse bg-stone-400 align-middle" />
												</p>
											) : (
												<div className="flex items-center gap-1.5 py-1">
													<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.3s]" />
													<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.15s]" />
													<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400" />
												</div>
											)}
										</div>
									</div>
								)}

								<div ref={bottomRef} />
							</div>
						)}
					</div>
				</div>
			</main>

			{/* Input */}
			<div className="fixed inset-x-0 bottom-0 z-30">
				<div className="mx-auto max-w-4xl px-4 pb-4 sm:px-6">
					<div className="border bg-white rounded-xl p-2">
						<div className="flex items-end gap-2">
							<textarea
								rows={1}
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										askAI();
									}
								}}
								placeholder="Ask about India's history..."
								className="max-h-32 min-h-[48px] flex-1 resize-none rounded-xl border-0 bg-transparent px-3 py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
							/>

							<button
								type="button"
								onClick={() => askAI()}
								disabled={loading || !question.trim()}
								className="flex h-12 shrink-0 items-center justify-center rounded-xl bg-stone-900 px-4 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-30"
								aria-label={loading ? "Thinking" : "Send message"}
							>
								{loading ? (
									<span className="text-xs">...</span>
								) : (
									<span className="text-base">↑</span>
								)}
							</button>
						</div>

						<div className="flex items-center justify-between px-2 pb-1 pt-1">
							<p className="text-[10px] text-stone-400">
								Enter to send · Shift + Enter for new line
							</p>

							<p className="hidden text-[10px] text-stone-400 sm:block">
								AI may make mistakes
							</p>
						</div>
					</div>

					{error && (
						<div className="mx-auto mt-2 w-fit rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-600">
							{error}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
