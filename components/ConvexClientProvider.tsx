import { ConvexProvider } from "convex/react";
import { convexClient } from "../lib/convex-client";

/**
 * Wraps children with ConvexProvider when the client is available (browser).
 * During SSG (Node), renders children plain — Convex queries return `undefined`
 * until hydration completes on the client.
 */
const ConvexClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!convexClient) {
    return <>{children}</>;
  }
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
};

export default ConvexClientProvider;
