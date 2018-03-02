import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TagWriter from "./TagWriter";
import TagTable from "./TagTable";

const Landing = () => [
  <h2 key="1">
    <a href="/tagwriter?m=00000000000x00000">Tag Writer</a>
  </h2>,
  <h2 key="2">
    <a href="/tagTable">Tag Table</a>
  </h2>
];

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/tagwriter" component={TagWriter} />
          <Route exact path="/tagTable" component={TagTable} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
