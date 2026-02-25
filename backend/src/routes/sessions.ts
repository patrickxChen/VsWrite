import { Router } from "express";
import { parseSessionInput } from "../services/sessionService.js";
import type { SessionStore } from "../store/sessionStore.js";

export function createSessionRouter(store: SessionStore): Router {
  const router = Router();

  router.post("/sessions", async (request, response) => {
    try {
      const input = parseSessionInput(request.body);
      const record = await store.create(input);
      response.status(201).json(record);
    } catch {
      response.status(400).json({ message: "Invalid session payload" });
    }
  });

  router.get("/sessions/:id", async (request, response) => {
    const record = await store.getById(request.params.id);
    if (!record) {
      response.status(404).json({ message: "Session not found" });
      return;
    }
    response.json(record);
  });

  router.put("/sessions/:id", async (request, response) => {
    try {
      const input = parseSessionInput(request.body);
      const record = await store.update(request.params.id, input);
      if (!record) {
        response.status(404).json({ message: "Session not found" });
        return;
      }
      response.json(record);
    } catch {
      response.status(400).json({ message: "Invalid session payload" });
    }
  });

  return router;
}
