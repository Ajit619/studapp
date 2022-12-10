const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');

mongoose.connect("mongodb+srv://ajit02:Ajit2002@studentdata.gg1gtrt.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

app.set('view engine', 'ejs');
app.use(express.static('public'))


app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.json());
app.use(express.urlencoded());

const teacherRoutes = require("./routes/teacherlogin")
const studentRoutes = require("./routes/studentlogin");
const Students = require('./models/Students');
app.use("/teacher",teacherRoutes)
app.use("/student",studentRoutes)

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
