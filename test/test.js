import vm from "vm";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { rollup } from "rollup";
import archieml from "../dist/index.es.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

test("converts an aml file", async () => {
  const bundle = await rollup({
    input: `${__dirname}/fixtures/basic/index.js`,
    plugins: [archieml()],
  });
  const {
    output: [{ code }],
  } = await bundle.generate({
    format: "esm",
    exports: "default",
  });
  const mod = new vm.SourceTextModule(code);
  await mod.link(() => {});
  await mod.evaluate();
  expect(mod.namespace.default).toMatchSnapshot();
});
