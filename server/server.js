require('./db/config')

const express = require('express')
const app = express()
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(process.env.PORT || 3000)