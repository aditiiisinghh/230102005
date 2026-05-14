const getVehicleData = require("../services/vehicleService")

const Log = require("../../logging_middleware/logger")

const vehicleController = async (req, res) => {

   try {

      await Log(
         "backend",
         "info",
         "controller",
         "vehicle schedule api called"
      )

      const data = await getVehicleData()

      res.status(200).json({
         success: true,
         data
      })

   } catch (error) {

      await Log(
         "backend",
         "error",
         "controller",
         "unable to fetch vehicle schedule"
      )

      res.status(500).json({
         success: false,
         message: "something went wrong"
      })
   }
}

module.exports = vehicleController
