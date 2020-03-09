const graphql = require('graphql');
const Ocompte = require('../omodels/ocompte');
const Oreference = require('../omodels/oreference');
const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLInt
    ,GraphQLSchema,GraphQLList, GraphQLNonNull} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        username: {
            type: GraphQLString
        },
        role: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        loginAttempts: {
            type: GraphQLInt
        }
    })
});

const OcompteType = new GraphQLObjectType({
    name: 'Ocompte',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        CompteNumber: {
            type: GraphQLString
        },
        oreference: {
            type: OreferenceType,
            resolve(parent, args) {
                return Oreference.findById(parent.oreferenceID);
            }
        }

    })
});

const OreferenceType = new GraphQLObjectType({
    name: 'Oreference',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        RefCode: {
            type: GraphQLString
        },  
        Description: {
            type: GraphQLString
        },    
        ocompte: {
            type: new GraphQLList(OcompteType),
            resolve(parent, args) {
                return Ocompte.find({
                    oreferenceID: parent.id
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            //argument passed by the user while making the query
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return user.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            //argument passed by the user while making the query
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return user.find({});
            }
        },
        ocompte: {
            type: OcompteType,
            //argument passed by the user while making the query
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return Ocompte.findById(args.id);
            }
        },
        ocomptes: {
            type: new GraphQLList(OcompteType),
            //argument passed by the user while making the query
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return Ocompte.find({});
            }
        },
        oreference: {
            type: OreferenceType,
            //argument passed by the user while making the query
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //Here we define how to get data from database source
                //this will return the book with id passed in argument by the user
                return Oreference.findById(args.id);
            }
        },
        oreferences: {
            type: new GraphQLList(OreferenceType),
            //argument passed by the user while making the query
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return Oreference.find({});
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                //GraphQLNonNull make these field required
                username: { type: new GraphQLNonNull(GraphQLString) },
                role: { type: new GraphQLNonNull(GraphQLString)},
                password:{ type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    username: args.username,
                    role: args.role,
                    password: args.password
                });
                return author.save();
            }
        },
        addOcompte: {
            type: OcompteType,
            args: {
                //GraphQLNonNull make these field required
                CompteNumber: { type: new GraphQLNonNull(GraphQLString) },
                oreferenceID: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let ocompte = new Ocompte({
                    CompteNumber: args.CompteNumber,
                    oreferenceID: args.oreferenceID
                });
                return ocompte.save();
            }
        },
        addOreference:{
            type:OreferenceType,
            args:{
                RefCode: { type: new GraphQLNonNull(GraphQLString)},
                Description: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let oreference = new Oreference({
                    RefCode:args.RefCode,
                    Description:args.Description                   
                })
                return oreference.save()
            }
        }
    }
});
//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});
