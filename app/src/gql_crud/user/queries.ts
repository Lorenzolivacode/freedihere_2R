import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      surname
      nickname
      password
    }
  }
`;

export const GET_USERDATA_BASE = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      name
      surname
      nickname
      role
      birthday
      email
      height
      sex
    }
  }
`;

// Dati fisici dell'utente (peso, misure) — usa la relazione dataUser sull'oggetto User
export const GET_DATA_USER_LIST = gql`
  query GetDataUserList($userId: String!) {
    user(id: $userId) {
      id
      dataUser {
        id
        weight
        waistline
        crew_neck
        chest
        arm
        thigh
        calf
        fat_mass
        BMI
        day
      }
    }
  }
`;
