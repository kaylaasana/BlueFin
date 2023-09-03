const { GraphQLError } = require("graphql");
// require JWT
const jwt = require("jsonwebtoken");

// creating secret for  web token (stored in .env)
const secret = process.env.MY_SECRET;
// creating expiration for web token
const expiration = "2h";

module.exports = {
  // error handling for authentication
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  // setting up web token
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
