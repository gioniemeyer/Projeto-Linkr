import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { IoLocationOutline } from "react-icons/io5";

export default function NewPost({ RenderPosts }) {
  const { userData } = useContext(UserContext);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [location, setLocation] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert(
        "A geolocalização não é permitida pelo seu navegador, tente atualizá-lo ou instalar um mais recente."
      );
    }
  }

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("O acesso à sua localização foi negado com sucesso.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("A informação da sua localização está indisponível.");
        break;
      case error.TIMEOUT:
        alert("A requisição falhou, tente novamente.");
        break;
      case error.UNKNOWN_ERROR:
        alert("Um erro desconhecido ocorreu. Tente novamente.");
        break;
    }
    setLocation(false);
  }

  function makePost(e) {
    e.preventDefault();
    setDisabled(true);
    const config = {
      headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
    };
    const body = {
      text,
      link,
      geolocation: {
        latitude: latitude,
        longitude: longitude,
      },
    };
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
      body,
      config
    );

    request.then((response) => {
      setDisabled(false);
      setLink("");
      setText("");
      RenderPosts();
    });

    request.catch((error) => {
      alert("Houve um erro ao publicar seu post.");
      setDisabled(false);
    });
  }

  return (
    <NewPostBox>
      <SideMenu>
        <img
          src={localUser.user.avatar || userData.user.avatar}
          alt="Imagem do avatar do usuário"
        />
      </SideMenu>
      <Content>
        <h1>O que você tem pra favoritar hoje?</h1>
        <form onSubmit={makePost}>
          <input
            disabled={disabled}
            type="url"
            placeholder="http:// ..."
            required
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
          <textarea
            disabled={disabled}
            placeholder="Muito irado esse link falando de #javascript"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button disabled={disabled} type="submit">
            {disabled ? "Publishing..." : "Publicar"}
          </button>
        </form>

        {location ? (
          <Geolocation location={location}>
            <IoLocationOutline className="geolocation"></IoLocationOutline>
            <button
              onClick={() => {
                setLocation(false);
                setLatitude("");
                setLongitude("");
              }}
            >
              Localização ativada
            </button>
          </Geolocation>
        ) : (
          <Geolocation location={location}>
            <IoLocationOutline className="geolocation"></IoLocationOutline>
            <button
              onClick={() => {
                setLocation(true);
                getLocation();
              }}
            >
              Localização desativada
            </button>
          </Geolocation>
        )}
      </Content>
    </NewPostBox>
  );
}

const NewPostBox = styled.li`
  width: 611px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 16px 22px 16px 18px;
  border-radius: 16px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 29px;

  @media (max-width: 614px) {
    width: 100%;
    border-radius: 0;
    padding: 10px 15px 12px 15px;
    margin-bottom: 16px;
  }
`;

const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 614px) {
    display: none;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }
`;

const Content = styled.div`
  width: 503px;

  @media (max-width: 614px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    width: fit-content;
    font-size: 20px;
    font-weight: 300;
    color: #707070;
    margin-bottom: 10px;

    @media (max-width: 614px) {
      font-size: 17px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  input {
    width: 503px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #efefef;
    padding-left: 13px;
    font-size: 15px;
    font-weight: 300;
    color: #707070;
    font-family: "Lato";
    margin-bottom: 5px;

    ::-webkit-input-placeholder {
      color: #949494;
      font-family: "Lato";
    }

    @media (max-width: 614px) {
      width: calc(100vw - 15px);
    }
  }

  input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }

  textarea {
    width: 503px;
    height: 66px;
    border: none;
    border-radius: 5px;
    background-color: #efefef;
    padding: 8px 0 0 13px;
    font-size: 15px;
    font-weight: 300;
    color: #707070;
    font-family: "Lato";
    resize: none;

    ::-webkit-input-placeholder {
      color: #949494;
      font-family: "Lato";
    }

    @media (max-width: 614px) {
      width: calc(100vw - 15px);
    }
  }

  textarea:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }

  button {
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    border-radius: 5px;
    margin-top: 5px;
    border: none;
    cursor: pointer;
    font-family: "Lato";

    @media (max-width: 614px) {
      height: 22px;
    }
  }
`;

const Geolocation = styled.div`
  display: flex;
  width: 100%;

  .geolocation {
    color: ${(props) => (props.location ? "#238700" : "#949494")};
    font-size: 25px;
    margin-top: 7px;
  }

  button {
    font-size: 15px;
    line-height: 15.6px;
    font-weight: 300;
    border: none;
    background: white;
    color: ${(props) => (props.location ? "#238700" : "#949494")};
    width: ${(props) => (props.location ? "135px" : "157px")};
  }

  @media (max-width: 614px) {
    .geolocation {
      align-items: flex-start;
    }
  }
`;
