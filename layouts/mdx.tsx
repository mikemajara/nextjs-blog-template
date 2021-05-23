import * as chakraComponents from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "@components/mdx-components"
import * as React from "react"
import PageContainer from "@components/page-container"

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
  return (
    <MDXLayoutProvider>
      <PageContainer
        frontmatter={frontmatter}
        // headings={headings}
        // sidebar={<Sidebar routes={routes}/>}
      >
        {children}
      </PageContainer>
    </MDXLayoutProvider>
  )
}

export default MDXLayout
