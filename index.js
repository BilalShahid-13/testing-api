require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;

// middleware
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connection
mongoose
  .connect(
    "mongodb+srv://bcsmf21249:pvcvh38rXay3Wxl7@mernclustor.qf3zmjk.mongodb.net/MERNDB?retryWrites=true&w=majority&appName=MernClustor"
  )
  .then(() => {
    console.log("mongodb connected");
  })

  .catch((e) => {
    console.log("mongodb not connected ->", e);
  });
// dbConnect();

// routers
app.get("/", (req, res) => {
  return res.status(200).send({ msg: "Home Get" });
});

app.get("/about", (req, res) => {
  return res.status(200).send({ msg: "about page" });
});

app.listen(port, () => {
  console.log("port is running", port);
});
