import "react-table/react-table.css";
import React from "react";
import ReactTable from "react-table";
import axios from "axios";
import df from "../common/date_format";

class TagTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formatDate = this.formatDate.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://7x4xxa5z82.execute-api.us-west-2.amazonaws.com/rfid/")
      .then(res => {
        res.data.sort((d1, d2) => d2.timestamp - d1.timestamp);
        this.setState({ data: res.data });
      });
  }

  formatDate(value) {
    return new Date(value).format(df.masks.isoDateTime2);
  }

  render() {
    const { data } = this.state;

    const columns = [
      {
        Header: "EPC Memory",
        accessor: "EPC" // String-based value accessors!
      },
      {
        Header: "Time",
        accessor: "timestamp",
        Cell: props => <span>{this.formatDate(props.value)}</span> // Custom cell components!
      },
      {
        Header: "TID Memory",
        accessor: "TID" // Custom value accessors!
      },
      {
        Header: "USR Memory",
        accessor: "USR" // Custom value accessors!
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
