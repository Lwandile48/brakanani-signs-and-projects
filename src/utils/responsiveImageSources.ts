import { IMAGE_VARIANT_WIDTHS } from '../data/imageVariants.generated';

export interface ResponsiveImageSources {
  src: string;
  srcSet: string;
}

export function responsiveImageSources(name: string, largeWidth = 1200): ResponsiveImageSources {
  const normalizedName = name
    .replace(/\.(jpe?g|png)$/i, '')
    .replace(/\\/g, '/');
  const encodedName = normalizedName.split('/').map(encodeURIComponent).join('/');
  const path = `/images/${encodedName}`;
  const availableWidths = IMAGE_VARIANT_WIDTHS[normalizedName];
  const sourceWidths = availableWidths
    ? availableWidths.filter((width) => width <= largeWidth)
    : [480, 960, largeWidth];
  const widths = sourceWidths.length > 0
    ? sourceWidths
    : availableWidths?.slice(0, 1) ?? [480, 960, largeWidth];
  const fallbackWidth = widths.filter((width) => width <= 960).at(-1) ?? widths[0];

  return {
    src: `${path}-${fallbackWidth}.webp`,
    srcSet: widths.map((width) => `${path}-${width}.webp ${width}w`).join(', '),
  };
}
