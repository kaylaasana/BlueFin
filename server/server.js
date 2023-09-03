/**
 * Uncomment stuff when models and schemas are ready
 * Also the auth
 */

/**
 * Server set up
 */
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
// const { authMiddleware } = require('./utils/auth');

/**
 * Database setup
 */
// const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

/**
 * Apollo Server
 */
const startApolloServer = async () => {
//   await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
//   app.use('/graphql', expressMiddleware(server, {
//     context: authMiddleware
//   }));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    //   console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
