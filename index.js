// @ts-check
import { extname } from "path";
import { createFilter } from "@rollup/pluginutils";
import { archieml as amlParser } from "archieml";

/**
 * @typedef {import('@rollup/pluginutils').FilterPattern} FilterPattern
 * @typedef {import('vite').Plugin} Plugin
 * @typedef {{ include?: FilterPattern; exclude?: FilterPattern }} RollupArchieMLOptions
 */

/**
 * Convert `.aml` files into JavaScript modules.
 * @param {RollupArchieMLOptions} [options]
 * @returns {Plugin}
 */
export default function archieml(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "archieml",
    transform(code, id) {
      if (!filter(id)) return null;
      const ext = extname(id);
      if (ext !== `.aml`) return null;
      const parsed = amlParser.load(code);
      return {
        code: `export default ${JSON.stringify(parsed, null, 2)};`,
        map: { mappings: "" },
      };
    },
  };
}
