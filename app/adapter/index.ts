import fastify from "fastify";
import fs from "fs";
import path from "path";

const GLOBAL_DIR = path.join(__dirname);

const server = fastify();

const dirQueue = [GLOBAL_DIR];

while (dirQueue.length > 0) {
  const dir = dirQueue.shift();
  if (!dir) {
    break;
  }

  const files = fs.readdirSync(dir).filter((file) => file !== "index.ts");
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
