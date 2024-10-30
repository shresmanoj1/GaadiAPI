
exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('id')
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.user_id')
        table.integer('category').unsigned()
        table.foreign('category').references('categories.id')
        table.integer('brand').unsigned()
        table.foreign('brand').references('brands.id')
        table.enum('product',['vechicle','parts','hire']).defaultTo('vehicle')
        table.string('title').notNullable()
        table.string('discription').notNullable()
        table.string('type').unique()
        table.decimal('price').unsigned()
        table.date('make_year').notNullable()
        table.string('condition').notNullable()
        table.string('colour').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products')
  
};
