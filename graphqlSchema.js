var models = require('./models');
import {resolver, attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLString} from 'graphql';
import {_} from 'underscore';


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
  fields: _.assign(attributeFields(models.User), {
    tasks: {
      type: new GraphQLList(taskType),
      resolve: resolver(models.User.Tasks, {
        separate: false // load seperately, disables auto including - default: false
      })
    }
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
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
      },
      users: {
        // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
        type: new GraphQLList(userType),
        args: {
          // An arg with the key limit will automatically be converted to a limit on the target
          limit: {
            type: GraphQLInt
          },
          // An arg with the key order will automatically be converted to a order on the target
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(models.User)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      createUser: {
        type: userType,
        args: {
          username: {
            description: 'A username for the user',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        description: 'Creates a new user',
        resolve: function(obj, {username}) {
          return models.User.create({
            username: username
          });
        }
      }
    }
  })
});



module.exports = schema;
