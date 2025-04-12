import OpenAI from "openai";

const client = new OpenAI();

export async function getChatGPTRecipe(dishName) {   
    
const prompt = `You are an API that returns only JSON. Do not include any explanation or text outside of the JSON.

    Given the dish "${dishName}", return a JSON object with the following structure:

    {
    "name": "Dish Name",
    "ingredients": [
        {
        "name": "Ingredient name",
        "quantity": Number,
        "unitOfMeasure": "Unit"
        }
        // more ingredients...
    ]
    }

    If the dish is not valid, return:
    {
    "name": "Not Found",
    "ingredients": []
    }

    Now respond only with the JSON object for "${dishName}". Do not include \`\`\` or any other text. Supply an 8 serving quantity for each ingredient`;
    
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