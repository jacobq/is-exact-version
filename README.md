# is-exact-version

[![npm version][npm-image]][npm-url]
[![build status][gh-actions-image]][gh-actions-url]
[![CodeClimate maintainability rating (percent)][code-climate-image]][code-climate-url]
[![test coverage][codecov-image]][codecov-url]
[![This project uses conventional commits][conventional-commits-image]][conventional-commits-url]

This module is a complete re-write of [bendrucker/exact-version](https://github.com/bendrucker/exact-version).
It drops support for end-of-life versions of node, is written in TypeScript, and uses Jest for testing.

## Why another library?

I needed something more consistent and complete
(e.g. behavior matching package.json version range string spec, including support for "commitish" values),
and I first attempted to [make a PR](https://github.com/bendrucker/exact-version/pull/1)
but then was met with belligerence.
Making my own implementation seemed the more civil course of action than engaging in an argument.

## Why should I use this library?

* Uses node's own [`semver`](https://www.npmjs.com/package/semver) module as much as possible,
  and consequently uses no [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  of its own.
* `strictNullChecks` & `noImplicitAny` are both enabled in [`tsconfig.json`](tslint.json).
* Thorough test suite clearly indicates behavior.

## Usage

*Example*: ([try it on RunKit](https://npm.runkit.com/is-exact-version))
 
```js
import { isExactVersion } from "is-exact-version";

const examples = [
  '^1.0.0',
  '~1.1.0',
  '1.1.1',
  '1.0.0-beta.1',
  'user/is-exact-version#commit'
];
for (const s of examples) {
  console.log(`${s} -> ${isExactVersion(s)}`);
}

// Log:
// "^1.0.0 -> false"
// "~1.1.0 -> false"
// "1.1.1 -> true"
// "1.0.0-beta.1 -> true"
```

## Support / questions

If you have any questions or suggestions related to this module feel free to create a new issue.
However, it should be noted that I have not actually needed to use this module for a long time,
and the main reason I keep it around is for practice
("[kata](https://www.soapui.org/testing-dojo/testing-katas/what-are-testing-katas/)" if you will),
e.g. learning to use
[GitHub Actions](https://github.com/features/actions)
as well as
[ESM](https://nodejs.org/api/esm.html) in [TypeScript](https://www.typescriptlang.org/docs/handbook/esm-node.html).

## Development

This package uses [visionmedia/debug](https://github.com/visionmedia/debug)
and will output debugging information if the `DEBUG` environment variable
enables `is-exact-version`. e.g.

```sh
$ DEBUG=is-exact-version node some-app.js
```

This project also strives to adhere to the [conventional commits standard](https://www.conventionalcommits.org/).

## License

This project is licensed under the terms of the open source MIT License.
See [`LICENSE`](LICENSE) for the complete text.

[npm-image]: https://img.shields.io/npm/v/is-exact-version.svg?style=flat-square
[npm-url]: https://npmjs.org/package/is-exact-version
[gh-actions-image]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fjacobq%2Fis-exact-version%2Fbadge&style=flat-square
[gh-actions-url]: https://actions-badge.atrox.dev/jacobq/is-exact-version/goto
[code-climate-image]: https://img.shields.io/codeclimate/maintainability-percentage/jacobq/is-exact-version.svg?style=flat-square
[code-climate-url]: https://codeclimate.com/github/jacobq/is-exact-version
[codecov-image]: https://img.shields.io/codecov/c/github/jacobq/is-exact-version.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/jacobq/is-exact-version
[conventional-commits-image]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square
[conventional-commits-url]: https://conventionalcommits.org
