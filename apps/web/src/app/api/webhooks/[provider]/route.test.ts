import { createHmac } from "node:crypto";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { POST } from "./route";

const secret = "hook-secret";
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
  beforeEach(() => {
    process.env.WEBHOOK_SECRET = secret;
  });
  afterEach(() => {
    delete process.env.WEBHOOK_SECRET;
  });

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
