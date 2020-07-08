import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer} from 'react-leaflet';
import Legend from "./Legend";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  componentDidMount() {
    var Twitter = require('twitter');

  var client = new Twitter({
   consumer_key: 'NBv8u4VsQmxwsYE9wQlAKnrTY',
      consumer_secret:'8Zgi10TR3qzvGH1PqHVnMGBQx0EY0okyNzfxneZ7Us62EDihNQ',
    access_token_key: '1088155195123662848-22n7PR66IJC3aS8oMA1AdvL2NyPsUR',
    access_token_secret: 'qjW5jQfnYuO5kaQxvl1JEgulxT9Z0BRpU7Yiyuurv84wF'
    });

  var params = {screen_name: 'nodejs'};
  client.get('http://localhost:8080/', params, function(error, tweets, response) {
    if (!error) {
      console.log(JSON.stringify(tweets));
    } else {
      throw error
    }
  })}
  //   var targetUrl = 'http://localhost:8080/'
  //   fetch(targetUrl)
  //   .then(response => response.json())
  //   .then(data => this.setState({hits: data.hits }));
  // }

  render() {
    return (
      <LeafletMap
        center={[53.715076,28.23800]}
        zoom={7.2}
        maxZoom={10}
        attributionControl={true}
        zoomControl={false}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Legend data={this.tweets}/>
      </LeafletMap>
    );
  }
}

export default App