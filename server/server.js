require('./db/config')
const cors = require('cors')
// require('../.env').load()
// require('./db/models/Recipe')
// const {findRecipesByDishName} = require('./db/queries')


// console.log('db url: ', process.env.DATABASE_URL)

const express = require('express')
const app = express()
const router = express.Router()

app.use(cors());

router.get('/', (req, res) => {
    res.send('Hello World')
})


app.get('/search', (req, res) => {
    const dish = req.query.dish;
    console.log('yoooo')
    // const recipes = findRecipesByDishName(dish);
    // try {
    //     console.log(`Found ${recipes.length} matching recipes:`);
    //     console.log(recipes);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    res.json({data: req.query.dish});
      // res.status(200)
      // res.json({'data' : 'hello world'})
})


module.exports = app;
app.listen(process.env.PORT || 3000)
