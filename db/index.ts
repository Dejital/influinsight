import Client from "knex";

const knex = Client({
  client: "pg",
  connection: {
    port: +(process.env.PG_PORT ?? "5432"),
    ssl: true,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    user: process.env.PG_USER,
  },
});

export default knex;
