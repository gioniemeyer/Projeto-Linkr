import { useState, useContext, useEffect } from "react";
import ReactModal from 'react-modal';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/geomodal-styles.css";
import ReactLoading from 'react-loading';
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";


export default function GeolocationModal({ geoModalOpen, setGeoModalOpen, post, RenderPosts, latitude, longitude }) {
    ReactModal.setAppElement('.root');
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [enableLoading, setEnableLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);   
    
    const apiKey = (process.env.REACT_APP_API_KEY);
             
    return(
        <>       
        <ReactModal
        isOpen={geoModalOpen}
        overlayClassName="OverlayGeo"
        className="ModalGeo"
            >       
        {
            enableLoading
            ? 
            <>
                <HeaderModal>
                    <Title><h1>{post.user["username"]}'s location</h1></Title>
                    <button disabled={disabled} onClick={() => setGeoModalOpen(false)} className='go-backGeo'><IoCloseSharp path={"white"} className="close" /></button> 
                </HeaderModal>
            <ReactLoading
                type="spinningBubbles"
                color="#FFFFFF"
                width={100}
                height={125}
            />
            </>


            :               
            <Content>         
                <HeaderModal>
                    <Title><h1>{post.user["username"]}'s location</h1></Title>
                    <button disabled={disabled} onClick={() => setGeoModalOpen(false)} className='go-backGeo'><IoCloseSharp path={"white"} className="close" /></button> 
                </HeaderModal>
                <Map>
                    <iframe
                        width="100%"
                        height="100%"              
                        frameBorder="0" style={{margin: 0 + 'em'}}
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}
                        &zoom=10
                        &maptype=satellite`}
                        allowFullScreen>
                    </iframe> 
                </Map>            
            </Content>         
        }      
               
     </ReactModal>
    </>    
    );     
}


const Content = styled.div`
    display: flex;
    flex-direction: column;  
    height: 354px;
    width: 790px;
    padding-left: 40px;
    padding-top: 20px;

    @media (max-width: 614px){
        padding-left: 20px;
        padding-top: 20px;

    }

    
`;


const HeaderModal = styled.div`
    display: flex;
    justify-content: space-between;

   
`;

const Title = styled.div`
    height: 30px;
    margin-bottom: 35px;
    display: flex;    

    h1 {
        font-family: "Oswald";
        font-size: 38px;        
    }

    
    @media (max-width: 614px){

        margin-bottom: 15px;

        h1 {
            font-size: 20px;
        }   
    }
`;

const Map = styled.div`
    width: 713px;
    height: 240px;

    @media (max-width: 614px){
        width: 260px;
        height:150px;
    }
    
`;