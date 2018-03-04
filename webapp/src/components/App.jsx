import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NFCTag from "./NFCTag";
import UHFTable from "./UHFTable";
import NFCTable from "./NFCTable";
import DH11Table from "./DH11Table";
import Landing from "./Landing";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/tagwriter" component={NFCTag} />
          <Route exact path="/uhf" component={UHFTable} />
          <Route exact path="/nfc" component={NFCTable} />
          <Route exact path="/dh11" component={DH11Table} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
