import * as chakraComponents from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "@components/mdx-components"
import * as React from "react"
import PageContainer from "@components/page-container"
import Sidebar from "@components/sidebar/sidebar"
import articlesSidebar from "@configs/articles-sidebar.json"
import { getHeadings } from "@utils/get-headings"

export function getRoutes(slug: string) {
  // for home page, use docs sidebat
  if (slug === "/") return articlesSidebar.routes

  const configMap = {
    "/content": articlesSidebar,
    // "/changelog": docsSidebar,
    // "/guides": guidesSidebar,
    // "/blog": blogSidebar,
    // "/docs": docsSidebar,
  }

  const [_path, sidebar] =
    Object.entries(configMap).find(([path, _sidebar]) =>
      slug.startsWith(path),
    ) ?? []

  return sidebar?.routes ?? []
}

export function MDXLayoutProvider({ children }) {
  return (
    <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
      {children}
    </MDXProvider>
  )
}

interface MDXLayoutProps {
  frontmatter: any
  children: React.ReactNode
}


function MDXLayout(props: MDXLayoutProps) {
  const { frontmatter, children } = props
  const routes = getRoutes(frontmatter.slug)
  const headings = getHeadings(children)

  return (
    <MDXLayoutProvider>
      <PageContainer
        frontmatter={frontmatter}
        headings={headings}
        sidebar={<Sidebar routes={routes}/>}
      >
        {children}
      </PageContainer>
    </MDXLayoutProvider>
  )
}

export default MDXLayout
