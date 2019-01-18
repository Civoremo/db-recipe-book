
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {name: 'cheese pizza', dish_id: 1},
        {name: 'veggie pizza', dish_id: 1},
        {name: 'chicken taco', dish_id: 2},
        {name: 'beef taco', dish_id: 2},
        {name: 'sourdough bread', dish_id: 3},
        {name: 'cuban bread', dish_id: 3}
      ]);
    });
};
