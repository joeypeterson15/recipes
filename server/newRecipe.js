import OpenAI from "openai";
const client = new OpenAI();

export async function getNewRecipe(dishName) {
    console.log('dishname:', dishName)
    const response = await client.responses.create(
        model="gpt-4o-2024-08-06",
        input=`Supply an 8 serving quantity for each ingredient needed to make ${dishName}.`,
        text={
            "format": {
                "type": "json_schema",
                "name": "Dish Recipe",
                "schema": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "ingredients": {
                            "type": "array",
                            "name": "string",
                            "quantity": "number",
                            "unitOfMeasure": "string" 
                        },
                    },
                    "required": ["name", "ingredients"],
                    "additionalProperties": False
                },
                "strict": True
            }
        }
    );
    return response
}


// console.log(response.output_text);