import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {attributeFields, resolver} from "graphql-sequelize";
import {_} from "underscore";

var taskType = require('../types/task.type')
var userType = require('../types/user.type')
var models = require('../../models')

var user = {
    type: userType,
    // args will automatically be mapped to `where`
    args: {
        id: {
            description: 'id of the user',
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: resolver(models.User, {
        include: false // disable auto including of associations based on AST - default: true
    })

};

module.exports = user;
