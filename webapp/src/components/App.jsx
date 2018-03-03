import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TagWriter from "./TagWriter";
import UHFTable from "./UHFTable";

const Landing = () => (
  <div className="collection grey darken-2">
    <a href="/tagwriter?m=00000000000x00000" className="collection-item">
      Tag Writer
    </a>
    <a href="/uhf" className="collection-item">
      UHF DATA TABLE
    </a>
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/tagwriter" component={TagWriter} />
          <Route exact path="/uhf" component={UHFTable} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
