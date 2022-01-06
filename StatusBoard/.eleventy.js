// https://www.11ty.dev/docs/config/

// https://www.11ty.dev/docs/data-custom/#a-custom-json-file-extension
https: module.exports = (eleventyConfig) => {
  eleventyConfig.addDataExtension("geojson", (contents) => JSON.parse(contents))
  eleventyConfig.addPassthroughCopy("./css")
  eleventyConfig.addPassthroughCopy("./js")
}
