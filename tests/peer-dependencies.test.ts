// We'd like to make the system behave as if debug was not installed
// without having to
// https://github.com/facebook/jest/issues/10025
jest.mock('debug', () => ({
  __esModule: true,
  default: () => { throw Error("Pretend debug module isn't here"); }
}));

import { isExactVersion } from 'src/is-exact-version';

describe('peerDependencies', () => {
  it(`Functions without debug module`, () => {
    expect(isExactVersion("1.0.0")).toStrictEqual(true);
  });
});
