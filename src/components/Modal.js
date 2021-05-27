import ReactModal from 'react-modal';
import styled from "styled-components";
import "../styles/modal-styles.css"
export default function Modal({ modalOpen, setModalOpen }) {
    ReactModal.setAppElement('.root');
    
    

    return(
        <ReactModal
            isOpen={modalOpen}
            overlayClassName="Overlay"
            className="Modal"
        >
            <h1>Tem certeza que deseja excluir essa publicação?</h1>
            <div className="buttons">
                <button className='go-back'>Não, voltar</button>
                <button className='delete'>Sim, excluir</button>
            </div>
        </ReactModal>
    );
}