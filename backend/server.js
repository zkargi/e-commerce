const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const mainRoute = require("./routes/index.js");
const port = 5173;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

const corsOptions = {
  origin: 'https://kargideri.vercel.app', // Frontend domain adresiniz
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));





// middlewares
app.use(logger("dev"));
app.use(express.json());//jsona çevirmöe
app.use(cors());

app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
