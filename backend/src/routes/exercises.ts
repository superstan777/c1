import express from "express";
import { config } from "dotenv";
import db from "../db/database";
import { Exercise } from "../types/Exercise";
import OpenAI from "openai";

config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

router.post("/generate", async (_req, res) => {
  try {
    const prompt = `
Generate one English grammar fill-in-the-blank exercise.
Respond with JSON:
{
  "exerciseText": "...",
  "hint": "...",
  "correctAnswer": "..."
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const parsed: Exercise = JSON.parse(
      response.choices[0].message.content ?? "{}"
    );

    db.run(
      `INSERT INTO exercises (exerciseText, hint, correctAnswer) VALUES (?, ?, ?)`,
      [parsed.exerciseText, parsed.hint, parsed.correctAnswer],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, ...parsed });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed." });
  }
});

router.get("/", (_req, res) => {
  db.all(`SELECT * FROM exercises`, [], (err, rows: Exercise[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

export default router;
