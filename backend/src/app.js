import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Adım 4: Health-Check Endpoint (Öğrenci No: 2311012827)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012827"
  });
});

// Adım 7: Event Rotaları
app.use("/events", eventRoutes);

// 404 Bulunamadı
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;