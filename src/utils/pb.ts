import PocketBase from "pocketbase";

export const url = "http://127.0.0.1:8090/";

const pb = new PocketBase(url);

export default pb;
