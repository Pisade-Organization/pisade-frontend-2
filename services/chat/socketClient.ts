import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function getChatBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!raw) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
  }

  return raw.replace(/\/$/, "");
}

export function connectChatSocket(token: string) {
  if (!socket) {
    socket = io(`${getChatBaseUrl()}/chat`, {
      auth: { token },
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
    });

    return socket;
  }

  socket.auth = { token };
  if (!socket.connected) {
    socket.connect();
  }

  return socket;
}

export function getChatSocket() {
  return socket;
}

export function disconnectChatSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}

export function emitWithAck<T>(
  event: string,
  payload: unknown,
  timeoutMs = 10_000,
): Promise<T> {
  const activeSocket = getChatSocket();
  if (!activeSocket) {
    return Promise.reject(new Error("Chat socket is not connected"));
  }

  return new Promise<T>((resolve, reject) => {
    activeSocket.timeout(timeoutMs).emit(event, payload, (err: unknown, response: T) => {
      if (err) {
        reject(err instanceof Error ? err : new Error("Socket request timeout"));
        return;
      }

      resolve(response);
    });
  });
}
