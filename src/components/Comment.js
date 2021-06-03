import styled from "styled-components"
import axios from "axios"
import UserContext from "../contexts/UserContext";
import { useContext, useState,useRef,useEffect } from "react";
export default function Comment({id,text,user,userAuthor}){
    const { userData } = useContext(UserContext);
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [followList,setFollowList]=useState('')
    // console.log(userAuthor)
    // console.log(user.id)
    let FollowId=[]

    function CheckFollow(){
        const config = {
            headers: { Authorization: `Bearer ${userData.token || localUser.token}` },
          };
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`,config)
        request.then((r)=>{console.log(r.data.users)
        setFollowList(r.data.users)}
        )
    }
    function MakeFollowList(){
        if(followList.length>0){
        FollowId=followList.map((item)=>item.id)
    }
    }
   MakeFollowList()
   

    useEffect(CheckFollow,[])
    return(
        <>
        <Box>
            <img src={user.avatar} />
            <TextBox>
                <LineTitle>
                    <h2>{user.username}</h2>
                    <span>{userAuthor===user.id?'• post’s author':''}</span>
                    <span>{FollowId.includes(user.id)?'• following':''}</span>  
                </LineTitle>
                <h3>{text}</h3>
            </TextBox>
       </Box>
        </>
        )
}

const Box=styled.div`
    display: flex;
    border-bottom: 1px solid #353535;
    margin:15px 20px;
    padding-bottom: 15px;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 18px;
    }
`
const TextBox=styled.div`
    font-size: 14px;
    h2{     
    font-weight: 700;
    color:#F3F3F3;
    font-family: 'Lato', sans-serif;
    padding-bottom:6px;
    padding-right: 4px;
    }
    h3{
    color:#ACACAC;
    }
`
const LineTitle=styled.div`
    display: flex;
    padding-top: 3px;
    span{
        color: #565656;
        padding-right: 3px;
    }
`