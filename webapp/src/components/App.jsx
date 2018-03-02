import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TagWriter from "./TagWriter";

const Landing = () => [
  <h2 key="1">
    <a href="/tagwriter">Tag Writer</a>
  </h2>,
  <h2 key="2">
    <a href="/tag2">tag2</a>
  </h2>
];
const Dashboard = () => <h2>Dashboard</h2>;
const Surveynew = () => <h2>Surveynew</h2>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/tagwriter" component={TagWriter} />
          <Route exact path="/tag2" component={Surveynew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
