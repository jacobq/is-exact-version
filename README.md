# is-exact-version

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
  of its own to examine the
* Strict null checks enabled in `tsconfig.json`
* 100% test coverage

## License

This project is licensed under the terms of the open source MIT License.
See [`LICENSE`](LICENSE) for the complete text.
   