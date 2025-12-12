import { IS_DEVELOPMENT_MODE } from "@/config";

export const SERVER_URL = IS_DEVELOPMENT_MODE ? "http://localhost:3000" : "http://13.61.87.245";
export const SERVER_API_URL = `${SERVER_URL}/api/v1`;