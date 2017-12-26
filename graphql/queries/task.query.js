import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {attributeFields, resolver} from "graphql-sequelize";
import {_} from "underscore";

var taskType = require('../types/task.type')
var models = require('../../models')

var task = {
    type: taskType,
    // args will automatically be mapped to `where`
    args: {
        id: {
            description: 'id of the task',
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: resolver(models.Task, {
        include: false // disable auto including of associations based on AST - default: true
    })

};

module.exports = task;
