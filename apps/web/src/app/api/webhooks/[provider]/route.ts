import { parseSignedWebhook } from "@monorepo-boilerplate/providers/webhooks";
import { toAppError } from "@monorepo-boilerplate/types";
import { z } from "zod";

const eventSchema = z.object({
  type: z.string(),
  id: z.string(),
});

/**
 * Generic signed-webhook endpoint: POST /api/webhooks/:provider.
 * Verifies the HMAC signature, validates the payload, and maps any AppError to
 * the right HTTP status. Wire real per-provider handling where noted.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
): Promise<Response> {
  try {
    const { provider } = await params;
    const secret = process.env.WEBHOOK_SECRET ?? "";
    const event = parseSignedWebhook(
      {
        payload: await request.text(),
        signature: request.headers.get("x-signature") ?? "",
        secret,
      },
      eventSchema,
    );

    // TODO: dispatch `event` to a handler keyed by `provider` / `event.type`.
    return Response.json({ ok: true, provider, received: event.type });
  } catch (error) {
    const appError = toAppError(error);
    return Response.json(
      { error: appError.code, message: appError.message },
      { status: appError.status },
    );
  }
}
