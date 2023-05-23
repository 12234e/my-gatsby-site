import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import './blog-page.css'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {
        data.allMdx.nodes.map(node => {
          const image = getImage(node.frontmatter.hero_image)

          return (
            <article key={node.id}>
              <h2 className="blog-title">
                <Link className="blog-link" to={`/blog/${node.frontmatter.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h2>
              <GatsbyImage
                className="blog-post-image"
                image={image}
                alt={node.frontmatter.hero_image_alt}
              />
              <p className="blog-posted">Posted: {node.frontmatter.date}</p>
              <p className="blog-excerpt">{node.excerpt}</p>
            </article>
          )
        })}
    </Layout>
  )
}

export const query = graphql`
 query {
  allMdx(sort: { frontmatter: { date: DESC }}) {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
        slug
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        hero_image_alt
      }
      id
      excerpt
    }
  }
}
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage

