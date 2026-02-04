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
