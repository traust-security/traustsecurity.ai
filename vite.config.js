import { defineConfig } from "vite";
import docsPlugin from "./tools/docs-plugin.js";

export default defineConfig({ plugins: [docsPlugin()] });
