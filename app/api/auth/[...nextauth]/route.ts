// app/api/auth/[...nextauth]/route.ts
import { handler } from "@/lib/auth";

export const { GET, POST } = handler;
