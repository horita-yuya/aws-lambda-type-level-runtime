import {
  EmitHint,
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
          factory.createStringLiteral(entryFile),
        ),
        factory.createTypeAliasDeclaration(
          undefined,
          "Main",
          undefined,
          factory.createTypeReferenceNode(factory.createIdentifier(entryType), [
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
          ]),
        ),
      ],
      factory.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None,
    ),
    source,
  );
}

function check(
  entryFile: string,
  entryType: string,
  events: Record<string, string | number>,
): string | undefined {
  const options = {
    module: ModuleKind.ES2020,
    target: ScriptTarget.ES2020,
    strict: true,
  };

  const host = createCompilerHost(options);
  const mainTs = createMain(entryFile, entryType, events);
  host.writeFile("/tmp/main.ts", mainTs, false);
  const program = createProgram(["/tmp/main.ts", entryFile], options, host);
  const checker = program.getTypeChecker();

  const source = program.getSourceFile("/tmp/main.ts");

  let evaluatedType: string | undefined;
  source?.forEachChild((node) => {
    if (isTypeAliasDeclaration(node) && node.name.escapedText === "Main") {
      const type = checker.getTypeAtLocation(node);
      evaluatedType = checker.typeToString(type);

      return;
    }
  });

  return evaluatedType;
}

function main() {
  const handler = process.argv[2];
  const [entryFile, entryType] = handler.split(".");
  const events = JSON.parse(process.argv[3]);
  const absolutePath = process.argv[4];
  const result = check(`${absolutePath}/${entryFile}.ts`, entryType, events);

  console.log(JSON.stringify({ result }));
}

main();
