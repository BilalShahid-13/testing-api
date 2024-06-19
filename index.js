require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://bcsmf21249:pvcvh38rXay3Wxl7@mernclustor.qf3zmjk.mongodb.net/MERNDB?retryWrites=true&w=majority&appName=MernClustor";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log("Server is running on port", port);
    });

    app.get("/get:id", (req, res) => {
      const id = req.params.id;
      return res.status(200).send({ msg: "Your ID is " + id });
    });

    // Routes
    app.get("/", (req, res) => {
      return res.status(200).send({ msg: "Home Get" });
    });

    app.get("/about", (req, res) => {
      return res.status(200).send({ msg: "About page" });
    });

  })
  .catch((e) => {
    console.error("MongoDB connection error:", e);
  });

// Schema definition
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Example get data route
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
