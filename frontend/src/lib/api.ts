export type SessionPayload = {
  content: string;
  wordCount: number;
  wordGoal: number;
};

export type SessionRecord = SessionPayload & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export async function createSession(payload: SessionPayload): Promise<SessionRecord> {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }

  return response.json() as Promise<SessionRecord>;
}

export async function updateSession(id: string, payload: SessionPayload): Promise<SessionRecord> {
  const response = await fetch(`${API_URL}/sessions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to update session");
  }

  return response.json() as Promise<SessionRecord>;
}

export async function getSession(id: string): Promise<SessionRecord> {
  const response = await fetch(`${API_URL}/sessions/${id}`);
  if (!response.ok) {
    throw new Error("Failed to load session");
  }
  return response.json() as Promise<SessionRecord>;
}
