const { gql } = require("apollo-server-express");

module.exports = gql `
    type Comment {
        id: Int!
        content: String!
        author: User!
        post: Post!
        createdAt: String
    }

    extend type Mutation {
        createComment(content: String!, post_id: Int!): CreateCommentResponse
    }

    type CreateCommentResponse {
        id: Int!
        content: String!
        createdAt: String!
    }
`;