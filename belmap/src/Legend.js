import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css';

class Legend extends MapControl {
  
    createLeafletElement(props) {}

    componentDidMount() {

    const legend = L.control({ position: "topright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const info = [0, 10, 20, 50, 100, 200, 500, 1000];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < info.length; i++) {


        labels.push(
          '<i style="background:' +
            "#800026" +
            '"></i> ' +
            info[i]
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);

