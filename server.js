require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoute = require("./routes/todos");

// express app
const app = express();
// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routers
app.use("/api/todos", todoRoute);

// PORT
const PORT = process.env.PORT || 4000;

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to database & listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
