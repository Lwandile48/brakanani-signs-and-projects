import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = path.join(projectRoot, 'src', 'assets', 'images');
const outputDirectory = path.join(projectRoot, 'public', 'images');
const variantManifestPath = path.join(projectRoot, 'src', 'data', 'imageVariants.generated.ts');
const widths = [480, 960, 1200];

async function collectImageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectImageFiles(entryPath));
    } else if (entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

const sourceFiles = await collectImageFiles(sourceDirectory);

if (sourceFiles.length === 0) {
  throw new Error(`No source images found in ${sourceDirectory}`);
}

let optimizedVariants = 0;
const imageVariantWidths = [];

for (const sourcePath of sourceFiles) {
  const image = sharp(sourcePath);
  const metadata = await image.metadata();

  if (!metadata.width) {
    throw new Error(`Could not read image width for ${sourcePath}`);
  }

  const relativePath = path.relative(sourceDirectory, sourcePath);
  const relativeDirectory = path.dirname(relativePath);
  const outputSubdirectory = path.join(outputDirectory, relativeDirectory);
  await mkdir(outputSubdirectory, { recursive: true });

  const name = path.parse(relativePath).name;
  const imageWidths = [...new Set([
    ...widths.filter((width) => width < metadata.width),
    metadata.width,
  ])].sort((a, b) => a - b);
  const imageKey = path.join(relativeDirectory, name).split(path.sep).join('/');
  imageVariantWidths.push([imageKey, imageWidths]);

  for (const width of [...new Set(imageWidths)]) {
    await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(path.join(outputSubdirectory, `${name}-${width}.webp`));
    optimizedVariants += 1;
  }
}

const manifestEntries = Object.fromEntries(imageVariantWidths);
const manifestContents = [
  'export const IMAGE_VARIANT_WIDTHS: Record<string, number[]> = ',
  `${JSON.stringify(manifestEntries, null, 2)};\n`,
].join('');
await writeFile(variantManifestPath, manifestContents, 'utf8');

console.log(`Optimized ${sourceFiles.length} images into ${outputDirectory} (${optimizedVariants} variants)`);
