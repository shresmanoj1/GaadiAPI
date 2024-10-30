
exports.up = function(knex) {
    return knex.schema.createTable('brands', function (table) {
        table.increments('id')
        table.string('name').unique().notNullable()
        table.integer('category').unsigned()
        table.foreign('category').references('categories.id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('brands')
};
