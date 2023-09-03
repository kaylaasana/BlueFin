import { Outlet } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import TrainingRoom from './pages/TrainingRoom'
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
      <TrainingRoom/>
    // </ApolloProvider>
  )
}

export default App
