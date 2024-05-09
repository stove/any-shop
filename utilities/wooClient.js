import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const woocommerceClient = new ApolloClient({
  link: new createHttpLink({
    uri: process.env.NEXT_PUBLIC_WOO_GRAPHQL_URL, // Replace with your WooCommerce GraphQL API URL
    // uri: 'https://your-woocommerce-store.com/graphql', // Replace with your WooCommerce GraphQL API URL
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WOOCOMMERCE_ACCESS_TOKEN}`, // Replace with your WooCommerce access token
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});

export default woocommerceClient;