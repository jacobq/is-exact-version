# is-exact-version

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![CodeClimate maintainability rating (percent)][code-climate-image]][code-climate-url]
[![test coverage][codecov-image]][codecov-url]
[![David (dependency monitor)][david-image]][david-url]
[![npm download][download-image]][download-url]

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
* Strict null checks enabled in [`tsconfig.json`](tslint.json)
* 100% test coverage

## License

This project is licensed under the terms of the open source MIT License.
See [`LICENSE`](LICENSE) for the complete text.

[npm-image]: https://img.shields.io/npm/v/is-exact-version.svg?style=flat-square
[npm-url]: https://npmjs.org/package/is-exact-version
[travis-image]: https://img.shields.io/travis/com/jacobq/is-exact-version/master.svg?style=flat-square
[travis-url]: https://travis-ci.com/jacobq/is-exact-version
[code-climate-image]: https://img.shields.io/codeclimate/maintainability-percentage/jacobq/is-exact-version.svg?style=flat-square
[code-climate-url]: https://codeclimate.com/github/jacobq/is-exact-version
[codecov-image]: https://img.shields.io/codecov/c/github/jacobq/is-exact-version.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/jacobq/is-exact-version
[david-image]: https://img.shields.io/david/jacobq/is-exact-version.svg?style=flat-square
[david-url]: https://david-dm.org/jacobq/is-exact-version
[download-image]: https://img.shields.io/npm/dm/is-exact-version.svg?style=flat-square
[download-url]: https://npmjs.org/package/is-exact-version
