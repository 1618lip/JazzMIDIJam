import pg from "pg";

const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION
});

export default client;