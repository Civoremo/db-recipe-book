const db = require('../dbConfig.js');

module.exports = {
    getDishes,
    getDish,
    addDish,
};

function getDishes() {
    return db('dishes')
        .select('id', 'name')
        .orderBy('id')
}

function getDish(id) {
    return db
        .select('dishes.name as dish', 'recipes.name as recipes')
        .from('dishes')
        .innerJoin('recipes', 'dishes.id', '=', 'recipes.dish_id')
        .where('dishes.id', id)
}

function addDish(dish) {
    return db('dishes')
        .insert(dish)
}