import {pool} from "../src/db/pool.js";

const result = await pool.query("SELECT id, username, email FROM users");
console.log(result.rows);
process.exit();
