import { isExactVersion } from '../src/is-exact-version';

// From https://docs.npmjs.com/files/package.json
/*
    'version'   Must match version exactly
    '>version'  Must be greater than version
    '>=version' etc
    '<version'
    '<=version'
    '~version'  "Approximately equivalent to version" See [semver](https://docs.npmjs.com/misc/semver)
    '^version'  "Compatible with version" See [semver](https://docs.npmjs.com/misc/semver)
    '1.2.x'     1.2.0, 1.2.1, etc., but not 1.3.0

    'http://...' See 'URLs as Dependencies' below
    * Matches any version
    "" (just an empty string) Same as *
    version1 - version2 Same as >=version1 <=version2.
    range1 || range2 Passes if either range1 or range2 are satisfied.
    git... See 'Git URLs as Dependencies' below
    user/repo See 'GitHub URLs' below
    tag A specific version tagged and published as tag See npm-dist-tag
    path/path/path See Local Paths below
*/

const baseURLs = [
  'jquant/is-exact-version.git',
  'github.com:jquant/is-exact-version.git',
  'git@github.com:jquant/is-exact-version.git',
  'https://github.com:jquant/is-exact-version.git',
  'git+https://github.com:jquant/is-exact-version.git',
  'git+ssh://git@github.com:jquant/is-exact-version.git'
];

const generateUrls = (baseURLs: string[], refs: string[]) => {
  return baseURLs.reduce((urls: string[], baseURL) => {
    return urls.concat(refs.map(ref => `${baseURL}${ref}`))
  }, [])
};

interface TestGroup {
  name: string;
  skip?: boolean;
  inputs: string[];
}

describe('Exact', () => {
    [{
        name: 'Simple',
        inputs: [
            '1.0.0',
            '2.30.0',
            '3.4.50',
        ],
    }, {
        name: "Leading '=' or 'v'",
        inputs: [
            '=1.0.0',
            'v1.0.0',
        ],
    }, {
        name: 'Pre-release tags',
        inputs: [
            '4.0.0-beta.1',
        ],
    }, {
        name: 'Local paths',
        skip: true,
        inputs: [
            '../foo/bar',
            '~/foo/bar',
            './foo/bar',
            '/foo/bar',
            'file:../foo/bar',
        ],
    }, {
        name: 'Commit-ish',
        skip: true,
        inputs: generateUrls(baseURLs, [
          '#master',
          '#something-with-hyphens',
          '#9bfce8f957a80c93d5c6365377d07a59034c6482',
          '#semver:1.0.0'
        ]),
    }].forEach((group: TestGroup) => {
        const invokation = group.skip ? describe.skip.bind(describe) : describe;
        invokation(group.name, ()=> {
            group.inputs.forEach((versionString: string) => {
                it(versionString, () => {
                    expect(isExactVersion(versionString)).toStrictEqual(true);
                });
            });
        });
    });
});

describe('Not exact', ()=> {
    [{
        name: 'Ranges',
        inputs: [
            '<2.0.0',
            '<=2.0.0',
            '>1.0.0',
            '>=1.0.0',
            '8.9.10 || 8.9.11',
            '2.0.0-beta.1 || >= 2.0.0',
        ],
    }, {
        name: 'Hyphen ranges',
        inputs: [
            '1 - 1.0.5',
        ],
    }, {
        name: 'X-ranges',
        inputs: [
            '1.x',
            '1.0.x',
        ],
    }, {
        name: 'Tilde ranges',
        inputs: [
            '~1.2.3',
            '~1.2',
            '~1',
            '~0.2.3',
            '~0.2',
            '~0',
        ],
    }, {
        name: 'Caret ranges',
        inputs: [
            '^1.2.3',
            '^0.2.3',
            '^0.0.3',
        ],
    }, {
        name: 'Wildcard',
        inputs: [
            '*',
            '',
        ],
    }, {
        name: 'Commit-ish',
        skip: true,
        inputs: generateUrls(baseURLs, [
          '#semver:^5.0',
          '#semver:~1.2.0',
          '#semver:*',
          '#semver:',
          '#semver:2.x'
        ])
    }].forEach((group: TestGroup) => {
        const invokation = group.skip ? describe.skip.bind(describe) : describe;
        invokation(group.name, ()=> {
            group.inputs.forEach((versionString: string) => {
                it(`'${versionString}'`, () => {
                    expect(isExactVersion(versionString)).toStrictEqual(false);
                });
            });
        });
    });
});

describe('Error', () => {
    describe('Non-string', () => {
        [
            undefined,
            null,
        ].forEach((versionString: any) => it(`(invalid) ${JSON.stringify(versionString)}`, () => {
            expect(() => isExactVersion(versionString)).toThrow(/must be a string/);
        }));
    });
    describe('String', () => {
        [
            'a.b.c'
        ].forEach((versionString: string) => it(`(invalid) ${JSON.stringify(versionString)}`, () => {
            expect(() => isExactVersion(versionString)).toThrow(/invalid version/);
        }));
    });
});
