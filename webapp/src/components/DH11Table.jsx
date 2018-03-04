import "react-table/react-table.css";
import React from "react";
import ReactTable from "react-table";
import axios from "axios";
import { LIGHT_LOCAL } from "../consts";
import Header from "./Header";
const qs = require("query-string");

class DH11Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const parsed = qs.parse(props.location.search);
    const id = parsed.id || "dh11_xyzpp_sdfdsf_fx231";
    const ts = parsed.ts || Date.now();
    this.state = { id, ts };
  }

  async componentDidMount() {
    const { id, ts } = this.state;
    const queryStr = `?id=${id}&ts=${ts}`;
    const res = await axios.get(
      `${LIGHT_LOCAL.URL}${LIGHT_LOCAL.DH11}${queryStr}`
    );
    this.setState({ data: res.data });
  }

  render() {
    const { data } = this.state;

    const columns = [
      {
        Header: "Device Id",
        accessor: "device_id"
      },
      {
        Header: "Time",
        accessor: "time_stamp",
        Cell: props => (
          <span>{new Date(props.value).toLocaleString("en-GB")}</span>
        )
      },
      {
        Header: "Temperature",
        accessor: "info.temperature",
        maxWidth: 100
      },
      {
        Header: "Humidity",
        accessor: "info.humidity",
        maxWidth: 100
      }
    ];
    const defaultSorted = [
      {
        id: "time_stamp",
        desc: true
      }
    ];
    return (
      <div>
        <Header left="Main" url="/">
          Data of DH11
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

export default DH11Table;
