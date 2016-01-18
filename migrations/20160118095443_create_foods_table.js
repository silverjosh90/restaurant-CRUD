exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods', function(table){
    table.increments();
    table.string('name');
    table.string('location');
    table.string('state');
    table.string('type');
    table.integer('rating');
    table.string('image');
    table.text('bio');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods');
};
