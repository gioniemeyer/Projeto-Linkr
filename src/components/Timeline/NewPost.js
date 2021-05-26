import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function NewPost() {
    const { user } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    if(user.length === 0) {
        return(
            <div></div>
        );
    }

    return(
        <NewPostBox>
            <SideMenu>
                <img src={user.user.avatar || localUser.user.token} alt="Imagem do avatar do usuário" />
            </SideMenu>
            <Content>
                <h1>O que você tem pra favoritar hoje?</h1>
                <form>
                    <input type="email" placeholder="http:// ..." />
                    <textarea placeholder ="Muito irado esse link falando de #javascript"></textarea>
                    <button>Publicar</button>
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
            border: none;
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
    }
`;
