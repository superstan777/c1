import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "exercises.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exerciseText TEXT NOT NULL,
      hint TEXT,
      correctAnswer TEXT NOT NULL
    )
  `);
});

export default db;
