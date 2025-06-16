import { GoogleGenAI } from "@google/genai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function send(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
  });
  return response.text;
}

function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    })
  );
}

async function chat() {
  let text = "";
  console.log("Welcome to your GenAI Chat!");
  console.log("Type 'exit' to quit.");

  while (text.toLowerCase() !== "exit") {
    text = await promptUser("You: ");
    if (text.toLowerCase() !== "exit"){
        try {
            const reply = await send(text);
            console.log(`GenAI: ${reply}`);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
    
  }

  console.log("Chat ended.");
}

chat();
