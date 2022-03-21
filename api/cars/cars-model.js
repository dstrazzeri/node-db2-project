const db = require('../../data/db-config')

const getAll = async () => {
  const rows = await db('cars')
  .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission')

  return rows
}

const getById = async (id) => {
  const [car] = await db('cars')
  .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission')
  .where('id', '=', id)

  return car
}

const create = (car) => {
  return db('cars')
  .insert(car)
  .then(([id]) => getById(id))
}

module.exports = {
  getAll,
  getById,
  create
}