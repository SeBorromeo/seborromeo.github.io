import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import PageLayout from "../components/layout/PageLayout"

import '../styles/globalStyle.scss'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <PageLayout>
      <h2>Sebastian Borromeo</h2>
      Computer Science Major, Data Science Minor at The University of Virginia
    </PageLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
