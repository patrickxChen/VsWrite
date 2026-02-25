const API_URL = import.meta.env.VITE_API_URL ?? "/api";
export async function createSession(payload) {
    const response = await fetch(`${API_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error("Failed to create session");
    }
    return response.json();
}
export async function updateSession(id, payload) {
    const response = await fetch(`${API_URL}/sessions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error("Failed to update session");
    }
    return response.json();
}
export async function getSession(id) {
    const response = await fetch(`${API_URL}/sessions/${id}`);
    if (!response.ok) {
        throw new Error("Failed to load session");
    }
    return response.json();
}
