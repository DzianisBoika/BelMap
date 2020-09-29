import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, GeoJSON } from "react-leaflet";
import belGeoJSON from "../BelGeoJSON/custom.geo.json";
import Legend from "../Legend/Legend";
import "./App.css";
class App extends Component {
  state = {
    style: { color: "white", weight: 0 },
    key: 0,
    legend: false,
  };

  onMouseOut = (e) => {
    this.settingOfColor("white", 2, false, 0);
  };

  onMouseOver = (e) => {
    this.settingOfColor("green", 1, true, 3);
  };

  settingOfColor(colo, key, leg, weight) {
    this.setState((state) => {
      return {
        style: { color: colo, weight: weight },
        key: key,
        legend: leg,
      };
    });
  }

  render() {
    return (
      <LeafletMap
        center={[53.715076, 28.238]}
        zoom={6.0}
        maxZoom={10}
        minZoom={4}
        attributionControl={true}
        zoomControl={false}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <GeoJSON
          key={this.state.key}
          data={belGeoJSON}
          style={this.state.style}
          onMouseOut={this.onMouseOut}
          onMouseOver={this.onMouseOver}
        />
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {this.state.legend ? <Legend condi={1} /> : <Legend condi={0} />}
      </LeafletMap>
    );
  }
}

export default App;
