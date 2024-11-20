import { createEntry } from "./entry";
import { evaluate } from "./evaluate";

function main() {
  const { entryFile, entryType, events, absolutePath, extension } = createEntry(
    process.argv,
  );
  const result = evaluate(
    `${absolutePath}/${entryFile}.${extension}`,
    entryType,
    events,
  );

  console.log(JSON.stringify({ result }));
}

main();
