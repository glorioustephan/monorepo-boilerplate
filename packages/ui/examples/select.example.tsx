import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@monorepo-boilerplate/ui";

export default function SelectExample() {
  return (
    <Select>
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Pick a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
        <SelectItem value="remix">Remix</SelectItem>
      </SelectContent>
    </Select>
  );
}
