import express from "express";
import getClient from "../getClient.js";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/registerUser", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //Check the length of the name
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters long" });
  }

  // Check password length is greater than 6
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  // Check if the user already exists

  const client = await getClient();
  const result = await client.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const user = result.rows[0];

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  //Hash Password
  const HashesPassword = bcrypt.hashSync(password, 10);

  //Save User
  const newUser = await client.query(
    `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${HashesPassword}')`
  );

  return res.status(200).json({ message: `You are Registered Mr. ${name}` });
});

app.post("/loginUser", async (req, res) => {
  const client = await getClient();
  const { email, password } = req.body;

  //Check all fields are given
  if (!email || !password) {
    return res.status(400).json({ message: "Please Enter all fields" });
  }

  //Check weather the User is in DB or not
  const user = await client.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );

  if (!user) {
    return res.status(400).json({ message: "User not Found " });
  }
  const DBpassword = user.rows[0];
  const comparePassword = bcrypt.compareSync(password, DBpassword.password);

  if (!comparePassword) {
    return res.status(401).json({ message: "Wrong Password" });
  }
  return res.status(200).json(user);
});

app.listen(port, () => {
  getClient().then((client) => {
    client.query(
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )`
    );
    console.log("Table created");
  });

  // console.log(UserTable);
  console.log(`Server is listening at http://localhost:${port}`);
});
