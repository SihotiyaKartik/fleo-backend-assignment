const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createRoute = require("./routes/create");
const getParentRoute = require("./routes/getParent");
const updateRoute = require("./routes/update");

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

app.listen(process.env.PORT_NO, () => {
    console.log(`server is running on port number ${process.env.PORT_NO}`)
});

