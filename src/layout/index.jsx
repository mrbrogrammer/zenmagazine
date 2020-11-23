import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import "./index.css";
// import Navbar from "../components/Navbar/Navbar";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <span className="route-transition-container">
        <section className="app-section">
          <div id="home" className="Home">
            <div className="Home__feed-container">
              <div className="feed">
                <Helmet>
                  <meta name="description" content={config.siteDescription} />
                  <html lang="en" />
                </Helmet>
                {children}
              </div>
            </div>
          </div>
        </section>
      </span>
    );
  }
}

