import "react-table/react-table.css";
import React from "react";
import ReactTable from "react-table";
import axios from "axios";
import { RFID } from "../consts";
import Header from "./Header";

class NFCTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getDetailLink = this.getDetailLink.bind(this);
  }

  getDetailLink(cellInfo) {
    // console.log("cellInfo", cellInfo);
    const { device_id, counter } = cellInfo.original;
    return (
      <span>
        <a href={`/tagwriter?m=${device_id}x${counter}&active=true`}>
          {device_id}
        </a>
      </span>
    );
  }

  async componentDidMount() {
    const res = await axios.get(`${RFID.RFID_URL}${RFID.NFC}`);
    this.setState({ data: res.data });
  }

  render() {
    const { data } = this.state;

    const columns = [
      {
        Header: "UID",
        accessor: "device_id",
        Cell: cellInfo => this.getDetailLink(cellInfo)
      },
      {
        Header: "Time",
        accessor: "timestamp",
        Cell: props => (
          <span>{new Date(props.value).toLocaleString("en-GB")}</span>
        )
      },
      {
        Header: "Counter",
        accessor: "counter"
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
          Data of NFC
        </Header>
        <ReactTable
          data={data}
          columns={columns}
          defaultSorted={defaultSorted}
        />
      </div>
    );
  }
}

export default NFCTable;
