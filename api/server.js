const express = require("express")
const carsRouter = require('./cars/cars-router')
const server = express()

server.use(express.json())
server.use('/api/cars', carsRouter)

server.get('/', (err, req, res) => {
    res.send(err.status || 500).json({
        message: err.json
    })
})

module.exports = server
