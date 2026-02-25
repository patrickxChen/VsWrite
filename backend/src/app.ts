import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Counter, Gauge, Histogram, Registry, collectDefaultMetrics } from "prom-client";
import { config } from "./config.js";
import { createSessionRouter } from "./routes/sessions.js";
import { createSessionStore } from "./store/index.js";

const registry = new Registry();
collectDefaultMetrics({ register: registry });

const requestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
  registers: [registry]
});

const requestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.2, 0.3, 0.5, 1, 2],
  registers: [registry]
});

const activeSessionsGauge = new Gauge({
  name: "active_sessions",
  help: "Current count of active writing sessions",
  registers: [registry]
});

const store = createSessionStore(config.storeKind, {
  databaseUrl: config.databaseUrl,
  redisUrl: config.redisUrl
});

export const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: "2mb" }));

app.use(async (request, response, next) => {
  const start = process.hrtime.bigint();
  response.on("finish", async () => {
    const durationNs = process.hrtime.bigint() - start;
    const seconds = Number(durationNs) / 1_000_000_000;
    const route = request.route?.path ?? request.path;
    const status = String(response.statusCode);

    requestsTotal.inc({ method: request.method, route, status });
    requestDuration.observe({ method: request.method, route, status }, seconds);

    const active = await store.countActive();
    activeSessionsGauge.set(active);
  });
  next();
});

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/metrics", async (_request, response) => {
  response.setHeader("Content-Type", registry.contentType);
  response.send(await registry.metrics());
});

app.use(createSessionRouter(store));
