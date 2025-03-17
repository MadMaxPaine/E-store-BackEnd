const cfg = require("./configs/config");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const { Pool } = require("pg"); // Використовуємо pg замість mysql2
const sequelize = require("./db");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");

const app = express();
const PORT = cfg.server.port || 7000;

app.use(express.json());
app.use(cookieParser());
app.use(
  express.static(path.resolve(__dirname, "static"), {
    setHeaders: (res, path) => {
      console.log(`Requesting file: ${path}`);
    },
  })
);
app.use(fileUpload({}));
app.use(
  cors({
    origin: cfg.server.clientUrl,
    credentials: true,
  })
);
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is online!" });
});

app.use(errorHandler);

const start = async () => {
  try {
    const pool = new Pool({
      host: cfg.database.host,
      port: cfg.database.port,
      user: cfg.database.user,
      password: cfg.database.password,
      database: cfg.database.dialect, // Підключаємось до стандартної бази PostgreSQL
    });

    const client = await pool.connect();
    const dbName = "estore"; // PostgreSQL не підтримує дефіс у назві БД

    const dbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (dbExists.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
    
    client.release(); // Відпускаємо підключення

    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server is starting on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
