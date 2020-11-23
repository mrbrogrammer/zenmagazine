const config = {
  siteTitle: "Zen | Magazine for City Boys",
  siteTitleShort: "Zen",
  siteTitleAlt: "Zen Magazine",
  siteLogo: "/logos/zen-logo.png",
  /* I have to figure this out, probably personalize the cdn domian */
  siteUrl: "https://gatsby-advanced-starter-demo.netlify.com", // Domain of your website without pathPrefix.
  pathPrefix: "/",
  siteDescription: "Magazine for City Boys",
  siteRss: "/rss.xml",
  siteRssTitle: "Zen Magazine RSS feed",
  siteFBAppID: "1825356251115265",
  googleAnalyticsID: "UA-47311644-5",
  /* might have to redo this -> */
  disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  dateFromFormat: "YYYY-MM-DD",
  dateFormat: "DD/MM/YYYY",
  postsPerPage: 100,
  userName: "Simphiwe Madi",
  userEmail: "simphiwe.madi@yahoo.com",
  userInstagram: "zen_magazine",
  userReddit: "zen_magazine",
  userLocation: "Johannesburg",
  /* design an avatar */
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Vagr9K/gatsby-advanced-starter",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://instagram.com/zen_magazine",
      iconClassName: "fa fa-instagram"
    },
    {
      label: "Email",
      url: "mailto:simphiwe.madi@yahoo.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "© Copyright Zen | All Rights Reserved",
  themeColor: "#fff",
  backgroundColor: "#e0e0e0"
};

// Validate

if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
