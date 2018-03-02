import React from "react";
const qs = require("query-string");

class TagWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const parsed = qs.parse(props.location.search);
    if (!parsed.m) return;
    const infos = parsed.m.split("x");
    if (infos[0]) {
      this.state.uid = infos[0];
    }
    if (infos[1]) {
      this.state.counter = infos[1];
    }
  }
  render() {
    let { uid, counter } = this.state;
    uid = uid || "need uid";
    counter = counter || "need counter";
    return (
      <div>
        <div style={{ margin: "15px 0px" }} className="row">
          <div className="col s12 orange darken-1 center">Tag Information</div>
        </div>
        <div style={{ margin: "15px 0px" }} className="row">
          <div className="col s3 grey lighten-1">Your UID</div>
          <div className="col s9 grey lighten-2">{uid}</div>
        </div>
        <div style={{ margin: "15px 0px" }} className="row">
          <div className="col s3 grey lighten-1">Counter</div>
          <div className="col s9 grey lighten-2">{counter}</div>
        </div>
      </div>
    );
  }
}

export default TagWriter;
