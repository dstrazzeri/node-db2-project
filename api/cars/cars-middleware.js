const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if (car) {
      req.car = car
      next();
    } else {
      next({
        status:404,
        message: `car with id ${req.params.id} is not found`
      })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) {
    next({
      status: 400,
      message: 'vin is missing'
    })
  } else if (!req.body.make) {
    next({
      status: 400,
      message: 'make is missing'
    })
  } else if (!req.body.model) {
    next({
      status: 400,
      message: 'model is missing'
    })
  } else if (!req.body.mileage) {
    next({
      status: 400,
      message: 'mileage is missing'
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin)
  if (isValidVin === true) {
    next()
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const notUnique = await Cars.checkVin(req.body.vin)
  if (notUnique) {
    next({
      status: 400,
      message: `vin ${req.body.vin} already exists`
    })
  } else {
    next()
  }
}

const errorHandling = (err, req, res, next) => {//eslint-disable-line
  res.status(err.status || 500).json({
    message: `${err.message}`
  })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  errorHandling
}