// @vitest-environment node
// Route handlers are server-only; the node env lets `@/env` expose server vars
// (t3-env blocks server-var access under the jsdom/client default).
import { createHmac } from "node:crypto";

import { describe, expect, it } from "vitest";

const secret = "hook-secret-0123456789"; // ≥16 chars to satisfy the env schema

// `env` reads process.env when its module is first imported, so the secret must
// be set before route.ts (which imports `@/env`) loads. Set it, then dynamically import.
process.env.WEBHOOK_SECRET = secret;
const { POST } = await import("./route");

const body = JSON.stringify({ type: "ping", id: "evt_1" });
const sign = (payload: string) => createHmac("sha256", secret).update(payload).digest("hex");

function makeRequest(payload: string, signature: string): Request {
  return new Request("http://localhost/api/webhooks/example", {
    method: "POST",
    headers: { "x-signature": signature },
    body: payload,
  });
}

const params = Promise.resolve({ provider: "example" });

describe("POST /api/webhooks/[provider]", () => {
  it("accepts a correctly signed payload", async () => {
    const res = await POST(makeRequest(body, sign(body)), { params });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true, provider: "example" });
  });

  it("rejects an invalid signature with 401", async () => {
    const res = await POST(makeRequest(body, "bad"), { params });
    expect(res.status).toBe(401);
  });
});
