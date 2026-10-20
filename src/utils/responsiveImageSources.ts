export interface ResponsiveImageSources {
  src: string;
  srcSet: string;
}

export function responsiveImageSources(name: string, largeWidth = 1200): ResponsiveImageSources {
  const path = `/images/${name}`;

  return {
    src: `${path}-960.webp`,
    srcSet: `${path}-480.webp 480w, ${path}-960.webp 960w, ${path}-${largeWidth}.webp ${largeWidth}w`,
  };
}
