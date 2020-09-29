import { MapControl, withLeaflet } from "react-leaflet";
import L, { map } from "leaflet";
import "./Legend.css";
const legend = L.control({ position: "topleft" });
class Legend extends MapControl {
  state = {
    isLoaded: true,
    trend: [],
    location: [],
    numberOfLegend: 0,
  };

  createLeafletElement(props) {}

  componentWillUnmount() {}

  async componentDidUpdate() {
    this.addLegendToMap();
  }

  update(data, div) {
    let labels = [];
    for (let i = 0; i < 10; i++) {
      labels.push(i + 1 + "." + " " + data[i].name);
    }
    div.innerHTML = labels.join("<br>");
  }

  addLegendToMap() {
    if (this.props.condi == 1 && this.state.numberOfLegend == 0) {
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        this.update(this.state.trend, div);
        return div;
      };
      const { map } = this.props.leaflet;
      legend.addTo(map);
      this.setState({ numberOfLegend: 1 });
    } else if (this.props.condi == 0 && this.state.numberOfLegend == 1) {
      const { map } = this.props.leaflet;
      map.removeControl(legend);
      this.setState({ numberOfLegend: 0 });
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8080/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState((state) => {
      return {
        trend: data[0].trends,
        isLoaded: false,
        location: data[0],
      };
    });
  }
}

export default withLeaflet(Legend);

// 'https://fast-savannah-15519.herokuapp.com/'
// 'http://localhost:8080/'
