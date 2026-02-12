import { gql } from "@apollo/client";

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
