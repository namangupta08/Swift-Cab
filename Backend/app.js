const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connecttodb = require('./db/db')
const userRoute = require('./routes/userRoutes')
const cookieparser = require('cookie-parser')

connecttodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser())

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/users' , userRoute)

module.exports = app;
