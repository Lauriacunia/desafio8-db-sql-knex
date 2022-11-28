import * as dotenv from "dotenv";
dotenv.config();

/**Crear la database antes desde la terminal o workbench */

export const options = {
  mysql: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 10 },
  },
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/ecommerce.sqlite",
    },
    useNullAsDefault: true,
  },
};
