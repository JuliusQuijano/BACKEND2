import pool from '../config/db.js';

export const fetchAllStudents = async () => {
  const [rows] = await pool.query("SELECT * FROM students");
  return rows;
}

export const findStudent = async (student) => {
    const [rows] = await pool.query("SELECT * FROM students WHERE name=? AND srcode=? AND program=?",
    [student.name, student.srcode, student.program]
    );

    return rows;
};

export const findStudentByID = async (id) => {
    const [rows] = await pool.query("SELECT * FROM students WHERE id=?",
    [id]
    );
   
    return rows;
} 


export const insert = async (student) => {
    const [result] = await pool.query(
        "INSERT INTO students(name, srcode, program) VALUES (?, ?, ?)",
        [student.name, student.srcode, student.program]
    );
    return result.insertId;
}

export const update = async (student) => {
    const [result] = await pool.query(
        "UPDATE students SET name = ?, srcode = ?, program = ? WHERE id = ?",
        [student.name, student.srcode, student.program, student.id]
    );
    return result.affectedRows;
}

export const remove = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM students WHERE id = ?",[id]
    );
    return result.affectedRows;
}



