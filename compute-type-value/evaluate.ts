import {
  EmitHint,
  type LiteralType,
  ModuleKind,
  NewLineKind,
  NodeFlags,
  ScriptTarget,
  SyntaxKind,
  createCompilerHost,
  createPrinter,
  createProgram,
  createSourceFile,
  factory,
  isTypeAliasDeclaration,
} from "typescript";

function createMain(
  entryFile: string,
  entryType: string,
  events: Record<string, string | number>,
): string {
  const source = createSourceFile("", "", ScriptTarget.ES2020);
  const printer = createPrinter({ newLine: NewLineKind.LineFeed });

  return printer.printNode(
    EmitHint.Unspecified,
    factory.createSourceFile(
      [
        factory.createImportDeclaration(
          undefined,
          factory.createImportClause(
            true,
            undefined,
            factory.createNamedImports([
              factory.createImportSpecifier(
                false,
                undefined,
                factory.createIdentifier(entryType),
              ),
            ]),
          ),
          factory.createStringLiteral(entryFile.replace(/\.[^/.]+$/, "")),
        ),
        factory.createTypeAliasDeclaration(
          undefined,
          "Main",
          undefined,
          factory.createTypeReferenceNode(
            factory.createIdentifier(entryType),
            Object.entries(events).length === 0
              ? undefined
              : [
                  factory.createTypeLiteralNode(
                    Object.entries(events).map(([key, value]) => {
                      return factory.createPropertySignature(
                        undefined,
                        key,
                        undefined,
                        factory.createLiteralTypeNode(
                          typeof value === "number"
                            ? factory.createNumericLiteral(value)
                            : factory.createStringLiteral(value),
                        ),
                      );
                    }),
                  ),
                ],
          ),
        ),
      ],
      factory.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None,
    ),
    source,
  );
}

export function evaluate(
  entryFile: string,
  entryType: string,
  events: Record<string, string | number>,
): LiteralType["value"] {
  const options = {
    module: ModuleKind.ES2020,
    target: ScriptTarget.ES2020,
    strict: true,
  };

  const hash = Math.random().toString(36).substring(7);
  const mainFileName = `/tmp/main-${hash}.ts`;
  const host = createCompilerHost(options);
  const mainTs = createMain(entryFile, entryType, events);
  host.writeFile(mainFileName, mainTs, false);
  const program = createProgram([mainFileName, entryFile], options, host);
  const checker = program.getTypeChecker();

  const source = program.getSourceFile(mainFileName);

  let evaluatedType: LiteralType["value"] | undefined;
  source?.forEachChild((node) => {
    if (isTypeAliasDeclaration(node) && node.name.escapedText === "Main") {
      const type = checker.getTypeAtLocation(node);

      if (type.isLiteral()) {
        evaluatedType = type.value;
        return;
      }
    }
  });

  if (evaluatedType === undefined) {
    throw new Error("RuntimeError: No Main type found in /tmp/main.ts");
  }

  return evaluatedType;
}
