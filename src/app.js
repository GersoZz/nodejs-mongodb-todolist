import express from "express";
//import exphbs from "express-handlebars";
//import { engine } from "express-handlebars";
import { create } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import path from "path"; //modulo de node
import morgan from "morgan"; //modulo dev para ver las peticiones
const app = express();

app.set("views", path.join(__dirname, "views")); //path.join une direcciones, usamos esto pq las formas cambian dependiendo del SO

/* otra forma, y esta con helpers */
const hbs = create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    inc(value) {
      return parseInt(value) + 1;
    },
    bar() {
      return "BAR!";
    },
  },
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "porciones"),
  defaultLayout: "main",
  extname: ".hbs",
});

app.engine('.hbs',hbs.engine);

/* app.engine(
  ".hbs",
  engine({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "porciones"),
    defaultLayout: "main",
    extname: ".hbs",
  })
); */

app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //para que convierta en JSON lo que se manda x el form
// Routes
app.use(indexRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

export default app;
