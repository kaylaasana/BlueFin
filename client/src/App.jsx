import { useLocation } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Homepage from './pages/Homepage'

function App() {
  // lets you navigate programmatically
  const current = useLocation().pathname

  return (
    <>
      <Homepage/>
    </>

  );
}

export default App
