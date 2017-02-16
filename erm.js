var _ = require('lodash');
var Promise = require('bluebird');
var graphql = require('graphql');

var data = {
  users: require('./data/users.json'),
  groups: require('./data/groups.json'),
  roles: require('./data/group-roles.json'),
  members: require('./data/group-members.json'),
}

var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: function() { return {
    users: {
      type: new graphql.GraphQLList(userType),
      resolve: function(context, args, info) {
        return data.users;
      }
    },
    user: {
      type: userType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
          description: 'id of the user'
        }
      },
      resolve: function(contxt, args, info) {
        return _.find(data.users, {id: args.id});
      }
    },


    groups: {
      type: new graphql.GraphQLList(groupType),
      resolve: function(context, args, info) {
        return data.groups;
      }
    },
    group: {
      type: groupType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
          description: 'id of the group'
        }
      },
      resolve: function(contxt, args, info) {
        return _.find(data.groups, {id: args.id});
      }
    }
  }}
});


var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: function() { return {
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      description: 'The id of the user.'
    },
    first_name: {
      type: graphql.GraphQLString,
      description: 'The first name of the user.',
    },
    last_name: {
      type: graphql.GraphQLString,
      description: 'The last name of the user.',
    },
    email: {
      type: graphql.GraphQLString,
      description: 'The email of the user.',
    }
  }}
});

var groupType = new graphql.GraphQLObjectType({
  name: 'Group',
  fields: function() { return {
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      description: 'The id of the group.'
    },
    name: {
      type: graphql.GraphQLString,
      description: 'The name of the group.',
    },
    description: {
      type: graphql.GraphQLString,
      description: 'The description of the group.',
    }
  }}
});






module.exports = new graphql.GraphQLSchema({
  query: queryType
});
