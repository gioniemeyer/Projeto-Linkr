import styled from "styled-components"
import logo from '../../images/logo.png'
import { useState } from 'react';
// import axios from 'axios';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [picture, setPicture] = useState('');


    function subscribe(event) {
        event.preventDefault();

        if(!(email && password && username && picture)) {
            alert('Favor preencher corretamente todos os campos')
            return ''
        }
        
        const body = {email, password, username, picture};        
        console.log(body);
    }

    return(
        <Body>
            <Container>
                <img src={logo} alt='logo'/>
                <P>save, share and discover the best links on the web</P>
            </Container>
            <Form onSubmit={event => subscribe()}>
                <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='email'></input>
                <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='password'></input>
                <input value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='username'></input>
                <input value={picture} onChange={e => setPicture(e.target.value)} type='url' placeholder='picture url'></input>
                <Button type='submit'>Sign Up</Button>
            </Form>
        </Body>
    )
}

const Body = styled.div`
    display: flex;
    font-family: 'Oswald', sans-serif;
    justify-content: space-between;
`
const Container = styled.div`
    background-color: #151515;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #fff;
    word-break: break-after;
    padding-left: 10vw;
    width: 60vw;
    text-align: justify;
    img {
        width: 20vw;
    }
`

const P = styled.p`
    width: 35vw;
    font-size: 43px;
`

const Form = styled.form`
    background-color: #333;
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    input {
        margin-bottom: 13px;
        background-color: #fff;
        height: 65px;
        width: 85%;
        border: none;
        border-radius: 6px;
        font-size: 27px;
        padding-left: 17px;
    }

    ::placeholder {
        color: #9F9F9F;
    }
`

const Button = styled.button`
    background-color: #1877F2;
    color: #fff;
    width: 85%;
    height: 65px;
    border: none;
    border-radius: 6px;
    font-size: 27px;
`