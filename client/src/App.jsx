import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Homepage from './pages/Homepage'

function App() {

  return (
    <>
      <Outlet/>
    </>

  );
}

export default App
