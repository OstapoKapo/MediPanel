
import client from '@/lib/apollo';
import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      id
      email
      
    }
  }
`;

