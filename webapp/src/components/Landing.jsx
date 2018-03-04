import React from "react";
import Header from "./Header";

const Landing = () => (
  <div className="collection grey darken-2">
    <Header>RFID</Header>
    <a href="/uhf" className="collection-item">
      UHF DATA TABLE
    </a>
    <a href="/nfc" className="collection-item">
      NFC DATA TABLE
    </a>
    <a href="/dh11" className="collection-item">
      DH11 DATA TABLE
    </a>
  </div>
);
export default Landing;
