const express = require("express")

const router = express.Router()

const getVehicleData = require("../controllers/vehicleController")

router.get("/schedule", getVehicleData)

module.exports = router