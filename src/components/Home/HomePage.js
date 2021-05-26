import styled from "styled-components"
import logo from '../../images/logo.png'
import { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from "../../contexts/UserContext";

export default function HomePage() {
    let history = useHistory();
    const { user, setUser } = useContext(UserContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [load, setLoad] = useState(false);


    useEffect(() => {
        setEmail("");
        setPassword("");
    }, [])


    function login(e) {
        e.preventDefault();

        if(!(email && password)) {
            alert('Favor, preencha todos os campos')
            return '';
        }
        
        setLoad(true);

        const body = {email, password};        
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', body)
        request.then(resp => {
            history.push('/timeline');
            setLoad(false);
            setUser(resp.data);
            console.log(user)
            localStorage.setItem('user', JSON.stringify(resp.data));
            const pessoa = JSON.parse(localStorage.getItem("user"));
            console.log(pessoa);
        })
        request.catch(error => {
            alert("email/senha incorretos");
            setLoad(false);
        })
    }

    return(
        <Body>
            <Container>
                <img src={logo} alt='logo'/>
                <P>save, share and discover the best links on the web</P>
            </Container>
            <Form onSubmit={e => login(e)}>
                <input disabled={load} type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>

                <input disabled={load} type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    
                <Button disabled={load} type='submit'>Log In</Button>
                <Link to='/sign-up'>
                    <A>First time? Create an account!</A>
                </Link>
            </Form>
 
        </Body>
    )
}

const Body = styled.div`
    display: flex;
    font-family: 'Oswald', sans-serif;
    justify-content: space-between;

    @media (max-width: 614px){
        flex-direction: column;
    }
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
    
    @media (max-width: 614px){
        height: 30vh;
        width: 100vw;
        align-items: center;
    }
    
    img {
        width: 30%;
    }
`

const P = styled.p`
    width: 35vw;
    font-size: 43px;

    @media(max-width: 614px) {
        width: 70vw;
        font-size: 23px;
        margin-right: 10vw;
    }
`

const Form = styled.form`
    background-color: #333;
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 614px){
        height: 70vh;
        width: 100vw;
    }
    input {
        margin-bottom: 13px;
        background-color: #fff;
        height: 65px;
        width: 85%;
        border: none;
        border-radius: 6px;
        font-size: 27px;
        padding-left: 17px;
        font-family: 'Oswald', sans-serif;

        &:disabled {
            background-color: #F2F2F2;
        }
        
        @media(max-width:614px) {
        height: 55px;
        }
        
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
    margin-bottom: 13px;
    font-family: 'Oswald', sans-serif;

    @media(max-width:614px) {
        height: 55px;
    }
`

const A = styled.p`
    font-family: 'Lato', sans-serif;
    color: #fff;
    text-decoration: underline;
    font-size: 17px;
`