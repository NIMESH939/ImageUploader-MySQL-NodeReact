// import express from "express";
// import mysql from "mysql";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Ensure the directory exists
// const dir = "./public/images";
// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// const db = mysql.createConnection({
//   host: "93.127.172.220",
//   user: "apartflowtester",
//   password: "#Apartflow123",
//   database: "apartflowtesting",
// });

// // app.post("/upload", upload.single("image"), (req, res) => {
// //   const image = req.file.filename;
// //   const sql =
// //     "UPDATE Residents_Information SET image_path = ? WHERE residentID = ?";

// //   db.query(sql, [image, "214038R"], (err, result) => {
// //     if (err) return res.json({ Message: "Error" });
// //     return res.json({ Status: "Success" });
// //   });
// // });

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log("Received a POST request to /upload");

//   if (!req.file) {
//     console.log("No file uploaded");
//     return res.json({ Message: "No file uploaded" });
//   }

//   const image = req.file.filename;
//   console.log("File uploaded successfully. Filename:", image);

//   const sql =
//     "UPDATE Residents_Information SET image_path = ? WHERE residentID = ?";
//   const residentID = "214038R";

//   console.log("Executing SQL query:", sql);
//   console.log("Query parameters:", [image, residentID]);

//   db.query(sql, [image, residentID], (err, result) => {
//     if (err) {
//       console.log("Error executing query:", err);
//       return res.json({ Message: "Error" });
//     }

//     console.log("Query executed successfully. Result:", result);
//     return res.json({ Status: "Success" });
//   });
// });

// app.listen(3001, () => {
//   console.log("Server running on Port 3001");
// });

import express from "express";
import mysql from "mysql2"; // Updated MySQL client library
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

// Ensure the directory exists
const dir = "./public/images";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const db = mysql.createConnection({
  host: "93.127.172.220",
  user: "apartflowtester",
  password: "#Apartflow123",
  database: "apartflowtesting",
  // Added support for the authentication plugin
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("#Apartflow123"), // Adjust as needed
  },
});

// Check if the connection to the database is successful
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL server");
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Received a POST request to /upload");

  if (!req.file) {
    console.log("No file uploaded");
    return res.json({ Message: "No file uploaded" });
  }

  const image = req.file.filename;
  console.log("File uploaded successfully. Filename:", image);

  const sql =
    "UPDATE Residents_Information SET image_path = ? WHERE residentID = ?";
  const residentID = "214038R";

  console.log("Executing SQL query:", sql);
  console.log("Query parameters:", [image, residentID]);

  db.query(sql, [image, residentID], (err, result) => {
    if (err) {
      console.log("Error executing query:", err);
      return res.json({ Message: "Error" });
    }

    console.log("Query executed successfully. Result:", result);
    return res.json({ Status: "Success" });
  });
});

app.listen(3001, () => {
  console.log("Server running on Port 3001");
});
