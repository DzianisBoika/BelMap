import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer} from 'react-leaflet';
import Legend from "./Legend";

class App extends Component {
  render() {
    return (
      <LeafletMap
        center={[53.715076,28.23800]}
        zoom={7.2}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Legend/>
      </LeafletMap>
    );
  }
}

export default App