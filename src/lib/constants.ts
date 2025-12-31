import { IS_DEVELOPMENT_MODE } from "@/config";

export const SERVER_URL = IS_DEVELOPMENT_MODE ? "http://localhost:3000" : "https://www.myshowsai.com";
export const SERVER_API_URL = `${SERVER_URL}/api/v1`;