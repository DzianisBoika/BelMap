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
    const url = "https://api.twitter.com/1.1/trends/place.json";
    
    fetch(url,{
      method:"GET",
      headers: {
        "Authorization": "QDm4JjnOjkYh8dc38lb5vC2tVkFCswenVi9P1Ao9PnxWUV7znk",
      }
    })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });
        
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

