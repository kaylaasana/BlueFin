import { Outlet } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import Homepage from "./pages/Homepage";

// create end point for graphQL
const httpLink = createHttpLink({
  uri: "/graphql",
});

// create middleware for JWT token that will attach to every request an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // set up our client to execute the `authLink` middleware prior to making the request to our graphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
