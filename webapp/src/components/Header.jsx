import React from "react";

function getLeft(url, left) {
  if (url) {
    return <a href={url}>{left}</a>;
  }
  return <a role="button">&nbsp;</a>;
}

function refreshPage() {
  window.location.reload();
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
          <ul className="right hide-on-med-and-down">
            <li>
              <a role="button" onClick={e => refreshPage()}>
                <i className="material-icons">refresh</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
