const { gql } = require("apollo-server-express");

module.exports = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        password: String!
        posts: [Post!]
    }

    extend type Mutation {
        register(input: RegisterInput!): RegisterResponse
        login(input: LoginInput!): LoginResponse
    }

    type RegisterResponse {
        id: Int!
        name: String!
        email: String!
    }

    type LoginResponse {
        id: Int!
        email: String!
        name: String!
        token: String!
    }

    input RegisterInput {
        id: String!
        name: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }
`;