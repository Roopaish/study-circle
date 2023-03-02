import PocketBase from "pocketbase";

export const url = "http://localhost:8090";
export const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;

const pb = new PocketBase(url);

export default pb;
