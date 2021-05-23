const path = require("path")
const withPlugins = require("next-compose-plugins")
const withMdx = require("next-mdx-enhanced")
const { getEditUrl, addLeadingSlash } = require("@docusaurus/utils")

function fileToPath(str) {
  return addLeadingSlash(str.replace(".mdx", ""))
}

const mdxConfig = {
  layoutPath: "layouts",
  defaultLayout: true,
  fileExtensions: ["mdx", "md"],
  remarkPlugins: [
    // require("remark-autolink-headings"),
    // require("remark-emoji"),
    // require("remark-images"),
    // require("remark-slug"),
    // require("remark-toc"),
    // require("remark-unwrap-images"),
  ],
  rehypePlugins: [],
  extendFrontMatter: {
    process: async (_, frontmatter) => {
      const { __resourcePath: mdxPath, author, tags } = frontmatter

      // read the file path
      const filePath = path.join(process.cwd(), "pages", mdxPath)

      // get the last edited author and date
      // const lastEdited = await getLastEdited(filePath)

      // get the edit url
      // const editUrl = getEditUrl(mdxPath, EDIT_URL)

      // get the slug
      const slug = frontmatter.slug || fileToPath(mdxPath)

      // if frontmatter inclues author, add the author's data
      // const authorData = author ? await getUserData(author) : undefined

      return {
        slug,
        // lastEdited,
        // editUrl,
        author,
        tags,
      }
    },
  },
}

module.exports = withPlugins(
  [withMdx(mdxConfig)]
)