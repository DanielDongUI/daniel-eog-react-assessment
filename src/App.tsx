import React from 'react';
import { Provider } from 'react-redux';
import Client from './store/client'
import  {ApolloProvider}  from '@apollo/client'
import DashBoard from "./components/dashboard/DashBoard"
import Subscription from "./components/subscription/Subscription"


const App = () => (
  <ApolloProvider client={Client}>
    <Subscription />
    <DashBoard />

  </ApolloProvider>
);

export default App;
