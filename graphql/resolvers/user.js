const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../../database/models");
const token = require("../../helpers/token");

module.exports = {
    Mutation: {
        async register(root, args, context) {
            try {
                const { name, email, password } = args.input;
                const payload = await user.create({
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10)
                })
                return payload;
            } catch (err) {
                console.log(err)
            }
        },

        async login(root, { input }, context) {
            try {
                const { email, password } = input;
                const findUser = await user.findOne({
                    where: { email }
                })
                if (!findUser) {
                    throw new Error("Oops user they don't registered!!!")
                }
                const isValid = await bcrypt.compareSync(password, findUser.password);
                if(!isValid) {
                    throw new Error("Incorrect password!");
                }
                const gettoken = await token(findUser);
                return { ...findUser.toJSON(),token: gettoken }
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}
