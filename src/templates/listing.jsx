import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import Navbar from "../components/Navbar/Navbar.js";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./listing.css";

class Listing extends React.Component {
  constructor() {
    super();
    this.state = {
      filterString: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({filterString: ''});
    }, 1000);
  }


  renderPaging() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
    const nextPage = `/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;

    return (
      <div className="paging-container">
        {!isFirstPage && <Link to={prevPage}>Previous</Link>}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          return (
            <Link
              key={`listing-page-${pageNum}`}
              to={pageNum === 1 ? "/" : `/${pageNum}/`}
            >
              {pageNum}
            </Link>
          );
        })} 
        {!isLastPage && <Link to={nextPage}>Next</Link>}
      </div>
    );
  }

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const { data, pageContext } = this.props;
    const { slug } = pageContext;

    return (
      <Layout>
        {postEdges ?
          <div>
            <Navbar 
              postEdges={postEdges} 
              onTextChange={text => {
                this.setState({filterString: text})
              }}
            />
            <div className="listing-container">
              <div className="posts-container">
                <Helmet title={config.siteTitle} />
                <SEO />
                {postEdges.filter(postEdges =>
                  postEdges.node.frontmatter.title.toLowerCase().includes(
                  this.state.filterString.toLowerCase())
                ).map(post =>
                  <PostListing postEdges={postEdges} />
                )}
              </div>
              {this.renderPaging()}
            </div>
          </div> :
          <div className="wrapper">
            <div className="card-loader card-loader--tabs"></div>
          </div>
        }
      </Layout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt(pruneLength: 10)
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            category
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`;

