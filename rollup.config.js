import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("./package.json").toString());

export default {
  input: "index.js",
  external: [...Object.keys(pkg.dependencies), "path"],
  output: [
    { file: pkg.main, format: "cjs", exports: "auto" },
    { file: pkg.exports["."].import, format: "es" },
  ],
};
