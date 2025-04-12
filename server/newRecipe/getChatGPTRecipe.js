import OpenAI from "openai";
import { recipePrompt } from "./ChatGPTPrompts";

const client = new OpenAI();

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