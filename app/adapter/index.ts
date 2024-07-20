import fastify from "fastify";
import fs from "fs";
import path from "path";

const GLOBAL_DIR = path.join(__dirname);

const server = fastify({ logger: true });

const dirQueue = [GLOBAL_DIR];

while (dirQueue.length > 0) {
  const dir = dirQueue.shift();
  if (!dir) {
    break;
  }

  const files = fs.readdirSync(dir).filter((file) => {
    if (file === "index.ts") return false;
    if (file.endsWith(".ts")) return true;

    const stat = fs.statSync(path.join(dir, file));
    return stat.isDirectory();
  });

  for (const file of files) {
    const moduleDir = path.join(dir, file);

    if (fs.statSync(moduleDir).isDirectory()) {
      dirQueue.push(moduleDir);
      continue;
    }
    const module = require(moduleDir);
    if (!module.fastifyHandler) {
      continue;
    }
    console.log(`Loading module ${moduleDir}`);
    module.fastifyHandler(server);
  }
}

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
