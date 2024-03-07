import fs from "fs/promises";

async function readDatabase() {
  const rawdb = await fs.readFile("./backend/db.json");
  return JSON.parse(rawdb);
}

async function writeDatabase(data) {
  const done = await fs.writeFile(
    "./backend/db.json",
    JSON.stringify(data, null, 2)
  );
  return done;
}

export { readDatabase, writeDatabase };
