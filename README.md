# Node OIDC Provider TypeORM Adapter

This is an implementation of TypeORM adapter for the [OIDC Provider](https://github.com/panva/node-oidc-provider/).

This repo also provides a minimal example of an express app using the TypeORM adapter to enable persistence of the authorization server state.

## Usage

Create a `.env` file and copy the contents from `.env.example` to `.env`.
Then change the env variables according to your database config:

```bash
DB_TYPE="postgres"
DB_HOST="localhost"
DB_PORT=5432
DB_NAME=<db_name>
DB_USERNAME=<db_username>
DB_PASSWORD=<db_password>
```

Create a database `<db_name>` and ensure you're able to connect to the database. Then run the following commands to start the app:

```bash
npm run migrate:run

npm run dev
```

Run a authorization flow and watch the server state getting stored in your database!
