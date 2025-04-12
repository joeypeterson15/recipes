const recipePrompt = (dishName) => { `You are an API that returns only JSON. Do not include any explanation or text outside of the JSON.

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
}

export default recipePrompt;