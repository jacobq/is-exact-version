import * as debug from 'debug';
import {
  clean, Range,
} from 'semver';

const log = debug('is-exact-version');

const wildcardStrings = ['', '*', 'x', 'x.x', 'x.x.x'];
const localFilePrefixes = ['file:', '/', './', '../', '~/'];

const throwIfNotString = (versionString: any): void => {
  const isString = typeof versionString === 'string';
  if (!isString) {
    throw Error(
      `First argument must be a string (was ${JSON.stringify(
        versionString,
      )} which has type ${typeof versionString})`,
    );
  }
};

export const isExactVersion = (versionString: any) : boolean => {
  log(`called with ${JSON.stringify(versionString)}`);
  throwIfNotString(versionString);

  const trimmedString = versionString.trim();
  log(`trimmedString=${trimmedString}`);

  // Clean returns null in case of range or invalid input
  // so when it's not null we have found something exact
  const cleanedVersionString = clean(trimmedString);
  log(`cleanedVersionString=${cleanedVersionString}`);
  if (cleanedVersionString !== null) {
    return true;
  }

  // If we find a match with a known wildcard then we
  // know it can't be exact
  const isWildcard = wildcardStrings.some(s => s === trimmedString);
  log(`isWildcard=${isWildcard}`);
  if (isWildcard) {
    return false;
  }

  try {
    const range = new Range(trimmedString);
    log('range =', range);
    return false;
  } catch (e) {
    const matchResults = e.message.match(/Invalid comparator/);
    const isExpectedException = matchResults !== null;
    log(`Range constructor threw exception. isExpectedException = ${isExpectedException}`);
  }

  // Local files
  const refersToLocalFiles = localFilePrefixes.some(p => trimmedString.indexOf(p) === 0);
  if (refersToLocalFiles) {
    return true;
  }

  const containsSlash = trimmedString.indexOf('/') !== -1;
  log(`containsSlash = ${containsSlash}`);
  if (containsSlash) {
    const indexOfHash = trimmedString.indexOf('#');
    const containsHash = indexOfHash !== -1;
    if (containsHash) {
      const hash = trimmedString.slice(1 + indexOfHash);
      log(`hash = ${hash}`);
      const prefix = 'semver:';
      const containsSemverPrefix = hash.indexOf(prefix) !== -1;
      if (containsSemverPrefix) {
        const newExpression = hash.slice(prefix.length);
        log(`detected semver expression in commitish. Recursing with newExpression = ${newExpression}`);
        return isExactVersion(newExpression);
      }
      // There isn't a semver prefix, but there was a hash, so this refers to an exact commit-ish
      return true;
    }
    // Using a repository URL without a hash is implicitly treated as master
    return false;
  }

  // If we get this far we are dealing with something considered invalid
  throw Error(`Received invalid version string (${versionString})`);
};

export default isExactVersion;
