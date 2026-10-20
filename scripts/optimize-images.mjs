import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = path.join(projectRoot, 'src', 'assets', 'images');
const outputDirectory = path.join(projectRoot, 'public', 'images');
const widths = [480, 960];

await mkdir(outputDirectory, { recursive: true });

const sourceFiles = (await readdir(sourceDirectory))
  .filter((file) => /\.(jpe?g|png)$/i.test(file));

if (sourceFiles.length === 0) {
  throw new Error(`No source images found in ${sourceDirectory}`);
}

for (const file of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, file);
  const image = sharp(sourcePath);
  const metadata = await image.metadata();

  if (!metadata.width) {
    throw new Error(`Could not read image width for ${sourcePath}`);
  }

  const name = path.parse(file).name;
  const imageWidths = widths.filter((width) => width < metadata.width);
  imageWidths.push(metadata.width);

  for (const width of [...new Set(imageWidths)]) {
    await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(path.join(outputDirectory, `${name}-${width}.webp`));
  }
}

console.log(`Optimized ${sourceFiles.length} images into ${outputDirectory}`);
