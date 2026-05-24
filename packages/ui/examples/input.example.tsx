import { Input } from "@monorepo-boilerplate/ui";

export default function InputExample() {
  return (
    <div className="flex max-w-sm flex-col gap-1.5">
      <label htmlFor="email" className="text-sm font-medium text-foreground">
        Email
      </label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}
