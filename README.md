# How to graphql - backend - nodejs + Apollo Server + Prisma
- Apollo Server 2.18: Fully-featured GraphQL Server with focus on easy setup, performance and great developer experience, graphql-js and more.
- Prisma: Replaces traditional ORMs. Use Prisma Client to access your database inside of GraphQL resolvers.

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

https://www.howtographql.com/graphql-js/4-adding-a-database/