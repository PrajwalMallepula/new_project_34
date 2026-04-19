const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS setup (strong version)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ IMPORTANT: preflight
app.options("*", cors());

const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv").config();

app.use(express.json());
app.use(morgan("tiny"));

const productRouter = require("./products");
const categoryRouter = require("./categorys");
const userRouter = require("./users");

const api = process.env.API_URL || "/api/v1"; // fallback

console.log("API URL:", api);

// ✅ routes
app.use(`${api}/products`, productRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/user`, userRouter);

// DB
mongoose.connect(process.env.CONNECTION_API)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started on", port);
});
