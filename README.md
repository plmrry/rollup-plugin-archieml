[npm]: https://img.shields.io/npm/v/rollup-plugin-archieml
[npm-url]: https://www.npmjs.com/package/rollup-plugin-archieml
[size]: https://packagephobia.now.sh/badge?p=rollup-plugin-archieml
[size-url]: https://packagephobia.now.sh/result?p=rollup-plugin-archieml

[![npm][npm]][npm-url]
[![size][size]][size-url]

# rollup-plugin-archieml

A Rollup plugin which converts [ArchieML](http://archieml.org/) files into JavaScript modules.

## Install

```console
npm install rollup-plugin-archieml --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import archieml from "rollup-plugin-archieml";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [archieml()],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Practical Example

Given an ArchieML file called `events.aml`:

```
[+events]
  header: My Birthday
  date: August 20th, 1990

  Here's a nice photo

  {.image}
    src: http://example.com/photo.png
    alt: Family Photo
    [.members]
      * Dad
      * Mom
      * Me
    []
  {}
[]
```

Using this plugin, we can `import` (or `require`) the ArchieML file directly:

```js
import events from "./events.aml";

console.dir(events, { depth: null });
// {
//   events: [
//     { type: 'header', value: 'My Birthday' },
//     { type: 'date', value: 'August 20th, 1990' },
//     { type: 'text', value: "Here's a nice photo" },
//     {
//       type: 'image',
//       value: {
//         src: 'http://example.com/photo.png',
//         alt: 'Family Photo',
//         members: [ 'Dad', 'Mom', 'Me' ]
//       }
//     }
//   ]
// }
```
