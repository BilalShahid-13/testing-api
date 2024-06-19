require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
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

// use schema

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// get data
// app.get("/get", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users", error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// });

app.get("/get:id", (res, req) => {
  const id = res.params.id;
  return req.status(200).send({ msg: "your id is " + id });
});

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
