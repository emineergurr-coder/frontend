import express from "express";
import cors from "cors";
import eventRouter from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", student: "2311012827" });
});

app.use("/events", eventRouter);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: { message: err.message } });
  }
  res.status(500).json({ error: { message: "Internal server error" } });
});

export default app;