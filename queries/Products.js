import { gql } from '@apollo/client';
import { ProductFragment } from '../fragments/Product';

export const GET_PRODUCTS = gql`
 query GetProducts {
  products(first: 10) {
    nodes {
      id
      name
      description
      sku
      image {
        url: sourceUrl
        altText
      }
      ... on Product {
        featuredImage {
          node {
            url: sourceUrl
            altText
          }
        }
      }
      ... on ProductWithPricing {
        price
      }
    }
  }
}
`;
// ${ProductFragment}
// query GetProducts($reverse: Boolean, $sortKey: ProductSortKeys) {
//   products(first: 250, reverse: $reverse, where: { orderby: { field: $sortKey, order: $reverse ? DESC : ASC } }) {
//     nodes {
//     ...ProductFragment
//     }
//   }
// }
// //alternativ query:
// query GetProducts {
//   products(first: 250) {
//     nodes {
//     ...ProductFragment
//     }
//   }
// }
// query GetProducts($reverse: Boolean, $sortKey: ProductSortKeys) {
//   products(first: 250, reverse: $reverse, sortKey: $sortKey) {
//     nodes {
//       ...ProductFragment
//     }
//   }
// }
export const GET_PRODUCT = gql`
  ${ProductFragment}
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductFragment
    }
  }
`;
/*export const GET_PRODUCT = gql`
  ${ProductFragment}
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;*/
export const SEARCH_PRODUCT = gql`
  ${ProductFragment}
  query SearchProduct($search: String!) {
    products(where: { search: $search }) {
      nodes {
        ...ProductFragment
      }
    }
  }
`;
/*export const SEARCH_PRODUCT = gql`
  ${ProductFragment}
  query SearchProduct($query: String!) {
    products(first: 250, query: $query) {
      nodes {
        ...ProductFragment
      }
    }
  }
`;*/
