import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './Legend.css';

class Legend extends MapControl {
    state = {
      isLoaded: true,
      trend: [],
      location: [],
    };
    
    createLeafletElement(props) {}
    
    componentWillUnmount(){
      
    }

    async componentDidMount() {
      
        const url = 'http://localhost:8080/'
        const response= await fetch(url);
        const data = await response.json()
        this.setState({trend: data[0].trends, isLoaded:false, location:data[0]})
        console.log(this.props.condi)
        
        const legend = L.control({ position: "topleft" });
        
        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend");
          let labels = [];
          for (let i = 0; i < 10; i++) {
            labels.push(
              i+1+'.'+' '+ this.state.trend[i].name
            );   
          }
      
          div.innerHTML = labels.join("<br>");
          return div;
        };

        const { map } = this.props.leaflet;
        legend.addTo(map);
        
        if(this.props.condi==false){
          legend.getContainer().innerHTML=""
          }
    }
}

export default withLeaflet(Legend);

