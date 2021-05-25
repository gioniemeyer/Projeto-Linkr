import styled from "styled-components";
import avatar from "./image-avatar.png";

export default function NewPost() {
    return(
        <NewPostBox>
            <SideMenu>
                <img src={avatar} alt="oir" />
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

        ::-webkit-input-placeholder {
            color: #949494;
            border: none;
        }

        input:focus {
            outline: 0;
            box-shadow: 0 0 0 0;
        }
    }
`;
