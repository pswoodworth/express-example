import {
    graphql,
    GraphQLSchema,
    GraphQLString,
    GraphQLObjectType
} from 'graphql';

import * as queries from './queries';
import * as mutations from './mutations';

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: queries
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: mutations
    })
});

module.exports = schema;
