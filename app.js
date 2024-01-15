var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testAPIRouter = require("./routes/testAPI");
var cloudinary = require("./routes/cloudinary");
var graphql = require("./routes/graphql");
var datas = require("./datas.json")

const { log } = require("console");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/testAPI", testAPIRouter);
app.use("/users", usersRouter);
app.use("/cloudinary", cloudinary);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Author {
    name: String
  }

  type Songs {
    name: String
    year: Int
    author: Author
    genre: String
  }

  type Query {
    search(searchKey: String): [Songs]
  }
`)

// The root provides a resolver function for each API endpoint
// The root provides the top-level API endpoints
var root = {
  search: ({ searchKey }) => {
    return datas.songs.filter((obj) =>
    Object.values(obj).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(searchKey.toLowerCase()),
    ),
  );
  },
}

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
