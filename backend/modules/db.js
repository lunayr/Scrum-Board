import fs from "fs/promises";

/////////////////////////////
//  Read & Write data for db.json //
/////////////////////////////

async function readDatabase() {
  const rawdb = await fs.readFile("./db.json");
  return JSON.parse(rawdb);
}

async function writeDatabase(data) {
  const done = await fs.writeFile("./db.json", JSON.stringify(data, null, 2));
  return done;
}

export { readDatabase, writeDatabase };
