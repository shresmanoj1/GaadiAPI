
exports.up = function(knex) {
    return knex.schema.createTable('categories', function (table) {
        table.increments('id')
        table.string('name').unique().notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories')
};
