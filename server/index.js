const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to db");
})


app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});