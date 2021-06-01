import { useState, useContext, useEffect } from "react";
import ReactModal from 'react-modal';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/geomodal-styles.css";
import ReactLoading from 'react-loading';
import styled from "styled-components";

export default function GeolocationModal({ geoModalOpen, setGeoModalOpen, post, RenderPosts, latitude, longitude }) {
    ReactModal.setAppElement('.root');
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [enableLoading, setEnableLoading] = useState(false);
    const [disabled, setDisabled] = useState(false); 
         
    return(
        <>        
        <ReactModal
        isOpen={geoModalOpen}
        overlayClassName="OverlayGeo"
        className="ModalGeo"
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
            <Content>         
            <Title><h1>{post.user["username"]}</h1></Title>
            <iframe
            width="713"
            height="240"
            frameBorder="0" style={{margin: 0 + 'em'}}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCUAArWaNwCYbpOqwV1PmfeMvOIZbWRuXY&q=${latitude},${longitude}
            &zoom=10
            &maptype=satellite`}
            allowFullScreen>
          </iframe>  
            </Content>         
        }

        <div className="buttons">
            <button disabled={disabled} onClick={() => setGeoModalOpen(false)} className='go-backGeo'>x</button>          
        </div>
    </ReactModal>
    </>
    
    );     
}


const Content = styled.div`
    display: flex;
    flex-direction: column;  
    height: 354px;
    width: 790px;
    padding-left: 60px;
    padding-top: 40px;


`;

const Title = styled.div`
    height: 30px;
    background-color: green;
    display: flex;
    width: 100px;

    h1 {
        font-family: "Oswald";

    }
`;