import * as dotenv from "dotenv";
dotenv.config();

/**Crear la database antes desde la terminal o workbench */
/** Tuve que instalar msql2 por este problema:
 *  https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
 */
export const options = {
  mysql: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      insecureAuth: true,
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
