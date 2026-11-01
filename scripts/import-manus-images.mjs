#!/usr/bin/env node
/**
 * Copies the site's images out of Manus hosting into client/public/images/,
 * so the GitHub Pages site no longer depends on Manus.
 *
 * Usage: node scripts/import-manus-images.mjs [live-site-url]
 *   live-site-url  the site still running on Manus (default below); its
 *                  /manus-storage/... links redirect to the stored files.
 *
 * Files already present are skipped. Exits with code 1 if any download failed.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const site = (process.argv[2] || "https://menichu.khwestcliff.org").replace(/\/+$/, "");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "scripts/manus-images.json"), "utf8")
);
const outDir = path.join(root, "client/public/images");
fs.mkdirSync(outDir, { recursive: true });

let failed = 0;
for (const [name, source] of Object.entries(manifest)) {
  const dest = path.join(outDir, name);
  if (fs.existsSync(dest)) {
    console.log(`skip  ${name} (already present)`);
    continue;
  }
  const url = source.replace("{SITE}", site);
  try {
    const res = await fetch(url, { redirect: "follow" });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (type.startsWith("text/html")) throw new Error("got an HTML page, not an image");
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`ok    ${name}`);
  } catch (err) {
    failed++;
    console.error(`FAIL  ${name} <- ${url}: ${err.message}`);
  }
}

console.log(`\n${Object.keys(manifest).length - failed} of ${Object.keys(manifest).length} images in place.`);
if (failed) process.exit(1);
