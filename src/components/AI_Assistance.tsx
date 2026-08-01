import { useState } from "react";

export function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function askAI() {
    const response = await fetch("http://localhost:3002/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
      }),
    });

    const data = await response.json();

    setAnswer(data.reply);
  }

  return (
    <div className="p-8 rounded-2xl bg-white shadow-lg max-w-xl">
      <h2 className="text-3xl font-bold mb-4">
        Museum AI Guide
      </h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border p-3 rounded-lg"
        rows={4}
        placeholder="Ask about Indian history..."
      />

      <button
        onClick={askAI}
        className="mt-4 rounded-lg bg-amber-600 px-6 py-3 text-white"
      >
        Ask AI
      </button>

      <div className="mt-6">
        {answer}
      </div>
    </div>
  );
}