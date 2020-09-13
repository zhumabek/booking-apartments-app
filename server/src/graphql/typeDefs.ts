import { gql } from "apollo-server-express";

export const typeDefs = gql`    
    
    type User {
        _id: ID
        email: String
        firstName: String 
        lastName: String 
        role: String 
        token: String
        didRequest: Boolean!
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
        signOut: User!
    }
    
    type Query {
        hello: String
    }
`;
