import { useState, useContext } from "react";
import ReactModal from 'react-modal';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/modal-styles.css";
import ReactLoading from 'react-loading';
import { Map, GoogleApiWrapper } from 'google-maps-react';


export default function GeolocationModal({ geoModalOpen, setGeoModalOpen, post, RenderPosts }) {
    ReactModal.setAppElement('.root');
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [enableLoading, setEnableLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    let img_url;
    let latlon;
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    // function deletePost() {
    //     setEnableLoading(true);
    //     setDisabled(true);
    //     const config = { headers: { Authorization: `Bearer ${userData.token || localUser.token}` } };
        
    //     const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}`, config);

    //     request.then(response => {
    //         setGeoModalOpen(false);
    //         setEnableLoading(false);
    //         setDisabled(false);
    //         RenderPosts();
    //     });

    //     request.catch(error => {
    //         setGeoModalOpen(false);
    //         setEnableLoading(false);
    //         setDisabled(false);
    //         alert("Não foi possível excluir o post, por favor, tente novamente.");
    //     })
    // }

   

    // function showPosition(position) {              
    //     latlon = post.geolocation[0] + "," + post.geolocation[1]; 

    //     img_url = `https://maps.googleapis.com/maps/api/staticmap?center=
    //     "+${latlon}+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY`; 
              
    // } 

    

    if (geoModalOpen && post.geolocation.latitude && post.geolocation.longitude) {  
        console.log("oi")      
      
    }

    // export class MapContainer extends React.Component {}

    // export default GoogleApiWrapper({
    //     apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
    // })(MapContainer)
   
    
    console.log(post.geolocation)
    return(
        <ReactModal
        isOpen={geoModalOpen}
        overlayClassName="Overlay"
        className="Modal"
            >
        {
            enableLoading
            ? <ReactLoading
                type="spinningBubbles"
                color="#FFFFFF"
                width={100}
                height={125}
            />
            :
            <h1>lala</h1>
            
    }
    </ReactModal>
    );

        //     : <Map
        //         google={this.props.google}
        //         zoom={7}
        //         initialCenter={{ lat: -27.0922364, lng: -52.6166878 }}
        //     >
        //     </Map>
        // }
        {/* <div className="buttons">
            <button disabled={disabled} onClick={() => setGeoModalOpen(false)} className='go-back'>Não, voltar</button>
            <button disabled={disabled} onClick={deletePost} className='delete'>Sim, excluir</button>
        </div> */}
       
       
}