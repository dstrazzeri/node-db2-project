exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments()

      tbl.string('vin', 17).notNullable().unique()

      tbl.string('make', 20).notNullable()

      tbl.string('model', 20).notNullable()

      tbl.integer('mileage').unsigned().notNullable()

      tbl.string('title').defaultTo('not specified')

      tbl.string('transmission').defaultTo('not specified')
  })
}

exports.down = async function (knex) {
    // DO YOUR MAGIC
    await knex.schema.dropTableIfExists('cars')
}
