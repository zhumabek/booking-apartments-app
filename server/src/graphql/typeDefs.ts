import { gql } from "apollo-server-express";

export const typeDefs = gql`

    type SignOutData {
        didRequest: Boolean!
    }
    
    type User {
        id: ID!
        email: String!
        firstName: String! 
        lastName: String! 
        role: String! 
        token: String! 
    }
    
    input SignInInput {
        email: String!
        password: String!
    }
    
    input SignUpInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
    }
    
    type Mutation {
        signUp(input: SignUpInput): User!
        signIn(input: SignInInput): User!
        signOut: SignOutData!
    }
    
    type Query {
        hello: String
    }
`;
