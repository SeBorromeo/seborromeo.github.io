import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import PageLayout from "../components/layout/PageLayout"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <PageLayout>
      Sebastian Borromeo
      Computer Science Major, Data Science Minor at The University of Virginia
    </PageLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
