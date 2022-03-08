import { isExactVersion } from '../src/is-exact-version';

interface TestGroup {
  name: string;
  inputs: string[];
  only?: boolean;
  skip?: boolean;
}

const baseURLs = [
  'user/repo',
  'github.com:user123/is-exact-version.git',
  'git@github.com:user123/is-exact-version.git',
  'https://github.com:user123/is-exact-version.git',
  'git+https://github.com:user123/is-exact-version.git',
  'git+ssh://git@github.com:user123/is-exact-version.git',
];

const generateUrls = (baseURLs: string[], refs: string[]) => baseURLs.reduce((urls: string[], baseURL) => urls.concat(refs.map(ref => `${baseURL}${ref}`)), []);

const _describe = (group: TestGroup) => (group.skip ? describe.skip.bind(describe)
  : (group.only ? describe.only.bind(describe) : describe));

describe('Exact', () => {
  [
    {
      name: 'Simple',
      inputs: ['1.0.0', '2.30.0', '3.4.50'],
    },
    {
      name: "Leading '=' or 'v'",
      inputs: ['=1.0.0', 'v1.0.0'],
    },
    {
      name: 'Pre-release tags',
      inputs: ['4.0.0-beta.1'],
    },
    {
      name: 'Local paths',
      inputs: [
        '../foo/bar',
        '~/foo/bar',
        './foo/bar',
        '/foo/bar',
        'file:../foo/bar',
      ],
    },
    {
      name: 'Commit-ish',
      inputs: generateUrls(baseURLs, [
        '#master',
        '#something-with-hyphens',
        '#9bfce8f957a80c93d5c6365377d07a59034c6482',
        '#semver:1.0.0',
      ]),
    },
  ].forEach((group: TestGroup) => {
    _describe(group)(group.name, () => {
      group.inputs.forEach((versionString: string) => {
        it(versionString, () => {
          expect(isExactVersion(versionString)).toStrictEqual(true);
        });
      });
    });
  });
});

describe('Not exact', () => {
  [
    {
      name: 'Ranges',
      inputs: [
        '<2.0.0',
        '<=2.0.0',
        '>1.0.0',
        '>=1.0.0',
        '8.9.10 || 8.9.11',
        '2.0.0-beta.1 || >= 2.0.0',
      ],
    },
    {
      name: 'Hyphen ranges',
      inputs: ['1 - 1.0.5'],
    },
    {
      name: 'X-ranges',
      inputs: ['1.x', '1.0.x'],
    },
    {
      name: 'Tilde ranges',
      inputs: ['~1.2.3', '~1.2', '~1', '~0.2.3', '~0.2', '~0'],
    },
    {
      name: 'Caret ranges',
      inputs: ['^1.2.3', '^0.2.3', '^0.0.3'],
    },
    {
      name: 'Wildcard',
      inputs: ['*', '', 'x.x'],
    },
    {
      name: 'Commit-ish',
      inputs: generateUrls(baseURLs, [
        '',
        '#semver:^5.0',
        '#semver:~1.2.0',
        '#semver:*',
        '#semver:',
        '#semver:2.x',
      ]),
    },
  ].forEach((group: TestGroup) => {
    _describe(group)(group.name, () => {
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
    [undefined, null].forEach((versionString: any) => it(`(invalid) ${JSON.stringify(versionString)}`, () => {
      expect(() => isExactVersion(versionString)).toThrow(/must be a string/);
    }));
  });
  describe('String', () => {
    [
      'a.b.c',
    ].forEach((versionString: string) => it(`(invalid) ${JSON.stringify(versionString)}`, () => {
      expect(() => isExactVersion(versionString)).toThrow(/invalid version/);
    }));
  });
});
