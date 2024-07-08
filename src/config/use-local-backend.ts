// for local backend

type ZeroOrOne = 0 | 1;

// "value = 0" to use actual backend api
// "value = 1" to use local backend api
const value: ZeroOrOne = 1;

export const useLocalBackend = value ? true : false;
