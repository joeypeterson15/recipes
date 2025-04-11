// const mongoose = require('mongoose');
import mongoose from 'mongoose'


const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [{
    name: String,
    quantity: Number,
    unitOfMeasure: String
  }]
});

// module.exports = mongoose.model('Recipe', recipeSchema);
export default mongoose.model('Recipe', recipeSchema);