const express = require("express")

const app = express()

app.use(express.json())

const logRoutes = require("./routes/logRoutes")

app.use("/test", logRoutes)

const PORT = 5000

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`)
})
