import express from "express";
import dotenv from "dotenv";
import exerciseRoutes from "./routes/exercises";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/exercises", exerciseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
