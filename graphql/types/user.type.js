import {GraphQLList, GraphQLObjectType} from "graphql";
import {attributeFields, resolver} from "graphql-sequelize";
import {_} from "underscore";

var models = require('../../models');
var taskType = require('./task.type')
var userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    // And here, we do use graphql-sequelize's attributeFields to automatically populate fields from
    // our sequelize schema.
    fields: _.assign(attributeFields(models.User), {
        tasks: {
            type: new GraphQLList(taskType),
            resolve: resolver(models.User.Tasks, {
                // When set to false, the query will execute as a JOIN on the database,
                // otherwise, it will make two round-trips.
                separate: false // load seperately, disables auto including - default: false
            })
        }
    })
});

module.exports = userType;
