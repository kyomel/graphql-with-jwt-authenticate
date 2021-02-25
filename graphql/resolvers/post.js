const { post } = require("../../database/models");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    Mutation: {
        async createPost(_, { content, title }, { user = null }){
          try {
            if(!user) {
                throw new AuthenticationError("You must login to create a post!");
            }
            const payload = await post.create({
                user_id: user.id,
                content,
                title,
            })
            return payload
          } catch (err) {
              throw new Error(err.message);
          }   
        }
    }
}