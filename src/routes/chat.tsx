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
		<div className="min-h-screen bg-[#EDE7D8]">
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
		void messages;
		void streamingAnswer;
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages, streamingAnswer]);

	async function askAI(customQuestion?: string) {
		const currentQuestion = customQuestion ?? question;

		if (!currentQuestion.trim() || loading) return;

		setQuestion("");
		setError("");
		setLoading(true);
		setStreamingAnswer("");

		// Show the user's message immediately
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
		"🏛 Tell me about the Taj Mahal",
		"🎨 Explain Ajanta Caves",
		"📜 Who was Ashoka?",
		"🗺 Best museums in Delhi",
	];

	return (
		<div className="flex w-full flex-col">
			<div className="mx-auto flex h-full w-full max-w-7xl overflow-hidden rounded-3xl bg-[#F8F4EB] shadow-2xl">
				<div className="flex h-full w-full flex-col">
					<div className="border-b border-stone-200 bg-[#F8F4EB] px-8 py-6">
						<h1 className="text-4xl font-bold text-stone-800">
							🏛 Dekho Bharat AI Guide
						</h1>
						<p className="mt-2 text-stone-500">
							Discover India's history through AI.
						</p>
						<div className="mt-6 flex items-center justify-end gap-1">
							<Link
								to="/"
								activeOptions={{ exact: true }}
								activeProps={{ className: "bg-amber-600 text-white" }}
								className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-all duration-300 hover:bg-amber-100 hover:text-amber-700"
							>
								Home
							</Link>
							<Link
								to="/explore"
								activeProps={{ className: "bg-amber-600 text-white" }}
								className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-all duration-300 hover:bg-amber-100 hover:text-amber-700"
							>
								Museum
							</Link>
							<Link
								to="/gallery"
								activeProps={{ className: "bg-amber-600 text-white" }}
								className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-all duration-300 hover:bg-amber-100 hover:text-amber-700"
							>
								Gallery
							</Link>
							<Link
								to="/chat"
								activeOptions={{ exact: true }}
								activeProps={{ className: "bg-amber-600 text-white" }}
								className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-all duration-300 hover:bg-amber-100 hover:text-amber-700"
							>
								Chat
							</Link>
						</div>
					</div>
					<div
						className="flex-1 overflow-y-auto px-8 py-8"
						style={{ scrollbarWidth: "revert-layer" }}
					>
						{messages.length === 0 && (
							<>
								<h2 className="mb-3 text-3xl font-bold text-stone-800">
									Welcome Explorer 👋
								</h2>
								<p className="mb-8 max-w-xl text-stone-600 leading-8">
									Ask me anything about Indian history, architecture, paintings,
									museums, culture or monuments.
								</p>
								<div className="grid grid-cols-2 gap-4">
									{suggestions.map((item) => (
										<button
											key={item}
											type="button"
											onClick={() => askAI(item)}
											className="rounded-2xl border border-stone-200 bg-white p-5 text-left transition hover:border-amber-500 hover:shadow-lg"
										>
											{item}
										</button>
									))}
								</div>
							</>
						)}
						<div className="mt-10 space-y-8 pb-10">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`flex ${
										msg.role === "user" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`max-w-[75%] rounded-3xl px-6 py-5 shadow-sm
                    ${
											msg.role === "user"
												? "bg-amber-600 text-white"
												: "bg-white text-stone-800 border border-stone-200"
										}
                    `}
									>
										<p className="mb-2 text-sm font-semibold">
											{msg.role === "user" ? "You" : "🏛 Dekho Bharat AI Guide"}
										</p>
										<p className="whitespace-pre-wrap leading-7">
											{msg.content}
										</p>
									</div>
								</div>
							))}
							{loading && (
								<div className="flex justify-start">
									<div className="max-w-[75%] rounded-3xl border border-stone-200 bg-white px-6 py-5 shadow-sm">
										<p className="mb-2 text-sm font-semibold text-stone-700">
											🏛 Museum AI Guide
										</p>
										<p className="whitespace-pre-wrap leading-7">
											{streamingAnswer}
										</p>
									</div>
								</div>
							)}
							<div ref={bottomRef} />
						</div>
					</div>
					<div className="border-t border-stone-200 bg-[#F8F4EB] p-6">
						<div className="flex gap-4">
							<textarea
								rows={2}
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										askAI();
									}
								}}
								placeholder="Ask anything about Indian history..."
								className="flex-1 resize-none rounded-2xl border border-stone-300 bg-white p-4 outline-none focus:border-amber-500"
							/>
							<button
								type="button"
								onClick={() => askAI()}
								disabled={loading}
								className="rounded-2xl bg-amber-600 px-8 font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
							>
								{loading ? "..." : "Send"}
							</button>
						</div>
						{error && <p className="mt-3 text-red-600">{error}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
