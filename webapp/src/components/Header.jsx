import React from "react";

function getLeft(url, left) {
  if (url) {
    return <a href={url}>{left}</a>;
  }
  return <a role="button">&nbsp;</a>;
}

class Header extends React.Component {
  render() {
    const { children, url, left } = this.props;
    return (
      <nav>
        <div className="nav-wrapper green darken-1">
          <a role="button" className="brand-logo center">
            {children}
          </a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>{getLeft(url, left)}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
