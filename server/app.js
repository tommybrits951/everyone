require("dotenv").config()
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose")
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const {logger, logEvent} = require("./middleware/logger")
const PORT = process.env.PORT || 9000;
const path = require("path")
const app = express()

connectDB()
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use("/user", require("./routes/userRoutes"))
app.use("/auth", require("./routes/authRoutes"))








mongoose.connection.once("open", () => {
    console.log("connected to mongodb")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}--`)
    })
})
mongoose.connection.on('error', err => {
    console.log(err)
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log")
})