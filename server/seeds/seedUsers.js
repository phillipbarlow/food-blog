import bcrypt from "bcrypt";
import {pool} from "../src/db/pool.js";

async function seedUsers(){
    try{
        // NOTE these passwords would usually be destructored from the req.body
        const tempPassword1 = "password123";
        const tempPassword2 = "password456";
        const password1 = await bcrypt.hash(tempPassword1, 10);
        const password2 = await bcrypt.hash(tempPassword2, 10);

        await pool.query(`
            INSERT INTO users (username, email, password_hash)
            VALUES
            ('Phil', 'phil@example.com', $1),
            ('JaneDoe', 'jane@example.com', $2)`, [password1, password2]);

            console.log("users seeded successfully");
            process.exit();
    } catch(err){
        console.error("Error seeding users:", err);
        process.exit(1)
    }
}
seedUsers()