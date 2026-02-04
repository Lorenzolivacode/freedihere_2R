import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query GetBrands {
    getBrands {
      id
      name_brand
    }
  }
`;

export const GET_SHOPS = gql`
  query GetShops {
    getShops {
      id
      name_shop
    }
  }
`;
