import { gql } from "@apollo/client";

export const CREATE_FOOD_DETS = gql`
  mutation CreateFood(
    $food: String!
    $food_note: String
    $id_sub: String!
    $detail_product: String
    $note: String
    $id_brand: String
    $join_shops: [String!]
    $kcal: Decimal!
    $fat: Decimal!
    $sat_fat: Decimal!
    $carbo: Decimal!
    $sugar: Decimal!
    $fiber: Decimal!
    $proteins: Decimal!
    $salt: Decimal!
    $unity_weights: [Decimal!]!
  ) {
    createFood(
      food: $food
      food_note: $food_note
      id_sub: $id_sub
      detail_product: $detail_product
      note: $note
      id_brand: $id_brand
      join_shops: $join_shops
      kcal: $kcal
      fat: $fat
      sat_fat: $sat_fat
      carbo: $carbo
      sugar: $sugar
      fiber: $fiber
      proteins: $proteins
      salt: $salt
      unity_weights: $unity_weights
    ) {
      id
      food
    }
  }
`;
