const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createRoute = require("./routes/create");
const getParentRoute = require("./routes/getParent");
const updateRoute = require("./routes/update");
const deleteRoute = require("./routes/delete");
const getDataRoute = require("./routes/getData");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true}, () => {
    console.log("connected to  mongoDB")
});


//middleware
app.use(express.json());

app.use("/api",createRoute);
app.use("/api", getParentRoute);
app.use("/api", updateRoute);
app.use("/api", deleteRoute);
app.use("/api", getDataRoute);

app.listen(process.env.PORT_NO, () => {
    console.log(`server is running on port number ${process.env.PORT_NO}`)
});

