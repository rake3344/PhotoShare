import path from "path";
import { fileURLToPath } from "url";

/**
 * @description Get the directory name of the current module
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;
