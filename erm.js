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
      resolve: function(context, args, info) {
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
      resolve: function(context, args, info) {
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
    },
    memberships: {
      type: new graphql.GraphQLList(groupMemberType),
      description: 'The group memberships of the user.',
      resolve: function(context, args, info) {
        return _.filter(data.members, {user: context.id});
      }
    },
    membership: {
      type: groupMemberType,
      description: 'The group membership of the user.',
      args: {
        group: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
          description: 'id of the group'
        }
      },
      resolve: function(context, args, info) {
        return _.find(data.members, {user: context.id, group: args.group});
      }
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
    },

    members: {
      type: new graphql.GraphQLList(groupMemberType),
      description: 'The members of the group.',
      resolve: function(context, args, info) {
        return _.filter(data.members, {group: context.id});
      }
    },
    member: {
      type: groupMemberType,
      description: 'The member of the group.',
      args: {
        user: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
          description: 'id of the user'
        }
      },
      resolve: function(context, args, info) {
        return _.find(data.members, {user: args.user, group: context.id});
      }
    },

    roles: {
      type: new graphql.GraphQLList(groupRoleType),
      description: 'The roles of the group.',
      resolve: function(context, args, info) {
        return _.filter(data.roles, {group: context.id});
      }
    },
    role: {
      type: groupRoleType,
      description: 'The role of the group.',
      args: {
        role: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
          description: 'id of the role'
        }
      },
      resolve: function(context, args, info) {
        return _.find(data.roles, {user: args.role, group: context.id});
      }
    },
  }}
});

var groupMemberType = new graphql.GraphQLObjectType({
  name: 'GroupMember',
  fields: function() { return {
    user: {
      type: userType,
      description: 'The member user.',
      resolve: function(context, args, info) {
        return _.find(data.users, {id: context.user});
      }
    },
    group: {
      type: groupType,
      description: 'The member group.',
      resolve: function(context, args, info) {
        return _.find(data.groups, {id: context.group});
      }
    }
  }}
});

var groupRoleType = new graphql.GraphQLObjectType({
  name: 'GroupRole',
  fields: function() { return {
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      description: 'The id of the group.'
    },
    name: {
      type: graphql.GraphQLString,
      description: 'The name of the role.',
    },
    group: {
      type: groupType,
      description: 'The role group.',
      resolve: function(context, args, info) {
        return _.find(data.groups, {id: context.group});
      }
    }
  }}
});






module.exports = new graphql.GraphQLSchema({
  query: queryType
});
