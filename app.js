
const express = require("express");
//const cors = require('cors'); // 1. Import it

// 2. Enable it for ALL origins (this is the magic line)

// ... your existing routes like app.get('/api/v1/products' ...)
const app = express();
//app.use(cors()); 
const mongoose = require("mongoose");
const morgan = require("morgan");
const productRouter = require("./Server/products");
const categoryRouter = require("./Server/categorys");
const userRouter = require("./Server/users");
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