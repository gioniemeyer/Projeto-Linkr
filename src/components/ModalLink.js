import { useState, useContext } from "react";
import ReactModal from 'react-modal';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/modal-link-styles.css";
import ReactLoading from 'react-loading';
import styled from "styled-components";


export default function ModalLink({ modalLink, setModalLink, postID, link, linkTitle }) {
    ReactModal.setAppElement('.root');
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [enableLoading, setEnableLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    

    return(
        <ReactModal
            
            isOpen={modalLink}
            overlayClassName="overlay"
            className="modal"
        >
            <Container>
            {
                enableLoading
                ? <ReactLoading
                    type="spinningBubbles"
                    color="#FFFFFF"
                    width={100}
                    height={125}
                />
                :
                <Buttons> 
                    <a href={link} target="_blank">
                    <Button disabled={disabled} >Open in new tab</Button>
                    </a>
                    <Cancel disabled={disabled} onClick={() => setModalLink(false)}>X</Cancel>
                </Buttons>
            }
            <Preview src={link} title={linkTitle} />
            </Container>
        </ReactModal>
    );
}

const Container = styled.div`

    display: flex;
    flex-direction: column;
    padding: 16px 16px;
    width:100%;
    height:100%;
    background-color: #333333;
    border-radius: 20px;
`
const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`

const Button = styled.button`
    width: 134px;
    height: 37px;
    font-size: 14px;
    font-family: 'Lato';
    font-weight: 700;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #1877F2;
    color: #FFFFFF;
`
const Cancel = styled.button`
    background-color:transparent;
    color: #fff;
    font-size: 20px;
    width: fit-content;
`

const Preview = styled.iframe`
    margin-top: 15px;
    height: 90%;
    border: 1px solid #cecece;
    background-color: #fff;
`