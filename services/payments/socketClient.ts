import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function getPaymentsBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!raw) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
  }

  return raw.replace(/\/$/, "");
}

export interface PaymentConfirmedPayload {
  bookingId: string;
  status: "CONFIRMED";
  paymentTransactionId: string;
}

export interface PaymentFailedPayload {
  bookingId: string;
  status: "FAILED";
  reason?: string;
}

export function connectPaymentsSocket(token: string) {
  if (!socket) {
    socket = io(`${getPaymentsBaseUrl()}/payments`, {
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

export function getPaymentsSocket() {
  return socket;
}

export function disconnectPaymentsSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}

export function onPaymentConfirmed(callback: (payload: PaymentConfirmedPayload) => void) {
  const activeSocket = getPaymentsSocket();
  if (!activeSocket) {
    console.warn("Payments socket is not connected");
    return () => {};
  }

  activeSocket.on("payment.confirmed", callback);
  return () => {
    activeSocket.off("payment.confirmed", callback);
  };
}

export function onPaymentFailed(callback: (payload: PaymentFailedPayload) => void) {
  const activeSocket = getPaymentsSocket();
  if (!activeSocket) {
    console.warn("Payments socket is not connected");
    return () => {};
  }

  activeSocket.on("payment.failed", callback);
  return () => {
    activeSocket.off("payment.failed", callback);
  };
}
