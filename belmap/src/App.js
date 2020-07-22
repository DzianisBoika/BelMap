import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer, GeoJSON,} from 'react-leaflet';
import belGeoJSON from "./BelGeoJSON/custom.geo.json";
import Legend from "./Legend";
import './App.css';


class App extends Component {
  state = {
    name: 'Бумеранг не запущен',
    style : {color : "white", weight:0},
    key : 0,
    legend : false 
  };

  onMouseOut = (e) => {
    this.settingOfColor("white",2,false)
  }

  onMouseOver = (e) => {  
    this.settingOfColor("green",1,true)
  }
  
  settingOfColor(colo, key, leg){
    this.setState({
       style : {color: colo},
       key : key,
       legend : leg,
    });
    }

  render() {

    return (
      <LeafletMap
        center={[53.715076,28.23800]}
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
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
          { this.state.legend ? <Legend condi={true}/> : null}
      </LeafletMap>
    );
  }
}

export default App