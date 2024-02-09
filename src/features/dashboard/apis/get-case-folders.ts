import MockAPI from "../../../services/mock-backend/mock-api";

const useMockBackend = (path: string) => {
  return MockAPI.get(path);
}

const getCaseFolders = () => {
  return useMockBackend;
}

export {getCaseFolders}