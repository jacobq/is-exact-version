import * as semver from 'semver';

const wildcardStrings = ['', '*'];

export function isExactVersion(versionString: any) : boolean {
    const isWildcard = wildcardStrings.some(s => s === versionString);
    if (isWildcard) {
        return false;
    }

    throwIfInputIsInvalid(versionString);

    // Clean removes leading and trailing whitespace & returns null for ranges
    const cleanedVersionString = semver.clean(versionString);
    if (cleanedVersionString === null) {
        return false;
    }
    if (versionString !== cleanedVersionString) {
        return isExactVersion(cleanedVersionString);
    }

    return true;
}


function throwIfInputIsInvalid(versionString: any) : void {
    const isString = typeof versionString === 'string';
    if (!isString) {
        throw Error(`First argument must be a string (was ${JSON.stringify(versionString)} which has type ${typeof versionString})`);
    }

    const coercedVersion = semver.coerce(versionString);
    const isValid = coercedVersion !== null && semver.valid(coercedVersion) !== null;
    if (!isValid) {
        throw Error(`Received invalid version string (semver.clean(${JSON.stringify(versionString)}) = ${coercedVersion}`);
    }
}
