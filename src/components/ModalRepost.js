import { useState, useContext } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/modal-styles.css";
import ReactLoading from "react-loading";
import { func } from "prop-types";

export default function ModalRepost({
  modalRepostOpen,
  setModalRepostOpen,
  postID,
  RenderPosts,
}) {
  ReactModal.setAppElement(".root");
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [enableLoading, setEnableLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function repost() {
    setEnableLoading(true);
    setDisabled(true);
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };

    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/share`,
      [],
      config
    );

    request.then(response => {
      RenderPosts();
      setEnableLoading(false);
      setDisabled(false);
      setModalRepostOpen(false);
    });

    request.catch(error => {
      alert("Houve algum problema com sua repostagem, por favor, tente novamente.");
      setEnableLoading(false);
      setDisabled(false);
      setModalRepostOpen(false);
    });
  }

  return (
    <ReactModal isOpen={modalRepostOpen} overlayClassName="Overlay" className="Modal">
      {enableLoading ? (
        <ReactLoading
          type="spinningBubbles"
          color="#FFFFFF"
          width={100}
          height={125}
        />
      ) : (
        <h1>Você deseja repostar esse link?</h1>
      )}
      <div>
        <button
          disabled={disabled}
          onClick={() => setModalRepostOpen(false)}
          className="go-back buttons-repost"
        >
          Não, cancelar
        </button>
        <button disabled={disabled} onClick={repost} className="delete buttons-repost">
          Sim, compartilhar!
        </button>
      </div>
    </ReactModal>
  );
}
