import express from 'express';
import cors from 'cors';
import './db/config.js';
import { findRecipesByDishName } from './db/queries.js';

const app = express()
const router = express.Router()

app.use(cors());

router.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/search', (req, res) => {
    const dish = req.query.dish;
    const submit = req.query.submit;
    const recipes = findRecipesByDishName(dish);
    try { 
        console.log(`Found ${recipes.length} matching recipes:`);
        console.log(recipes);
      } catch (error) {
        console.error('Error:', error);
      }
    res.status(200).json({data: recipes});
})


// module.exports = app;
app.listen(process.env.PORT || 3000)
