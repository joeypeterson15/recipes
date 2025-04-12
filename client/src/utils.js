export const recipes2GroceryList = (savedRecipes) => {
    let ingredientMap = {}
    for (let i = 0; i < savedRecipes.length; i++) {
      const ingredients = savedRecipes[i].ingredients
        for (let j = 0; j < ingredients.length; j++) {
          let ingredient = ingredients[j]
          if (!ingredientMap[ingredient.name]) {
            ingredientMap[ingredient.name] = {
              quantity: ingredient.quantity, 
              unitOfMeasure: ingredient.unitOfMeasure
            }
          } else {
            ingredientMap[ingredient.name].quantity += ingredient.quantity
          }
        }
    }
    
    return Object.entries(ingredientMap).map(([name, object]) => {
      return { 
        ingredient: name,
        unit: object.unitOfMeasure,
        quantity: object.quantity
      }
    })

}