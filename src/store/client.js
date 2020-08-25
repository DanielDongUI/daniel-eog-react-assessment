import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,

} from '@apollo/client'

//import { getLastKnownMeasurementQuery } from './queries';

const wsLink = new WebSocketLink({ //subcriptions
    uri: 'wss://react.eogresources.com/graphql',
    options: {
      reconnect: true,
    },
  });

const httpLink = new HttpLink({ // querys
  uri: 'https://react.eogresources.com/graphql',
});


const link = split(
    //split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache()

});



