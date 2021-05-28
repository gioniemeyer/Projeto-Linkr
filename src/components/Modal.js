import { useState, useContext } from "react";
import ReactModal from 'react-modal';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/modal-styles.css";
import ReactLoading from 'react-loading';


export default function Modal({ modalOpen, setModalOpen, postID, RenderPosts }) {
    ReactModal.setAppElement('.root');
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [enableLoading, setEnableLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    function deletePost() {
        setEnableLoading(true);
        setDisabled(true);
        const config = { headers: { Authorization: `Bearer ${userData.token || localUser.token}` } };
        
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}`, config);

        request.then(response => {
            setModalOpen(false);
            setEnableLoading(false);
            setDisabled(false);
            RenderPosts();
        });

        request.catch(error => {
            setModalOpen(false);
            setEnableLoading(false);
            setDisabled(false);
            alert("Não foi possível excluir o post, por favor, tente novamente.");
        })
    }

    return(
        <ReactModal
            isOpen={modalOpen}
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
                : <h1>Tem certeza que deseja excluir essa publicação?</h1>
            }
            <div className="buttons">
                <button disabled={disabled} onClick={() => setModalOpen(false)} className='go-back'>Não, voltar</button>
                <button disabled={disabled} onClick={deletePost} className='delete'>Sim, excluir</button>
            </div>
        </ReactModal>
    );
}