import express, { Application, Request, Response, NextFunction } from "express";
import mysql, { Connection } from "mysql";

const app: Application = express();
const PORT: Number = 8800;

const add = (a: number, b: number): number => a + b;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(add(3, 4));
  res.send("hello world");
});

app.listen(PORT, () => console.log(`Server running on port:${PORT}`));

const connection: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gkskfh12",
  database: "testing1",
  insecureAuth: true,
});

connection.connect();

connection.query("SELECT * FROM user", (error, results, fields) => {
  if (error) {
    console.log(error);
  }
  console.log(results[0]);
});

connection.end();

console.log("test");
