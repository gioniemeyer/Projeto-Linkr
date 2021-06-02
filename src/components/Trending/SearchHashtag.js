import styled from "styled-components"
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function SearchHashtag(){
    let history = useHistory();
    const [pesquisa,setPesquisa]=useState("")
    function Search(event){
        event.preventDefault();
        history.push(`/hashtag/${pesquisa}`);
        setPesquisa("")
    }
    return(
        <>
            <form onSubmit={Search}>
                <InputBox>
                    <SearchInput type="text" placeholder='type a hashtag' required value={pesquisa} onChange={(e)=>setPesquisa(e.target.value)}/>
                    <span >#</span>
                </InputBox>
            </form>
   </> 
   )
}

const SearchInput=styled.input`
    background-color: #252525;
    color:#ffffff;
    font-size: 18px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    width: 270px;
    height: 35px;
    border-radius: 8px;
    border: none;
    margin-left: 15px;
    padding-left: 30px;
    ::placeholder{
        color:#575757;
        font-style: italic;
        font-size: 16px;
    }
    :focus{
        outline: none;
        box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.2);
    }
`
const InputBox=styled.div`
    color:#ffffff;
    font-size: 18px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    span{
        position: absolute;
        left: 25px;
        bottom: 22px;
    }
`
