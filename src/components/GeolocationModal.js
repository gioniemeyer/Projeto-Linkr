import { useState, useContext, useEffect } from "react";
import ReactModal from 'react-modal';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/modal-styles.css";
import ReactLoading from 'react-loading';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// // import MapContainer from "./MapContainer";



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

        
   

    // if (geoModalOpen && post.geolocation.latitude && post.geolocation.longitude) {  
    //     setLatitude(post.geolocation.latitude)  
    //     setLongitude(post.geolocation.longitude)      
    // }  

    
    // console.log(latitude, longitude)

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
          
            <iframe
            width="450"
            height="250"
            frameBorder="0" style={{marginTop: 1 + 'em'}}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCUAArWaNwCYbpOqwV1PmfeMvOIZbWRuXY&q=${latitude},${longitude}
            &zoom=15
            &maptype=satellite`}
            allowFullScreen>
          </iframe>           
        }

        <div className="buttons">
            <button disabled={disabled} onClick={() => setGeoModalOpen(false)} className='go-back'>Não, voltar</button>          
        </div>
    </ReactModal>
    
    );     
}