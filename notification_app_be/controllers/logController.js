const Log = require("../../logging_middleware/logger")

const testController = async (req, res) => {

   try {

      await Log(
         "backend",
         "info",
         "controller",
         "Test API called successfully"
      )

      res.status(200).json({
         success: true,
         message: "API working",
      })

   } catch (error) {

      await Log(
         "backend",
         "error",
         "controller",
         error.message
      )

      res.status(500).json({
         success: false,
         message: error.message,
      })
   }
}

module.exports = {
   testController,
}
