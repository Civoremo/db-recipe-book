const db = require('../dbConfig.js');

module.exports = {
    getRecipes,
    addRecipe,
};

function getRecipes() {
    return db('recipes')
        .select('recipes.name as recipe', 'dishes.name as dish')
        .from('recipes')
        .innerJoin('dishes', 'dishes.id', '=', 'recipes.dish_id')
}

function addRecipe(recipe) {
    return db('recipes')
        .insert(recipe)
}