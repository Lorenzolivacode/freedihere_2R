import { gql } from "@apollo/client";

export const GET_SUBCATEGORIES = gql`
  query GetSubcategories {
    getSubcategories {
      id
      subcategory_name
    }
  }
`;
