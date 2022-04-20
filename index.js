const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const homeRoutes = require("./routes/home");
const cartRoutes = require("./routes/cart");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views"); // second 'views' - folder name with pages in project!

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/cart", cartRoutes);

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      `mongodb+srv://IlyaYarosh:6gwgy5RIS9PMy8K4@cluster0.6pqvm.mongodb.net/ITCoursesBase`;
    await mongoose.connect(url, { useNewUrlParser: true });
    app.listen(PORT, () => { 
      console.log(`Sever is runnin on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();