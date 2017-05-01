# sequelize-graphql-example

This is a working fork of sequelize's [express-example](https://github.com/sequelize/express-example) adapted to have additional support for interacting with the database through graphql using [graphql-sequelize](https://github.com/mickhansen/graphql-sequelize) and [express-graphql](https://github.com/graphql/express-graphql). It's meant only for illustrative purposes, and done largely for my own edification. I'd love feedback!

## Starting the app

```
npm install
npm start
```

This will start the application and create an sqlite database in your app dir.
Just open [http://localhost:3000](http://localhost:3000).

There's a simple UI from the express-example app that you can use for seeding data in your database. This is helpful for understanding how your GraphQL queries are functioning.


## GraphQL

GraphiQL is included through express-graphql, and can be accessed in your browser at http://localhost:3000/graphql.

All of the magic to adapt the sequelize schema to a GraphQL schema takes places in `./graphqlSchema.js`.

The only change to the sequelize schema from the out-of-the-box version of express-example is the addition of `User.Tasks = User.hasMany(models.Task, {as: 'tasks'});` in `models/user.js` in order to create the association in a way that graphql-sequelize can digest. This works, but I have a feeling this is not the cleanest approach, and I'd love to hear if you have a better one!

###### There are two GraphQL queries included here. Here are examples:

Get all users, list their ids.
```
{
  users{
    id
  }  
}
```

Get a user by id, return username, id and title of associated tasks.
```
{
  user(id:1){
    username
    id
    tasks{
      title
    }
  }  
}
```

###### There is also a mutation included to add a user:

```
mutation {
	createUser(username: "Doug Funny"){
    id
    username
  }
}
```
