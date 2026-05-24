import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { findAnnotations } from "./scan";

function fixture(name: string, content: string): string {
  const dir = mkdtempSync(join(tmpdir(), "annotations-"));
  const file = join(dir, name);
  writeFileSync(file, content, "utf8");
  return file;
}

describe("findAnnotations", () => {
  it("captures a TODO in a TS line comment and flags the missing issue link", () => {
    const file = fixture("a.ts", "// TODO: dispatch the event\nexport const x = 1;\n");
    const found = findAnnotations([file]);
    expect(found).toHaveLength(1);
    expect(found[0]?.tag).toBe("TODO");
    expect(found[0]?.line).toBe(1);
    expect(found[0]?.text).toBe("dispatch the event");
    expect(found[0]?.hasIssueLink).toBe(false);
  });

  it("recognises a linked TODO(#123) as having an issue link", () => {
    const file = fixture("a.ts", "// TODO(#123): wire this up\n");
    expect(findAnnotations([file])[0]?.hasIssueLink).toBe(true);
  });

  it("reads `#` comments in shell, YAML, Dockerfile, and .env files", () => {
    expect(findAnnotations([fixture("run.sh", "# FIXME: brittle path\n")])[0]?.tag).toBe("FIXME");
    expect(findAnnotations([fixture("ci.yml", "# HACK: pin the version\n")])[0]?.tag).toBe("HACK");
    expect(findAnnotations([fixture("Dockerfile", "# TODO: slim the image\n")])[0]?.tag).toBe(
      "TODO",
    );
    expect(findAnnotations([fixture(".env.example", "# XXX: rotate this\n")])[0]?.tag).toBe("XXX");
  });

  it("reads `--` comments in SQL migrations", () => {
    const file = fixture("0001_init.sql", "-- BUG: missing index\nCREATE TABLE t ();\n");
    expect(findAnnotations([file])[0]?.tag).toBe("BUG");
  });

  it("captures @deprecated in a JSDoc continuation line", () => {
    const file = fixture("a.ts", "/**\n * @deprecated use the new client\n */\n");
    const found = findAnnotations([file]);
    expect(found[0]?.tag).toBe("@deprecated");
    expect(found[0]?.text).toBe("use the new client");
  });

  it("ignores markers that are not inside a comment", () => {
    const file = fixture("a.ts", 'export const label = "TODO";\nconst FIXME_LIST = [];\n');
    expect(findAnnotations([file])).toHaveLength(0);
  });

  it("does not match markers embedded in identifiers", () => {
    const file = fixture("a.ts", "// TODOS_REMAINING is a counter\n");
    expect(findAnnotations([file])).toHaveLength(0);
  });
});
