import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "93.127.172.220",
  user: "apartflowtester",
  password: "#Apartflow123",
  database: "apartflowtesting",
});

app.listen(8081, () => {
  console.log("Database Runung on Port 8081");
});

// MYSQL_HOST = 93.127.172.220
// MYSQL_USER = apartflowtester
// MYSQL_PASSWORD = "#Apartflow123"
// MYSQL_DATABASE = apartflowtesting
