import { createHmac } from "node:crypto";

import { describe, expect, it } from "vitest";
import { z } from "zod";

import { parseSignedWebhook, verifyWebhookSignature } from "./index";

const secret = "test-secret";
const payload = JSON.stringify({ type: "ping", id: "evt_1" });
const signature = createHmac("sha256", secret).update(payload).digest("hex");

describe("verifyWebhookSignature", () => {
  it("accepts a valid signature", () => {
    expect(verifyWebhookSignature({ payload, signature, secret })).toBe(true);
  });

  it("rejects a tampered signature", () => {
    expect(verifyWebhookSignature({ payload, signature: "deadbeef", secret })).toBe(false);
  });
});

describe("parseSignedWebhook", () => {
  const schema = z.object({ type: z.string(), id: z.string() });

  it("returns parsed data for a valid signed payload", () => {
    expect(parseSignedWebhook({ payload, signature, secret }, schema)).toEqual({
      type: "ping",
      id: "evt_1",
    });
  });

  it("throws UNAUTHORIZED on bad signature", () => {
    expect(() => parseSignedWebhook({ payload, signature: "bad", secret }, schema)).toThrowError(
      expect.objectContaining({ code: "UNAUTHORIZED" }),
    );
  });
});
