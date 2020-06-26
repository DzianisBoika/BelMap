import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css';

class Legend extends MapControl {
  
    createLeafletElement(props) {}
    constructor() {
        super();
        this.state = { users: [] };
      }

    
    componentDidMount() {
        
    const legend = L.control({ position: "topleft" });

    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(json => this.setState({ users: json.data }));
        
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const info = ['Господи',' бресте', 'ОМОН', 'ссср', '#моягодовщинавтвиттере', 'Поздравляю', 'оооо','#Emergency1975HauntsIndia','#IdRather_ThanVoteForTrump','#JBalvinIsOverParty'];
      let labels = [];
        
      for (let i = 0; i < info.length; i++) {

        labels.push(
            i+1+'.'+' '+info[i]
            
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

