var express = require("express");
var router = express.Router();
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};


/* GET home page. */
router.get("/", function (req, res, next) {
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
      })
  res.send(
    
  );
});

module.exports = router;
