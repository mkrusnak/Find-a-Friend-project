const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
    name: String,
    image: String,
    description: String,
    price: Number,
    contactEmail: String,
    seller: String
    }
  );

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;