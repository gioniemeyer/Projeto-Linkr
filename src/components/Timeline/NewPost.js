import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

export default function NewPost({ RenderPosts }) {
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(false);
    


    function makePost(e) {
        e.preventDefault();
        setDisabled(true);
        const config = { headers: { Authorization: `Bearer ${userData.token || localUser.token}` } };
        const body = { text, link};       
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', body, config);

        request.then(response => {            
            setDisabled(false);
            setLink("");
            setText("");
            RenderPosts();
        })

        request.catch(error => {
            alert("Houve um erro ao publicar sue link.");
            setDisabled(false);
        })
    }

    return(
        <NewPostBox>
            <SideMenu>
                <img src={localUser.user.avatar || userData.user.avatar} alt="Imagem do avatar do usuário" />
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

    @media (max-width: 614px){
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

    @media (max-width: 614px){
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

    @media (max-width: 614px){
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

        @media (max-width: 614px){
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
        background-color: #EFEFEF;
        padding-left: 13px;
        font-size: 15px;
        font-weight: 300;
        color: #707070;
        font-family: 'Lato';
        margin-bottom: 5px;

        ::-webkit-input-placeholder {
            color: #949494;
            font-family: 'Lato';
        }

        @media (max-width: 614px){
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
        background-color: #EFEFEF;
        padding: 8px 0 0 13px;
        font-size: 15px;
        font-weight: 300;
        color: #707070;
        font-family: 'Lato';
        resize: none;

        ::-webkit-input-placeholder {
            color: #949494;
            font-family: 'Lato';
        }

        @media (max-width: 614px){
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
        background-color: #1877F2;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 700;
        border-radius: 5px;
        margin-top: 5px;
        border: none;
        cursor: pointer;
        font-family: 'Lato';

        @media (max-width: 614px){
            height: 22px;
        }
    }
`;
