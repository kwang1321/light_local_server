import "react-table/react-table.css";
import React from "react";
import ReactTable from "react-table";
import axios from "axios";
import { RFID, convertToDateString } from "../consts";
import Header from "./Header";

class UHFTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.get(`${RFID.RFID_URL}${RFID.UHF}`).then(res => {
      this.setState({ data: res.data });
    });
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
        Cell: props => <span>{convertToDateString(props.value)}</span> // Custom cell components!
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
    const defaultSorted = [
      {
        id: "timestamp",
        desc: true
      }
    ];
    return (
      <div>
        <Header left="Main" url="/">
          Data of UHF
        </Header>
        <ReactTable
          data={data}
          columns={columns}
          defaultSorted={defaultSorted}
        />;
      </div>
    );
  }
}

export default UHFTable;
