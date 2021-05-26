import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

export default function NewPost() {
    const { user } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(false);

    function makePost(e) {
        e.preventDefault();
        setDisabled(true);
        const config = { headers: { Authorization: `Bearer ${localUser.token || user.token}` } };
        const body = { text, link};
        console.log(body);
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', body, config);

        request.then(response => {
            console.log("deu certo");
            setDisabled(false);
            setLink("");
            setText("");
        })

        request.catch(error => {
            alert("Houve um erro ao publicar sue link.");
            setDisabled(false);
        })
    }

    return(
        <NewPostBox>
            <SideMenu>
                <img src={localUser.user.avatar || user.user.avatar} alt="Imagem do avatar do usuário" />
            </SideMenu>
            <Content>
                <h1>O que você tem pra favoritar hoje?</h1>
                <form onSubmit={makePost}>
                    <input disabled={disabled} type="url" placeholder="http:// ..." required onChange={(e) => setLink(e.target.value)} value={link} />
                    <textarea disabled={disabled} placeholder ="Muito irado esse link falando de #javascript" onChange={(e) => setText(e.target.value)} value={text} />
                    <button disabled={disabled} type="submit">{disabled ? 'Publishing...' : 'Publicar'}</button>
                </form>
            </Content>
        </NewPostBox>
    );
}

const NewPostBox = styled.li`
    width: 611px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    padding: 16px 22px 16px 18px;
    border-radius: 16px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    margin-bottom: 29px;
`;

const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }
`;

const Content = styled.div`
    width: 503px;

    h1 {
        font-size: 20px;
        font-weight: 300;
        color: #707070;
        margin-bottom: 10px;
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
        background-color: #EFEFEF;
        padding-left: 13px;
        font-size: 15px;
        font-weight: 300;
        color: #707070;
        margin-bottom: 5px;

        ::-webkit-input-placeholder {
            color: #949494;
        }
    }

    textarea {
        width: 503px;
        height: 66px;
        border: none;
        border-radius: 5px;
        background-color: #EFEFEF;
        padding: 8px 0 0 13px;
        font-size: 15px;
        font-weight: 300;
        color: #707070;

        ::-webkit-input-placeholder {
            color: #949494;
            font-family: 'Lato';
        }
    }

    button {
        width: 112px;
        height: 31px;
        background-color: #1877F2;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 700;
        border-radius: 5px;
        margin-top: 5px;
        border: none;
        cursor: pointer;
        font-family: 'Lato'
    }
`;
