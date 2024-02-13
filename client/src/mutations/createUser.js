import {gql} from '@apollo/client';

//$input - описали тип инпута

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
      createUser(input: $input) {
        id, name, age
      }
  }
`;