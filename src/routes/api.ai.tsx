// src/routes/ai.ts

import { GoogleGenAI } from "@google/genai";
import { createFileRoute } from "@tanstack/react-router";

const apiKey = process.env.API_KEY;
if (!apiKey) {
	throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({
	apiKey,
});

export const Route = createFileRoute("/api/ai")({
	server: {
		handlers: {
			GET: async () => {
				return Response.json({
					message: "Hello from the AI route!",
				});
			},

			POST: async ({ request }) => {
				const { message, history = [] } = await request.json();

				if (!message || typeof message !== "string") {
					return Response.json(
						{
							error: 'Missing "message" string in request body',
						},
						{ status: 400 },
					);
				}

				type HistoryMessage = {
					role: "user" | "assistant";
					content: string;
				};

				const contents = [
					...history.map((msg: HistoryMessage) => ({
						role: msg.role === "assistant" ? "model" : "user",
						parts: [
							{
								text: msg.content,
							},
						],
					})),

					{
						role: "user",
						parts: [
							{
								text: message,
							},
						],
					},
				];

				const result = await ai.models.generateContentStream({
					model: "gemini-3.6-flash",
					contents,
				});

				const encoder = new TextEncoder();

				const stream = new ReadableStream({
					async start(controller) {
						try {
							for await (const chunk of result) {
								controller.enqueue(encoder.encode(chunk.text ?? ""));
							}

							controller.close();
						} catch (err) {
							controller.error(err);
						}
					},
				});

				return new Response(stream, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
					},
				});
			},
		},
	},
});
