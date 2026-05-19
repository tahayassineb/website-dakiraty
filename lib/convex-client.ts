/**
 * Browser-side Convex client singleton.
 *
 * During SSG (Node, no window), this is null so components must handle the
 * `undefined` case in their useQuery calls — Convex returns `undefined` until
 * the client connects.
 */

import { ConvexReactClient } from "convex/react";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

export const convexClient =
  typeof window !== "undefined" && CONVEX_URL
    ? new ConvexReactClient(CONVEX_URL)
    : null;

export const ADMIN_TOKEN_KEY = "dakiraty_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}
