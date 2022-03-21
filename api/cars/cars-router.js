const express = require('express')

const {
    checkCarId,
    errorHandling,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars-middleware')

const Cars = require('./cars-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(err => {
            next(err)
        })
})

router.use(errorHandling);

module.exports = router;