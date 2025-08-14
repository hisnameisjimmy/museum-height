const Image = require('@11ty/eleventy-img');

async function imgShortcode(
  src,
  alt,
  widths = [320, 640, 960, 1200, 1800],
  formats = ['avif', 'webp', 'jpeg'],
  sizes = '(min-width: 768px) 768px, 100vw',
) {
  const metadata = await Image(src, {
    widths,
    formats,
    outputDir: './_site/img',
    urlPath: '/img',
  });
  const attrs = { alt, sizes, loading: 'lazy', decoding: 'async' };
  return Image.generateHTML(metadata, attrs, { whitespaceMode: 'inline' });
}

module.exports = function (eleventyConfig) {
  // static assets at site root
  eleventyConfig.addPassthroughCopy({ public: '/' });

  // image shortcode for MD/NJK/11ty.js
  eleventyConfig.addNunjucksAsyncShortcode('img', imgShortcode);
  eleventyConfig.addLiquidShortcode('img', imgShortcode);
  eleventyConfig.addJavaScriptFunction('img', imgShortcode);

  return {
    dir: { input: '.', output: '_site', includes: '_includes' },
    templateFormats: ['html', 'md', 'njk'],
    markdownTemplateEngine: 'njk', // enable shortcodes in .md
  };
};
