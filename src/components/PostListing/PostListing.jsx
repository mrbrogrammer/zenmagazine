import React from "react";
import { Link } from "gatsby";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        category: postEdge.node.frontmatter.category,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      postList.map(post => (
        <li className="teaser-wrapper teaser-wrapper--type-post post-status--publish util__bg--grey">
          <article class="TeaserBlock TeaserBlock--style-sans TeaserBlock--layout_direction-ltr">
            <div className="TeaserBlock__content">
              <h2>
                <Link to={post.path} key={post.title}>
                  {post.title}
                </Link>
              </h2>
              <span>MILAN-BASED EDITOR CARLO ANTONELLI VISITS THE PALAZZO DELLE ESPOSIZIONI FOR THE 2020 QUADRIENNALE D'ARTE, AND SENDS OUR EDITOR A POSTCARD. 
              </span>
              <time class="Date">November 16, 2020
                <div class="ClipboardLink">
                  <div class="ClipboardLink__content">
                    <svg width="17" height="22" viewBox="0 0 13 22"><g fill="currentColor"><path id="box" d="M10.916,9C11.79,9,12.5,9.706,12.5,10.575v7.851c0,0.868-0.71,1.575-1.584,1.575 H2.084C1.21,20,0.5,19.294,0.5,18.425v-7.851C0.5,9.706,1.21,9,2.084,9h2.01C4.43,9,4.703,9.271,4.703,9.606 c0,0.335-0.273,0.606-0.609,0.606h-2.01c-0.201,0-0.365,0.163-0.365,0.363v7.851c0,0.2,0.164,0.363,0.365,0.363h8.833 c0.201,0,0.365-0.163,0.365-0.363v-7.851c0-0.2-0.164-0.363-0.365-0.363h-2.01c-0.336,0-0.609-0.271-0.609-0.606 C8.297,9.271,8.57,9,8.906,9H10.916z"></path><path id="arrow" d="M3.574,7.362c-0.246,0.241-0.644,0.241-0.889,0c-0.246-0.241-0.246-0.632,0-0.873l3.37-3.308 C6.169,3.069,6.326,3,6.5,3s0.331,0.069,0.446,0.181l3.37,3.308c0.246,0.241,0.246,0.632,0,0.873 c-0.123,0.12-0.284,0.181-0.445,0.181c-0.161,0-0.322-0.06-0.445-0.181L7.129,5.108v9.275C7.129,14.724,6.847,15,6.5,15 s-0.629-0.276-0.629-0.617V5.108L3.574,7.362z"></path></g></svg>
                  </div>
                </div>
              </time>
            </div>  
          </article>  
        </li>
      ))
    );
  }
}

export default PostListing;
