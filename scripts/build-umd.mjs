import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import fs from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");

async function buildOne({
  input,
  outFile,
  globalName,
  prod,
  external = [],
  globals = {},
}) {
  const bundle = await rollup({
    input,
    external,
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
        exportConditions: ["browser", "module", "default"],
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(
          prod ? "production" : "development"
        ),
      }),
      prod && terser(),
    ].filter(Boolean),
    onwarn(warning, warn) {
      // deixa passar warnings normais; ajusta se quiseres ser mais “strict”
      warn(warning);
    },
  });

  await bundle.write({
    file: outFile,
    format: "iife",
    name: globalName, // window[globalName] = ...
    sourcemap: !prod,
    globals, // mapping de externals -> globais
    exports: "default", // porque os entrypoints exportam default
  });

  await bundle.close();
}

async function main() {
  const packageJson = JSON.parse(
    await fs.readFile(new URL("../package.json", import.meta.url), "utf-8")
  );

  const reactVersion = packageJson.dependencies.react;
  const reactDomVersion = packageJson.dependencies["react-dom"];

  console.log(
    `Building React UMD bundles for React ${reactVersion} and ReactDOM ${reactDomVersion}...`
  );

  console.log("1. Cleaning dist/ directory...");
  await fs.rm(distDir, { recursive: true, force: true });

  console.log("2. Creating dist/ directory...");
  await fs.mkdir(distDir, { recursive: true });

  console.log(`3. Building UMD bundle react.development.js...`);
  // React (standalone)
  await buildOne({
    input: "src/react.entry.js",
    outFile: `dist/react.development.js`,
    globalName: "React",
    prod: false,
  });

  console.log(`4. Building UMD bundle react.min.js...`);
  await buildOne({
    input: "src/react.entry.js",
    outFile: `dist/react.min.js`,
    globalName: "React",
    prod: true,
  });

  console.log(`5. Building UMD bundle react-dom.development.js...`);
  // ReactDOM (depende de React global)
  await buildOne({
    input: "src/react-dom.entry.js",
    outFile: `dist/react-dom.development.js`,
    globalName: "ReactDOM",
    prod: false,
    external: ["react"], // não duplica React
    globals: { react: "React" }, // usa window.React
  });

  console.log(`6. Building UMD bundle react-dom.min.js...`);
  await buildOne({
    input: "src/react-dom.entry.js",
    outFile: `dist/react-dom.min.js`,
    globalName: "ReactDOM",
    prod: true,
    external: ["react"],
    globals: { react: "React" },
  });

  console.log(
    `✅ Built: dist/react.min.js + dist/react-dom.min.js (+ dev builds) for UMD.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
