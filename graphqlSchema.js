var models = require('./models');
import {resolver} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLString} from 'graphql';


let taskType = new GraphQLObjectType({
  name: 'Task',
  description: 'A task',
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

let userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    username: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    tasks: {
      type: new GraphQLList(taskType),
      resolve: resolver(models.User.Tasks, {
        separate: false // load seperately, disables auto including - default: false
      })
    }
  }
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        description: 'A user',
        // args will automatically be mapped to `where`
        args: {
          id: {
            description: 'id of the user',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: resolver(models.User, {
          include: true // disable auto including of associations based on AST - default: true
        })
      }
    }
  })
});

module.exports = schema;
