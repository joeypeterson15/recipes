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
    // const response = await client.chat.completions.create({
    //     model: "gpt-4o",
    //     messages: [
    //         {
    //             role: "user",
    //             content: prompt
    //         }
    //     ],
    //     temperature: 0.7,
    // });

    // const recipe = JSON.parse(response.choices[0].message.content);


    // const real_recipe = {
    //     name: 'Chicken Soup',
    //     ingredients: [
    //       { name: 'Chicken breast', quantity: 2, unitOfMeasure: 'pounds' },
    //       { name: 'Carrots', quantity: 4, unitOfMeasure: 'medium' },
    //       { name: 'Celery stalks', quantity: 4, unitOfMeasure: 'stalks' },
    //       { name: 'Onion', quantity: 2, unitOfMeasure: 'medium' },
    //       { name: 'Garlic cloves', quantity: 4, unitOfMeasure: 'cloves' },
    //       { name: 'Chicken broth', quantity: 16, unitOfMeasure: 'cups' },
    //       { name: 'Salt', quantity: 2, unitOfMeasure: 'teaspoons' },
    //       { name: 'Black pepper', quantity: 1, unitOfMeasure: 'teaspoon' },
    //       { name: 'Bay leaves', quantity: 2, unitOfMeasure: 'leaves' },
    //       { name: 'Parsley', quantity: 0.5, unitOfMeasure: 'cup' },
    //       { name: 'Egg noodles', quantity: 4, unitOfMeasure: 'cups' }
    //     ]
    //   }
    const recipe = {
        name: 'Not Found',
        ingredients: []
      }
    if (recipe.name == 'Not Found' && recipe.ingredients.length == 0) {
        throw new Error('Recipe Not Found')
    }
    return recipe
    // return recipe;
}