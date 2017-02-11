const db = require('../database');
const Category = require('../models/category');

const Categories = new db.Collection();
Categories.model = Category;
module.exports = Categories;
