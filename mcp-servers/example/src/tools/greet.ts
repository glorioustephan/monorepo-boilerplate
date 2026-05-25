import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

/** Input schema for the `greet` tool, expressed as a zod raw shape. */
export const greetInputSchema = {
  name: z.string().min(1).describe('The name of the person to greet'),
};

export interface GreetArgs {
  readonly name: string;
}

/** Pure handler for the `greet` tool — easy to unit test without a transport. */
export function greet({ name }: GreetArgs): CallToolResult {
  return { content: [{ type: 'text', text: `Hello, ${name}!` }] };
}
