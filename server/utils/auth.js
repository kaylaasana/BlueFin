const { GraphQLError } = require('graphql');
// require JWT
const jwt = require('jsonwebtoken');

// creating secret for  web token
const secret = 'mysecretssshhhhhhh';
// creating expiration for web token
const expiration = '2h';

module.exports = {
  // error handling for authentication
  AuthenticationError: new GraphQLError('Incorrect email or password', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    // storing the token in 'token' if it comes from req.body, req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // use string and trim methods to split the token into an array if it's coming form headers
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // add the decoded user's data to the request if it is verified
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.error(error);
    }

    return req;
  },
  // setting up web token
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
