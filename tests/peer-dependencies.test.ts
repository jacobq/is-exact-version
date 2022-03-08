let isDebugModulePresent: boolean;
jest.mock('debug', () => {
  const { actualDefault } = jest.requireActual('debug');
  return {
    __esModule: true,
    default() {
      if (isDebugModulePresent) {
        return actualDefault;
      } else {
        throw Error(`isDebugModulePresent=${isDebugModulePresent} (we're pretending that the debug module isn't available) :-P`);
      }
    },
  };
});

import { isExactVersion } from '../src/is-exact-version';

describe('peerDependencies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it(`Functions with debug module`, () => {
    isDebugModulePresent = true;
    expect(isExactVersion("1.0.0")).toStrictEqual(true);
  });
  it(`Functions without debug module`, () => {
    isDebugModulePresent = false;
    expect(isExactVersion("1.0.0")).toStrictEqual(true);
  });
});
