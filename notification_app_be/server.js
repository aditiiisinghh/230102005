const express = require("express")
const vehicleRoutes = require("./routes/vehicleRoutes")
const app = express()

app.use(express.json())

const logRoutes = require("./routes/logRoutes")

app.use("/test", logRoutes)
app.use("/api", vehicleRoutes)
const PORT = 5000

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`)
})
