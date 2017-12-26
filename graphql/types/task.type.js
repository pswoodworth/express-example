import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

var models = require('../../models');

var taskType = new GraphQLObjectType({
    name: 'Task',
    description: 'A task',
    // Here we define fields manually.
    // We could use graphql-sequelize's attributeFields if we chose to. (see below)
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the task.',
        },
        title: {
            type: GraphQLString,
            description: 'The title of the task.',
        }
    }
});

module.exports = taskType;
