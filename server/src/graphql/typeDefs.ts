import { gql } from "apollo-server-express";

export const typeDefs = gql`
    
    type Mutation {
        signUp(input: SignUpInput): User!
        signIn(input: SignInInput): User!
        signOut: User!
        apartment(input: ApartmentInput): Apartment!
    }

    type Query {
        hello: String
    }
    
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

    type Apartment {
        _id: ID!
        name: String!
        description: String!
        price: Int!
        numOfRooms: Int!
        image: String!
        imagePublicId: String!
        owner: ID!
        timeSlots: [ApartMentTimeSlot!]!
    }
    
    type ApartMentTimeSlot {
        _id: ID!
        date: String!
        isBooked: Boolean!
        apartmentId: ID!
    }
    
    input ApartmentTimeSlotInput {
        date: String!
        isBooked: Boolean!
    }
    
    input ApartmentInput {
        name: String!
        description: String
        price: Int!
        numOfRooms: Int!
        image: String
        timeSlots: [ApartmentTimeSlotInput!]!
    }
    
`;
