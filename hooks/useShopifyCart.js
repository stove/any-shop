import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useMutation, useLazyQuery } from '@apollo/client';
import CREATE_CART from '../mutations/CreateCart';
import RETRIEVE_CART from '../queries/Cart';
import shopifyClient from '../utilities/shopifyClient';
import ADD_TO_CART from '../mutations/AddToCart';

const ShopifyCartContext = React.createContext({});

export function ShopifyCartProvider({ children }) {
  const [cartData, setCartData] = useState('');

  const cookies = new Cookies();
  const cartToken = cookies.get('atlas-shopify-cart') ?? null;

  const [createCart] = useMutation(CREATE_CART, {
    client: shopifyClient,
  });
  const [retrieveCart] = useLazyQuery(RETRIEVE_CART, {
    variables: { id: cartToken },
    client: shopifyClient,
  });

  useEffect(() => {
    if (cartToken) {
      retrieveCart()
        .then((response) => {
          setCartData(response.data.cart);
        })
        .catch((err) => console.error(err));
    } else {
      createCart({
        variables: { input: {} },
      })
        .then((response) => {
          cookies.set('atlas-shopify-cart', response.data.cartCreate.cart.id);
          setCartData(response.data.cartCreate.cart);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  // add to cart method
  const [addToCart] = useMutation(ADD_TO_CART, {
    client: shopifyClient,
  });

  // remove from cart method

  // create checkout url method

  const cartItems = cartData?.lines?.nodes ?? [];
  const cartCount = cartItems.length;
  const isCartEmpty = cartCount === 0;
  const cartTotal = cartData.cost?.totalAmount.amount ?? 0;
  const cartSubTotal = cartData.cost?.subtotalAmount.amount ?? 0;
  const checkoutUrl = cartData.checkoutUrl;
  const cartId = cartData.id;

  const value = {
    cartItems,
    cartCount,
    isCartEmpty,
    cartTotal,
    cartSubTotal,
    checkoutUrl,
    addToCart,
    retrieveCart,
    setCartData,
    cartId,
  };

  return (
    <ShopifyCartContext.Provider value={value}>
      {children}
    </ShopifyCartContext.Provider>
  );
}

export default function useShopifyCart() {
  const AtlasShopify = useContext(ShopifyCartContext);
  return AtlasShopify;
}
