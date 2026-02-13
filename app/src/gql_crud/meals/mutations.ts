import { gql } from "@apollo/client";

// Crea un pasto all'interno di un diary esistente
export const CREATE_MEAL = gql`
  mutation CreateUserMeal(
    $meal_name: String!
    $mealSnapshot: String!
    $id_diary: String!
    $mealFood: [mealFoodInputInput!]!
  ) {
    createUserMeal(
      meal_name: $meal_name
      mealSnapshot: $mealSnapshot
      id_diary: $id_diary
      mealFood: $mealFood
    ) {
      id
      meal_name
    }
  }
`;

// Crea il primo pasto del giorno insieme al DiaryUser
export const CREATE_DIARY_WITH_MEAL = gql`
  mutation CreateDiaryUserByMeal(
    $aspected_kcal: String!
    $day: String!
    $id_fase_specific: String!
    $meal_name: String!
    $mealSnapshot: String!
    $mealFood: [mealFoodInputInput!]!
  ) {
    createDiaryUserByMeal(
      aspected_kcal: $aspected_kcal
      day: $day
      id_fase_specific: $id_fase_specific
      meal_name: $meal_name
      mealSnapshot: $mealSnapshot
      mealFood: $mealFood
    ) {
      id
      day
      aspected_kcal
    }
  }
`;
