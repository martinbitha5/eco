import "./env-loader.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import scoreRoutes from "./routes/scores.js";
import frakoRoutes from "./routes/frako.js";
import frakoJobRoutes from "./routes/frako-jobs.js";
import envolRoutes from "./routes/envol.js";
import { optionalAuth, requireAuth } from "./middleware/auth.js";
import { jobAuth } from "./middleware/jobAuth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { checkScoringEngineHealth } from "./lib/scoring-engine.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGINS?.split(",") ?? "*" }));
app.use(express.json());

// Health check
app.get("/health", async (_req, res) => {
  const scoringOk = await checkScoringEngineHealth();
  res.json({
    status: "ok",
    service: "ecosysteme-rdc-api",
    scoringEngine: scoringOk ? "connected" : "unavailable",
  });
});

// API v1 routes (optionalAuth for scores = userId if logged in)
app.use("/api/v1/scores", optionalAuth, scoreRoutes);
app.use("/api/v1/frako/jobs", jobAuth, frakoJobRoutes);
app.use("/api/v1/frako", requireAuth, frakoRoutes);
app.use("/api/v1/envol", envolRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API ecosysteme-rdc running at http://localhost:${PORT}`);
});
