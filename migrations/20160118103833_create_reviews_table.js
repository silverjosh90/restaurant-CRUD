exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments();
    table.string('name');
    table.date('date');
    table.integer('rating');
    table.text('description');
    table.integer('restaurant_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
