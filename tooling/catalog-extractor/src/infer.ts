import type { ComponentVariant, RenderEnvironment } from "@monorepo-boilerplate/ui/catalog-schema";
import { type SourceFile, SyntaxKind } from "ts-morph";

const REACT_HOOKS = new Set([
  "useState",
  "useEffect",
  "useLayoutEffect",
  "useReducer",
  "useRef",
  "useContext",
  "useId",
  "useTransition",
  "useDeferredValue",
  "useSyncExternalStore",
  "useImperativeHandle",
  "useActionState",
  "useOptimistic",
  "useFormStatus",
]);

/**
 * Infer where a component can render. `"use client"` directive or a React hook
 * import means it's a client component; otherwise it's server-safe. (Transitive
 * client dependencies are surfaced by authoring `"use client"` in the wrapper.)
 */
export function inferRenderEnvironment(sourceFile: SourceFile): RenderEnvironment {
  const firstStatement = sourceFile.getStatements()[0];
  if (firstStatement) {
    const literal = firstStatement
      .asKind(SyntaxKind.ExpressionStatement)
      ?.getExpression()
      .asKind(SyntaxKind.StringLiteral)
      ?.getLiteralValue();
    if (literal === "use client") return "client";
  }

  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "react") continue;
    for (const named of importDecl.getNamedImports()) {
      if (REACT_HOOKS.has(named.getName())) return "client";
    }
  }

  return "server";
}

/** Extract CVA variant names, values, and defaults from a `cva(...)` call. */
export function extractVariants(sourceFile: SourceFile): ComponentVariant[] {
  const variants: ComponentVariant[] = [];

  sourceFile.forEachDescendant((node) => {
    const call = node.asKind(SyntaxKind.CallExpression);
    if (!call || call.getExpression().getText() !== "cva") return;

    const config = call.getArguments()[1]?.asKind(SyntaxKind.ObjectLiteralExpression);
    if (!config) return;

    const variantsObject = config
      .getProperty("variants")
      ?.asKind(SyntaxKind.PropertyAssignment)
      ?.getInitializer()
      ?.asKind(SyntaxKind.ObjectLiteralExpression);
    if (!variantsObject) return;

    const defaultsObject = config
      .getProperty("defaultVariants")
      ?.asKind(SyntaxKind.PropertyAssignment)
      ?.getInitializer()
      ?.asKind(SyntaxKind.ObjectLiteralExpression);

    for (const property of variantsObject.getProperties()) {
      const assignment = property.asKind(SyntaxKind.PropertyAssignment);
      if (!assignment) continue;
      const name = assignment.getName();

      const valuesObject = assignment.getInitializer()?.asKind(SyntaxKind.ObjectLiteralExpression);
      if (!valuesObject) continue;

      const values = valuesObject
        .getProperties()
        .map((value) => value.asKind(SyntaxKind.PropertyAssignment)?.getName())
        .filter((value): value is string => value !== undefined);

      const defaultValue = defaultsObject
        ?.getProperty(name)
        ?.asKind(SyntaxKind.PropertyAssignment)
        ?.getInitializer()
        ?.asKind(SyntaxKind.StringLiteral)
        ?.getLiteralValue();

      variants.push(
        defaultValue === undefined ? { name, values } : { name, values, default: defaultValue },
      );
    }
  });

  return variants;
}
