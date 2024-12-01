const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const empRoute = require("./routes/employeeRoute");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/mydatabase";

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors({ credentials: true, origin: true }));

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use("/api/v1/user", userRoute);
app.use("/api/v1/emp/employees", empRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
