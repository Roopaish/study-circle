import PocketBase from "pocketbase";

export const url = "http://192.168.1.94:8090";

const pb = new PocketBase(url);

export default pb;
