type ZeroOrOne = 0 | 1;

// `value = 0` to use dedicated backend api
// `value = 1` to use mock backend api
const value: ZeroOrOne = 0;

export const useMock = value ? true : false;
