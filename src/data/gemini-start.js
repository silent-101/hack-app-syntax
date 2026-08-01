import dotenv from "dotenv";
import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isAwaitingResponse = false;

async function run() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  function askAndRespond() {
    if (!isAwaitingResponse) {
      rl.question("You: ", async (msg) => {
        if (msg.toLowerCase() === "exit") {
          rl.close();
          return;
        }

        isAwaitingResponse = true;

        try {
          const result = await chat.sendMessageStream(msg);

          let text = "";

          process.stdout.write("AI: ");

          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            process.stdout.write(chunkText);
            text += chunkText;
          }

          console.log("\n");

          isAwaitingResponse = false;

          askAndRespond();
        } catch (error) {
          console.error(error);
          isAwaitingResponse = false;
          askAndRespond();
        }
      });
    }
  }

  askAndRespond();
}

run();