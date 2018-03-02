import "react-table/react-table.css";
import React from "react";
import ReactTable from "react-table";
import axios from "axios";

class TagTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getDate = this.getDate.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://7x4xxa5z82.execute-api.us-west-2.amazonaws.com/rfid/")
      .then(res => {
        res.data.sort((d1, d2) => d2.timestamp - d1.timestamp);
        this.setState({ data: res.data });
      });
  }

  getDate(timestamp) {
    var date = new Date(timestamp);

    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  render() {
    const { data } = this.state;

    const columns = [
      {
        Header: "EPC Memory",
        accessor: "EPC"
      },
      {
        Header: "Time",
        accessor: "timestamp",
        Cell: props => <span>{this.getDate(props.value)}</span> // Custom cell components!
      },
      {
        Header: "TID Memory",
        accessor: "TID"
      },
      {
        Header: "USR Memory",
        accessor: "USR"
      },
      {
        Header: "lantitude",
        accessor: "lantitude",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: "longitude",
        accessor: "longitude",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      }
    ];
    return <ReactTable data={data} columns={columns} />;
  }
}

export default TagTable;
