const graphql = require('graphql');
const Ocompte =require('../omodels/ocompte');
const Oreference=require('../omodels/oreference');
const { GraphQLObjectType, GraphQLString, 
   GraphQLID, GraphQLInt, GraphQLSchema,GraphQLList} = graphql;

  /*   var users = [
        { username:"mensah", role:"user" ,password:"admin",loginAttempts:0, id:1},
        { username: "akoli", role: "user", password:"admin",loginAttempts:0,id: 2},
        { username: "admin", role: "admin",password:"admin",loginAttempts:0, id: 3 }
    ]
     */
    const UserType = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: { type: GraphQLID  },
            username: { type: GraphQLString }, 
            role:{ type: GraphQLString }, 
            password:{ type: GraphQLString }, 
            loginAttempts: { type: GraphQLInt }
        })
    });
    

    const OcompteType = new GraphQLObjectType({
        name: 'Ocompte',
        fields: () => ({
            id: { type: GraphQLID  },
            CompteNumber: { type: GraphQLString },
            oreference:{
                type: OreferenceType,
                resolve(parent, args){
                    return Oreference.findById(parent.ocomptID);
                }
            }
           
        })
    });
    
    const OreferenceType = new GraphQLObjectType({
        name: 'Oreference',
        fields: () => ({
            id: { type: GraphQLID  },
            RefCode: { type: GraphQLString },
            oreference:{
                type: new GraphQLList
            },
            ocompte:{
                type: OcompteType,
                resolve(parent, args){
                    return Ocompte.find({oreferenceID: parent.id});
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
                args: { id: { type: GraphQLID } },
                resolve(parent, args) {
                    //Here we define how to get data from database source
    
                    //this will return the book with id passed in argument by the user
                    return users.find((item) => { return item.id == args.id});
                }
            }
        }
    });

    //Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery
});