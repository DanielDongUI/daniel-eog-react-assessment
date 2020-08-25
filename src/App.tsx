import React from 'react';
import Client from './store/client'
import  {ApolloProvider}  from '@apollo/client'
import Subscription from "./components/subscription/Subscription"
import MainPage from './components/MainPage'



const App = () => (
  <ApolloProvider client={Client}>
    <Subscription />
    <MainPage />
  </ApolloProvider>
);

export default App;
