import { DateTime } from "luxon";
import nunjucks from "nunjucks";

export default async function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/humans.txt");
  eleventyConfig.addPassthroughCopy("src/css");

  // Configure Nunjucks
  const env = nunjucks.configure({
    autoescape: true,
  });
  eleventyConfig.setLibrary("njk", env);

  // Add Luxon filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("isoDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "xml"],
  };
}
