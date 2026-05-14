const express = require("express")

const router = express.Router()

const {
   testController,
} = require("../controllers/logController")

router.get("/", testController)

module.exports = router
