// @sts-nocheck
import { existsSync, promises as fs, readFileSync } from "fs";
import path, { basename } from "path";
import { rimraf } from "rimraf";

import { registry } from "../registry/registry";
import { Registry, registrySchema } from "../registry/schema";

const REGISTRY_PATH = path.join(process.cwd(), "public/registry");

// ----------------------------------------------------------------------------
// Build __registry__/index.tsx.
// ----------------------------------------------------------------------------
async function buildRegistry(registry: Registry) {
  console.log(" ⚒️ Building registry...");

  let index = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
`;

  index += `  "components": {`;

  // Build style index.
  for (const item of registry) {
    const resolveFiles = item.files.map(
      (file) => `@/../../packages/ui/src/components/${file}`,
    );

    let sourceFilename = "";

    index += `
    "${item.name}": {
      name: "${item.name}",
      type: "${item.type}",
      registryDependencies: ${JSON.stringify(item.registryDependencies)},
      component: React.lazy(() => import("@/../../packages/ui/src/components/${item.name}")),
      source: "${sourceFilename}",
      files: [${resolveFiles.map((file) => `"${file}"`)}],
      category: "${item.category}",
      subcategory: ${JSON.stringify(item.subcategory)}
    },`;
  }

  index += `
  },`;

  index += `
}
`;

  // ----------------------------------------------------------------------------
  // Build registry/index.json.
  // ----------------------------------------------------------------------------
  const names = registry.filter((item) => item.type === "components:ui");
  const registryJson = JSON.stringify(names, null, 2);
  rimraf.sync(path.join(REGISTRY_PATH, "index.json"));
  await fs.writeFile(
    path.join(REGISTRY_PATH, "index.json"),
    registryJson,
    "utf8",
  );

  console.log("✅ Registry built!");
}

// ----------------------------------------------------------------------------
// Build registry/styles/[style]/[name].json.
// ----------------------------------------------------------------------------
async function buildStyles(registry: Registry) {
  console.log(" ⚒️ Building styles...");

  const targetPath = path.join(REGISTRY_PATH);

  // Create directory if it doesn't exist.
  if (!existsSync(targetPath)) {
    await fs.mkdir(targetPath, { recursive: true });
  }

  // Create directory if it doesn't exist.
  for (const item of registry) {
    console.log(` |- ${item.name} `);

    if (item.type !== "components:ui") {
      continue;
    }

    const files = item.files?.map((file) => {
      let content = readFileSync(
        path.join("../../packages/ui/src/components", file),
        "utf8",
      );

      // Remove single-line comments, excluding URLs
      content = content.replace(/(^|[^:])\/\/.*$/gm, "$1");

      // Remove multi-line comments
      content = content.replace(/\/\*[\s\S]*?\*\//gm, "");

      // Remove lines that are completely empty (after removing comments)
      // content = content.replace(/^\s*\n/gm, "");

      return {
        name: basename(file),
        content,
      };
    });

    const payload = {
      ...item,
      files,
    };

    await fs.writeFile(
      path.join(targetPath, "components", `${item.name}.json`),
      JSON.stringify(payload, null, 2),
      "utf8",
    );
  }

  console.log("✅ Styles built!");
}

try {
  const result = registrySchema.safeParse(registry);

  if (!result.success) {
    console.error(result.error);
    process.exit(1);
  }

  await buildRegistry(result.data);
  await buildStyles(result.data);

  console.log("✅ All done!");
} catch (error) {
  console.error(error);
  process.exit(1);
}
