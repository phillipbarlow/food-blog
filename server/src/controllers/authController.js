import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";

export async function signup(req, res) {
  const { display_name, username, password } = req.body;

  // if (!display_name) {
  //   return res.status(400).json({ error: "display_name is missing" });
  // }
  if (!username) {
    return res.status(400).json({ error: "username is missing" });
  }
  if (!password) {
    return res.status(400).json({ error: "password is missing" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);
    // console.log(req.body)
    const result = await pool.query(
      `INSERT INTO users (display_name, username, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, display_name, username`,
      [display_name || null, username, password_hash],
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: `Username already exists!` });
    }
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Enter email" });
    }
    if (!password) {
      return res.status(400).json({ error: "Enter password" });
    }

    const userRes = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = userRes.rows[0];

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // console.log(user.id,user.display_name,'line 66 ---')
    res.status(200).json({ token });
  } catch (err) {
    console.log(err, "Login failed!!");
    res.status(500).json({ error: "Login failed" });
  }
}
