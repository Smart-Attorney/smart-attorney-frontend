import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import config from "../../config/firebase-config";

const app = initializeApp(config);
const storage = getStorage(app);

export default storage;
