/*
//setup apollo client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client with an API endpoint
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://your-woocommerce-site.com/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <MyCartComponent />
    </ApolloProvider>
  );
}
//then
import { gql, useMutation } from '@apollo/client';

const CREATE_CART_MUTATION = gql`
  mutation CreateCart {
    createEmptyCart
  }
`;

function MyCartComponent() {
  const [createCart, { data, loading, error }] = useMutation(CREATE_CART_MUTATION);

  const handleCreateCart = () => {
    createCart().then(response => {
      console.log("Cart created with ID:", response.data.createEmptyCart);
    }).catch(err => {
      console.error("Error creating cart:", err);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  return <button onClick={handleCreateCart}>Create Cart</button>;
}


mutation CreateCart {
  createEmptyCart
}
//add to cart
mutation AddToCart($cartId: ID!, $productId: ID!, $quantity: Int!) {
  addToCart(input: {clientMutationId: $cartId, productId: $productId, quantity: $quantity}) {
    cart {
      contents {
        nodes {
          quantity
          product {
            node {
              name
              id
            }
          }
        }
      }
    }
  }
}
//variables
{
  "cartId": "your-cart-id",
  "productId": "product-database-id",
  "quantity": 1
}
// REMOVE_FROM_CART
mutation RemoveFromCart($cartId: ID!, $cartItemId: ID!) {
  removeFromCart(input: {clientMutationId: $cartId, keys: [$cartItemId]}) {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              name
            }
          }
        }
      }
    }
  }
}
mutation RemoveFromCart($cartId: ID!, $cartItemId: ID!) {
  removeFromCart(input: {clientMutationId: $cartId, keys: [$cartItemId]}) {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              name
            }
          }
        }
      }
    }
  }
}
//variables
{
  "cartId": "your-cart-id",
  "cartItemId": "item-key"
}
// UPDATE_CART_QUANTITY
mutation UpdateCartQuantity($cartId: ID!, $cartItemId: ID!, $quantity: Int!) {
  updateItemQuantities(input: {clientMutationId: $cartId, items: [{key: $cartItemId, quantity: $quantity}]}) {
    cart {
      contents {
        nodes {
          quantity
          product {
            node {
              name
            }
          }
        }
      }
    }
  }
}
//variables
{
  "cartId": "your-cart-id",
  "cartItemId": "item-key",
  "quantity": 2
}
//5. RETRIEVE_CART
query GetCart($cartId: ID!) {
  cart(cartKey: $cartId) {
    contents {
      nodes {
        key
        quantity
        product {
          node {
            name
            id
          }
        }
        total
      }
    }
    appliedCoupons {
      code
    }
    subtotal
    total
  }
}
//variables
{
  "cartId": "your-cart-id"
}

*/
