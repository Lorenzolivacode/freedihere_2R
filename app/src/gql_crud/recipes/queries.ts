import { gql } from "@apollo/client";

export const GET_RECIPES_BY_INPUT = gql`
  query GetRecipesByInput($input: String!, $userId: String) {
    getRecipesByInput(input: $input, userId: $userId) {
      id
      name_recipe
      recipe_note
      join_subs {
        id
        subs {
          id
          subcategory_name
        }
      }
      macros {
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
        total_weight
        conversion_perc
      }
    }
  }
`;

export const GET_RECIPE_DETAILS = gql`
  query GetRecipeById($id: String!) {
    getRecipeById(id: $id) {
      id
      name_recipe
      recipe_note
      join_subs {
        id
        subs {
          id
          subcategory_name
        }
      }
      macros {
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
        total_weight
        conversion_perc
      }
      join_details {
        id
        amount_food_perc
        detail {
          id
          detail_product
          food {
            id
            food
          }
          brand {
            id
            name_brand
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
        }
      }
    }
  }
`;
