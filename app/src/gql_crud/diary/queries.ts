import { gql } from "@apollo/client";

// Frammento riutilizzabile per i dati di un pasto
const MEAL_FIELDS = gql`
  fragment MealFields on Meals {
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
`;

export const GET_DIARY_BY_DATE = gql`
  ${MEAL_FIELDS}
  query GetDiaryByDate($userId: String!, $date: String!) {
    getDiaryByDate(userId: $userId, date: $date) {
      id
      aspected_kcal
      day
      fase_specific {
        id
        deltaKcal_perc
        fat_perc
        sat_fat_perc
        carbo_perc
        sugar_perc
        fiber_perc
        proteins_perc
        salt_perc
      }
      meals {
        ...MealFields
      }
    }
  }
`;

export const GET_DIARIES_BY_PERIOD = gql`
  query GetDiariesByPeriod($userId: String!, $from: String!, $to: String!) {
    getDiariesByPeriod(userId: $userId, from: $from, to: $to) {
      id
      aspected_kcal
      day
      meals {
        id
        meal_name
        join_meal_food {
          id
          weight
          detail {
            id
            detail_product
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
  }
`;
