import path from "path";
import fs from "fs";

async function runMigrations() {
  const folderMigrations = fs
    .readdirSync(path.join(__dirname))
    .filter((file) => !["migrate.ts", "MigrationRepository.ts"].includes(file));

  for (const file of folderMigrations) {
    const Migration = require(path.join(__dirname, file)).default;
    await new Migration(file).migrate();
  }
}

runMigrations();
