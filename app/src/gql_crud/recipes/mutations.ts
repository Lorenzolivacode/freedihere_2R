import { gql } from "@apollo/client";

export const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $name_recipe: String!
    $recipe_note: String
    $id_subs: [String!]!
    $details: [recipeDetailInput!]!
    $total_weight_raw: Float!
    $total_weight_cooked: Float
    $conversion_perc: Float
  ) {
    createRecipe(
      name_recipe: $name_recipe
      recipe_note: $recipe_note
      id_subs: $id_subs
      details: $details
      total_weight_raw: $total_weight_raw
      total_weight_cooked: $total_weight_cooked
      conversion_perc: $conversion_perc
    ) {
      id
      name_recipe
    }
  }
`;
