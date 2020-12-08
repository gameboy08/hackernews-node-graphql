# How to graphql - backend - nodejs + Apollo Server + Prisma
- Apollo Server 2.18: Fully-featured GraphQL Server with focus on easy setup, performance and great developer experience, graphql-js and more.
- Prisma: Replaces traditional ORMs. Use Prisma Client to access your database inside of GraphQL resolvers.

https://www.howtographql.com/graphql-js/4-adding-a-database/

## How to start the project
`npx prisma studio` - start the database
`node index.js` - start the backend server

## Create a new database and create your first migration based on `schema.prisma`  
`npx prisma migrate save --experimental`
- Here we generate a sqlite database;
- Based on `schema.prisma`

## Create your migration with name "add-user-model" based on `schema.prisma`
`npx prisma migrate save --name "add-user-model" --experimental`

## Run the migration
`npx prisma migrate up --experimental`
apply that migration to your database

## Generating Prisma Client
`npx prisma generate`
so you can use the methods on prisma with the latest changes on database

## File Structure
- `prisma`: This directory holds all the files that relate to our Prisma setup. Prisma Client is used to access the database in our GraphQL resolvers (similar to an ORM).
    - `schema.prisma` defines our data model for the project. It uses the Prisma Schema Langauge to define the shape of our databases tables and the relations between them.
    - `dev.db` is a SQLite database that will be used to store and retrieve data for this tutorial

- `src`: This directory holds the source files for our GraphQL server.
    - `schema.graphql` contains our application schema. The application schema defines the GraphQL operations we can send from the frontend. We’ll take a closer look at this file in just a bit.
    - `resolvers` contains the resolver functions for the operations defined in the application schema.
    - `index.js` is the entry point for our GraphQL server.