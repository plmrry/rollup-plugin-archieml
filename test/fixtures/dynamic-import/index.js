export default async function test() {
  const { default: input } = await import("./input.aml");
  console.dir(input, { depth: null });
  return input;
}
