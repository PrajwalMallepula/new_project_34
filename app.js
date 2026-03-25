const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const productRouter = require("./products");
const categoryRouter = require("./categorys");
const userRouter = require("./users");
const port = 5000;
require('dotenv').config();
const parser = require("body-parser");
app.use(express.json())
app.use(morgan("tiny"));

const api = process.env.API_URL;
app.use(`${api}/products`,productRouter);
app.use(`${api}/category`,categoryRouter);
app.use(`${api}/user`,userRouter);
mongoose.connect(process.env.CONNECTION_API).then(()=>{
       console.log("db connected sucesfully");
})
.catch((err)=>{
       console.log(err,"error");
})
app.listen(port,()=>{
       console.log("Server started");
       console.log(api);
})
