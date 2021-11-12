import vm from "vm";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { rollup } from "rollup";
import archieml from "..";

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

test.only("converts a dynamically imported aml file", async () => {
  const bundle = await rollup({
    input: `${__dirname}/fixtures/dynamic-import/index.js`,
    plugins: [archieml()],
  });
  await bundle.write({
    dir: `${__dirname}/.output`,
    format: "esm",
  });
  const { default: getOutput } = await import(`${__dirname}/.output/index.js`);
  const output = await getOutput();
  expect(output).toMatchSnapshot();
});
