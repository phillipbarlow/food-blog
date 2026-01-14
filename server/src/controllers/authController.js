import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";

export async function signup(req, res) {
  const { email, password, display_name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }
  try {
    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, display_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, display_name`,
      [email, password_hash, display_name]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already exists!" });
    }
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed line 25" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ error: "Enter email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: "Enter password" });
    }

    const userRes = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = userRes.rows[0];

    if (!user) {
      return res
        .status(400)
        .json({ error: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match)
      return res
        .status(400)
        .json({ error: "Invalid password" });

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
