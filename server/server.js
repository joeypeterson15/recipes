import express from 'express';
import cors from 'cors';
// import './db/config.js';
import { findRecipesByDishName } from './db/queries.js';
import saveNewRecipe from './newRecipe/saveNewRecipe.js';
import { getChatGPTRecipe } from './newRecipe/getChatGPTRecipe.js';

const app = express()
const router = express.Router()

app.use(cors());

// router.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.get('/search', async (req, res) => {
    const dish = req.query.dish;
    const submit = req.query.submit;
    // const recipes = await findRecipesByDishName(dish);
    let recipe = await getChatGPTRecipe(dish)
    // if (dish.length > 0 && recipes.length == 0 && submit == 'y') {
    //     try {
    //         let recipe = await getChatGPTRecipe(dish)
    //         console.log('recipe chatgpt:', recipe)
    //         res.status(201).json(recipe)
    //     } catch(error) {
    //         console.error('error not found:' , error)
    //         res.status(200).send('Dish item not Found')
    //     }
    // } else {
    //     res.status(200).send(recipes)
    // } 

    try {
        const recipe = await getChatGPTRecipe(dish)
        console.log('recipe chatgpt:', recipe)
        await saveNewRecipe(recipe)
        res.status(201).json(recipe)
    } catch(error) {
        console.error('error caught search route:' , error)
        if (err.message === 'Recipe Not Found') {
            res.status(404).json({ error: 'Bad Recipe' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
})


// module.exports = app;
app.listen(process.env.PORT || 3000)
