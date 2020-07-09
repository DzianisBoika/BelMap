import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css';

class Legend extends MapControl {
  
    createLeafletElement(props) {}
    constructor(props) {
        super(props);
        this.state = { 
        
        }
      }

    
    componentDidMount() {
    const legend = L.control({ position: "topleft" });
    const{ data}=this.props
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      var info = ['Господи',' бресте', 'ОМОН', 'ссср', '#моягодовщинавтвиттере', 'Поздравляю', 'оооо','#Emergency1975HauntsIndia','#IdRather_ThanVoteForTrump','#JBalvinIsOverParty'];
      let labels = [];
      
     for (let i = 0; i < info.length; i++) {
        labels.push(
             i+1+'.'+' '+ data[i]
        );
       
        
      }
      console.log(data)
      console.log(info)

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);

