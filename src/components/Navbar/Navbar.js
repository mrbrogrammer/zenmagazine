
import React, { Component } from 'react';
import './Navbar.scss';
import Logo from './logo.svg';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  RedditIcon
} from "react-share";
import { Link, graphql } from "gatsby"
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import menuExtend from 'classnames';
import ClassIdeas from 'classnames';
import ClassFashion from 'classnames';
import ClassMusic from 'classnames';
import ClassArt from 'classnames';
import ClassFilm from 'classnames';
import ClassVideos from 'classnames';
import { CSSTransition } from 'react-transition-group';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			menu: false,
			Search: false,
			topicIdeas: false,
			navbarHover: false,
			topicFashion: false,
			topicMusic: false,
			topicArt: false,
			topicFilm: false,
			topicVideos: false,
			freshIdeas: false,
			freshFashion: false,
			freshMusic: false,
			freshArt: false,
			freshFilm: false,
			freshVideos: false,
			searchTransition: false
		};
	}

	/* I want to toggle freshstories when  

	this toggles the menu '=' */
	toggleMenu = () => { this.setState({menu: !this.state.menu}); }
	toggleSearch = () => { this.setState({search: !this.state.search}); }
	togglenavbarHover = () => { this.setState({navbarHover: !this.state.navbarHover}); }
	toggleTopicIdeas = () => { this.setState({topicIdeas: !this.state.topicIdeas, freshIdeas: !this.state.freshIdeas}); }
	toggleTopicFashion = () => { this.setState({topicFashion: !this.state.topicFashion, freshFashion: !this.state.freshFashion}); }
	toggleTopicMusic = () => { this.setState({topicMusic: !this.state.topicMusic, freshMusic: !this.state.freshMusic}); }
	toggleTopicArt = () => { this.setState({topicArt: !this.state.topicArt, freshArt: !this.state.freshArt}); }
	toggleTopicFilm = () => { this.setState({topicFilm: !this.state.topicFilm, freshFilm: !this.state.freshFilm}); }
	toggleTopicVideos = () => { this.setState({topicVideos: !this.state.topicVideos, freshVideos: !this.state.freshVideos}); }
  	toggleSearchTransition = () => { this.setState({searchTransition: !this.state.searchTransition}); }

  	 getFreshList() {
	    const freshList = [];
	    this.props.postEdges.forEach(postEdge => {
	    	freshList.push({
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
	    return freshList;
	}
  	
	render() {
		
		const freshList = this.getFreshList();
		const { freshStories } = this.state;
		const { searchTransition } = this.state;
		const linkClassIdeas = ClassIdeas ({ 'row link--active': this.state.topicIdeas, '': !this.state.topicIdeas })
		const linkClassFashion = ClassFashion ({ 'row link--active': this.state.topicFashion, '': !this.state.topicFashion })
		const linkClassMusic = ClassMusic ({ 'link--active': this.state.topicMusic, '': !this.state.topicMusic })
		const linkClassArt = ClassArt ({ 'link--active': this.state.topicArt, '': !this.state.topicArt })
		const linkClassFilm = ClassFilm ({ 'link--active': this.state.topicFilm, '': !this.state.topicFilm })
		const linkClassVideos = ClassVideos ({ 'link--active': this.state.topicVideos, '': !this.state.topicVideos })
		const menuClass = menuExtend({ 'dropdown-menu': true, 'dropdown-menu--hover': this.state.navbarHover, 'dropdown-menu--quick': !this.navbarHover })
		let headClass = 'navbar navbar--black navbar--collapse'

		if (this.state.menu) headClass += ' navbar--expand';
    	else if (this.state.search || headClass === 'navbar navbar--black navbar--collapse navbar--expand') headClass += ' navbar-search--expand';

		console.log(headClass)
		console.log(menuClass)
		
		const ideas = freshList.filter(post => post.category === "ideas")
		const fashion = freshList.filter(post => post.category === "fashion")
		const music = freshList.filter(post => post.category === "music")
		const art = freshList.filter(post => post.category === "art")
		const film = freshList.filter(post => post.category === "film")
		const videos = freshList.filter(post => post.category === "videos")

		const { mobile } = this.props;
	    const iconSize = mobile ? 28 : 44;
	    const filter = count => (count > 0 ? count : "");
	    const renderShareCount = count => (
	      <div className="share-count">{filter(count)}</div>
	    );

		return (
			<div className={headClass}>
				<div className="Navbar__click-catcher" onClick={this.toggleMenu}></div>
				<div className="Navbar__center" onMouseEnter={this.togglenavbarHover} onMouseLeave={this.togglenavbarHover}>
					<div className="Navbar" style={{windowHeight: '611px'}}>
						<div className="nav">
							<div className="nav-item--left">
								<div className="nav__burger-hit util__display-cursor" onClick={this.toggleMenu}>
									<div className="nav__icon nav__icon--burger"></div>
								</div>
							</div>
							<div className="nav-item--center util__display-cursor nav-logo">
								<a href="/"> 
									<img src={Logo} alt="no_image" style={{width: '80px'}} />
								</a>
							</div>
							<div className="nav-item--right" onClick={() => { 
								this.toggleSearchTransition();
								this.toggleSearch();
							}}>
								<span className="Search"><svg x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16" style={{enableBackground:'new 0 0 16 16'}}><g transform="translate(1 1)" stroke-width="2" fill="none" fillRule="evenodd" style={{stroke:'currentColor'}}><circle cx="6.5" cy="6.5" r="6.5"></circle><path d="M12 12l2 2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg></span>
							</div>
							<div className="navbar-menu" style={{windowHeight:'400px'}}>
								<div className="nav-menu">
									<div onMouseEnter={this.toggleTopicIdeas} onMouseLeave={this.toggleTopicIdeas}>
										<div className={linkClassIdeas}>
											<a aria-current="page" href="/categories/fashion/">Ideas</a>
										</div>
										<div className="container">
											
											<CSSTransition
											in={this.state.freshIdeas}
											timeout={10}
											classNames="row--transition"
											unmountOnExit
											appear
											>
												<div className="row">
											        {ideas.map(post => ( 
										        		<Link className="three columns" to={post.path} key={post.title}>
											        		// <div className="three columns">
												        		<img src="https://source.unsplash.com/random/100x56" alt="img"/>
												        		<div className="para" style={{color: '#000'}}>{post.title}</div>
												        		<div className="para">{post.excerpt}</div>
												        	//</div>
										        		</Link>
											        ))}
												</div>
											</CSSTransition>
										</div>
									</div>
									<div onMouseEnter={() => {this.toggleTopicFashion();}} onMouseLeave={() => {this.toggleTopicFashion();}}>
										<div className={linkClassFashion}>
											<a aria-current="page" href="/categories/fashion" href="/fashion">Fashion</a>
										</div>
										<div className="container">
											<CSSTransition
											in={this.state.freshFashion}
											timeout={10}
											classNames="row--transition"
											unmountOnExit
											>
												<div className="row">
											        {fashion.map(post => ( 
												        <Link className="four columns" to={post.path} key={post.title}>
											        		<img src="https://source.unsplash.com/random/100x56" alt="img"/>
											        		<div className="para" style={{color: '#000'}}>{post.title}</div>
											        		<div className="para">{post.excerpt}</div>
											        	</Link>
											        ))}
												</div>
											</CSSTransition>
										</div>
									</div>
									<div onMouseEnter={() => {this.toggleTopicMusic();}} onMouseLeave={() => {this.toggleTopicMusic();}}>
										<div className={linkClassMusic}>
											<a aria-current="page" href="/music" href="/music">Music</a>
										</div>
										<div className="container">
											<CSSTransition
											in={this.state.freshMusic}
											timeout={50}
											classNames="row--transition"
											unmountOnExit
											>
												<div className="row">
											        {music.map(post => ( 
											        	<div className="four columns">
											        		<img src="https://source.unsplash.com/random/100x56" alt="img"/>
											        		<div className="para" style={{color: '#000'}}>{post.title}</div>
											        		<div className="para">{post.excerpt}</div>
											        	</div>
											        ))}
												</div>
											</CSSTransition>
										</div>
									</div>
									<div onMouseEnter={() => {this.toggleTopicArt();}} onMouseLeave={() => {this.toggleTopicArt();}}>
										<div className={linkClassArt}>
											<a aria-current="page" href="/art&photography" href="/art & Photography">Art & Photography</a>
										</div>
										<div className="container">
											<CSSTransition
											in={this.state.freshArt}
											timeout={50}
											classNames="row--transition"
											unmountOnExit
											>
												<div className="row">
											        {art.map(post => ( 
											        	<div className="four columns">
											        		<img src="https://source.unsplash.com/random/100x56" alt="img"/>
											        		<div className="para" style={{color: '#000'}}>{post.title}</div>
											        		<div className="para">{post.excerpt}</div>
											        	</div>
											        ))}
												</div>
											</CSSTransition>
										</div>
									</div>
									<div onMouseEnter={this.toggleTopicFilm} onMouseLeave={this.toggleTopicFilm}>
										<div className={linkClassFilm}>
											<a aria-current="page" href="/films" href="/films">Film & TV</a>
										</div>
										<div className="container" >
											<CSSTransition
											in={this.state.freshFilm}
											timeout={50}
											classNames="row--transition"
											unmountOnExit
											>
												<div className="row">
											        {film.map(post => ( 
											        	<div className="four columns">
											        		<img src="https://source.unsplash.com/random/100x56" alt="img"/>
											        		<div className="para" style={{color: '#000'}}>{post.title}</div>
											        		<div className="para">{post.excerpt}</div>
											        	</div>
											        ))}
												</div>
											</CSSTransition>
										</div>
									</div>
									<div onMouseEnter={this.toggleTopicVideos} onMouseLeave={this.toggleTopicVideos}>
										<div className={linkClassVideos}>
											<a aria-current="page" href="/videos">Videos</a>
										</div>
										<div className="container">
											<CSSTransition
											in={this.state.freshVideos}
											timeout={50}
											classNames="row--transition"
											unmountOnExit
											>
												<div className="row">
											        {videos.map(post => ( 
											        	<div className="four columns">
											        		<img src="https://source.unsplash.com/random/100x56" alt="img"/>
											        		<div className="para" style={{color: '#000'}}>{post.title}</div>
											        		<div className="para">{post.excerpt}</div>
											        	</div>
											        ))}
												</div>
											</CSSTransition>
										</div>
									</div>
								</div>
								<div className="nav-feature" style={{backgroundColor: '#fff', padding: '10px 20px', marginTop: '20px', borderRadius: '2px'}}>
									<div className="row">
										<RedditShareButton style={{margin: '10px'}}>
								          	<RedditIcon round size={iconSize} />
								        </RedditShareButton>
								        <TwitterShareButton style={{margin: '10px'}}>
								          	<TwitterIcon round size={iconSize} />
								        </TwitterShareButton>
								        <FacebookShareButton style={{margin: '10px'}}>
								          	<FacebookIcon round size={iconSize} />
								          	<FacebookShareCount>
								            	{count => renderShareCount(count)}
								          	</FacebookShareCount>
								        </FacebookShareButton>
								        <LinkedinShareButton style={{margin: '10px'}}
								        >
								          	<LinkedinIcon round size={iconSize} />
								        </LinkedinShareButton>
								        <TelegramShareButton style={{margin: '10px'}}>
								          	<TelegramIcon round size={iconSize} />
								        </TelegramShareButton>
								    </div>
									<div className="nav-feature__Text">
										feature
									</div>
								</div>
								<div className="nav-footer">
									<ul>
										<li><a href="/about">About</a></li>
										<li><a href="/careers">Careers</a></li>
										<li><a href="/contact">Contact</a></li>
									</ul><hr></hr>
									<li><a href="https://Zen.com">© Copyright Zen | All Rights Reserved</a></li>
								</div>
							</div>
						</div>
					</div>
					<div className={menuClass}>
						<div className="dropdown-menu--transition">					
							<CSSTransition
								in={this.state.searchTransition}
								timeout={350}
								classNames="dropdown-menu-notification--transition"
								unmountOnExit
							>
								<div className="SearchBar dropdown-menu-notification--transition">
									<div className="SearchBar__Search">
										<input placeholder="Search" type="text" onKeyUp={event => 
											this.props.onTextChange(event.target.value)}/>
									</div>
								</div>
							</CSSTransition>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default Navbar;
