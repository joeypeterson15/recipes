import dotenv from "dotenv";
import OpenAI from "openai";
import recipePrompt from "./ChatGPTPrompts.js";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function getChatGPTRecipe(dishName) {   
    
    const prompt = recipePrompt(dishName)

    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.7,
    });

    const recipe = JSON.parse(response.choices[0].message.content);

    return recipe
}
