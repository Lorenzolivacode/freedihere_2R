import { gql } from "@apollo/client";

export const GET_FOODS_BY_INPUT = gql`
  query Query($input: String!) {
    getFoodsByInput(input: $input) {
      id
      food
      food_note
      subcategory {
        id
        subcategory_name
      }
    }
  }
`;

// Ricerca completa con macro, brand, shop e flag approssimazione
export const GET_FOODS_BY_FULL_NAME = gql`
  query GetFoodsByFullName(
    $input: String!
    $id_sub: String
    $id_brand: String
    $id_shop: String
  ) {
    getFoodsByFullName(
      input: $input
      id_sub: $id_sub
      id_brand: $id_brand
      id_shop: $id_shop
    ) {
      id
      food
      food_note
      subcategory {
        id
        subcategory_name
      }
      dets {
        id
        detail_product
        detail_note
        brand {
          id
          name_brand
        }
        join_shops {
          id
          shop {
            id
            name_shop
          }
        }
        macro {
          id
          kcal
          fat
          sat_fat
          carbo
          sugar
          fiber
          proteins
          salt
          isFSApproximated
        }
        specifics {
          id
          unity_weight
        }
      }
    }
  }
`;
