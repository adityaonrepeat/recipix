import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow frontend to talk to backend
app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server
  credentials: true,
}));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "recipix-backend", timestamp: new Date().toISOString() });
});

const port = 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
