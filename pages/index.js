import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { ApolloProvider } from '@apollo/client';
import { ShopifyCartProvider } from '../hooks/useShopifyCart';
// import shopifyClient from '../utilities/shopifyClient';
import shopifyClient from '../utilities/wooClient';
import { GET_PRODUCTS } from '../queries/Products';
// import shopifyConfiguration from '../utilities/shopifyConfiguration';
import shopifyConfiguration from '../utilities/wooConfiguration';

export default function Page(props) {
  return (
    <ApolloProvider client={shopifyClient}>
      <ShopifyCartProvider>
        <WordPressTemplate {...props} />
      </ShopifyCartProvider>
    </ApolloProvider>
  );
}

export async function getStaticProps(ctx) {
  const staticProps = await getWordPressProps({ ctx, revalidate: 5 });
  //console.log("staticProps = ", JSON.stringify(staticProps, null, 2));


  if (shopifyConfiguration.available()) {
    console.log("CONFIG AVAILABLE: ", JSON.stringify(shopifyConfiguration, null, 2));
    let data;
    try {
      const response = await shopifyClient.query({ query: GET_PRODUCTS });
      data = response.data;
      console.log("data is available= ", data);
      console.log(JSON.stringify(data.products.nodes, null, 2));
    } catch (error) {
      console.error("Error during fetch: ", error);
    }

    if (data) {
      const { products } = data;

      if (staticProps.props && products.nodes.length) {
        staticProps.props.products = products.nodes;
      }
    }
  }

  return staticProps;
}
