import { ToolCalling, type ToolCallingMessage } from '@monorepo-boilerplate/ui';

// ---------------------------------------------------------------------------
// Mock streamer — offline, no network required
// ---------------------------------------------------------------------------

async function* mockStream(chunks: readonly string[]): AsyncIterable<string> {
  for (const chunk of chunks) {
    yield chunk;
    await new Promise<void>((resolve) => setTimeout(resolve, 40));
  }
}

function mockOnSend(_text: string): AsyncIterable<string> {
  return mockStream([
    'I searched the web and here is what I found:\n\n',
    '- TypeScript is a **typed superset** of JavaScript\n',
    '- It compiles to plain JavaScript\n\n',
    '```ts\nconst greet = (name: string) => `Hello, ${name}!`;\n```\n',
  ]);
}

// ---------------------------------------------------------------------------
// Seeded rich conversation — Reasoning → Steps → Tools → Answer
// ---------------------------------------------------------------------------

const SEEDED_MESSAGES: readonly ToolCallingMessage[] = [
  {
    id: 'u1',
    role: 'user',
    content: 'What is the weather in Paris right now?',
  },
  {
    id: 'a1',
    role: 'assistant',
    content: `The current weather in Paris is **18 °C** with partly cloudy skies.

\`\`\`json
{ "temp": 18, "condition": "Partly cloudy", "humidity": "62%" }
\`\`\`

Wind speed is 12 km/h from the west.`,
    reasoning:
      'The user wants real-time weather data. I should call the weather API for the Paris coordinates and parse the response before answering.',
    steps: [
      'Identify the city: Paris, France',
      'Call the weather API with lat=48.8566, lon=2.3522',
      'Parse temperature, condition, and humidity from the response',
      'Format the answer in Markdown',
    ],
    tools: [
      {
        type: 'get_weather',
        state: 'output-available',
        toolCallId: 'call-001',
        input: { city: 'Paris', country: 'FR', units: 'metric' },
        output: { temp: 18, condition: 'Partly cloudy', humidity: '62%', wind_kph: 12 },
      },
      {
        type: 'get_forecast',
        state: 'output-error',
        toolCallId: 'call-002',
        input: { city: 'Paris', days: 5 },
        errorText: 'Forecast service returned 503 Service Unavailable. Please try again later.',
      },
    ],
  },
];

/** ToolCalling example — seeded turn showing Reasoning → Steps → two Tool blocks → markdown answer. */
export default function ToolCallingExample() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToolCalling
        initialMessages={SEEDED_MESSAGES}
        onSend={mockOnSend}
        placeholder="Ask with tool calling…"
      />
    </div>
  );
}
