import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "8080";

export { HOST, PORT};