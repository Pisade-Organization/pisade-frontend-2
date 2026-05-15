import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!raw) throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
  return raw.replace(/\/$/, "");
}

export interface TutorStatusUpdatedPayload {
  tutorId: string;
  userId: string;
  status: string;
}

export function connectAdminSocket(token: string) {
  if (socket) {
    (socket as any).auth = { token };
    if (!socket.connected) socket.connect();
    return socket;
  }

  socket = io(`${getBaseUrl()}/admin`, {
    auth: { token },
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 500,
  });

  return socket;
}

export function getAdminSocket() {
  return socket;
}

export function disconnectAdminSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}

export function onTutorStatusUpdated(
  callback: (payload: TutorStatusUpdatedPayload) => void
) {
  const s = getAdminSocket();
  if (!s) return () => {};
  s.on("tutor.status.updated", callback);
  return () => s.off("tutor.status.updated", callback);
}
