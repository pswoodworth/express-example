import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {attributeFields, resolver} from "graphql-sequelize";
import {_} from "underscore";

var userType = require('../types/user.type')
var models = require('../../models')

var createUser = {
    type: userType,
    args: {
        username: {
            description: 'A username for the user',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    description: 'Creates a new user',
    resolve: function (obj, {username}) {
        return models.User.create({
            username: username
        });
    }

};

module.exports = createUser;
