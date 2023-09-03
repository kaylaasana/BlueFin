import { Outlet } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './App.css'

/**
 * Uncomment these when apollo is ready
 */
// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

function App() {

  return (
    // <ApolloProvider client={client}>
      <Outlet/>
    // </ApolloProvider>
  )
}

export default App
