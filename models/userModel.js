import pool from "../config/db.js";

export const insert = async (user, email, password) => {
    const [result] = await pool.query(
        "INSERT INTO user(name, email, password) VALUES (?, ?, ?)",
        [user, email, password]
    );

    return result. insertId;
}


export const findUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM user WHERE email=?",
        [email]
    );
    return rows;


}