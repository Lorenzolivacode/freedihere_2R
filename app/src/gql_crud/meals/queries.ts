import { gql } from "@apollo/client";

// Pasti per un diary specifico (il backend usa id_diary)
export const GET_MEALS_BY_DIARY = gql`
  query GetMealsByDiary($id_diary: String!) {
    meals(id_diary: $id_diary) {
      id
      meal_name
      join_meal_food {
        id
        weight
        detail {
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
  }
`;
