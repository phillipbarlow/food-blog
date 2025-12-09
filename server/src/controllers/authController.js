import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {pool} from "../db/pool.js";

export async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, password_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userRes = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = userRes.rows[0];
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.log(err, 'Login failed!!')
    res.status(500).json({ error: "Login failed" });
  }
}
