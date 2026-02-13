import { gql } from "@apollo/client";

export const GET_SUBCATEGORIES = gql`
  query GetSubcategories {
    getSubcategories {
      id
      subcategory_name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      category_name
      subcategory {
        id
        subcategory_name
      }
    }
  }
`;
