import React from 'react';
import styled from 'styled-components';
import { RiLoginBoxFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { FaMoneyBill } from "react-icons/fa";

const Head = () => {

    const navigate = useNavigate();

    const goToHome=()=>{
        navigate("/");
    }

    const goToPayment = () =>{
      navigate("/payment");
    } //3D화면

    return (
        <HeadWrapper>
            <span className='inner'>
                <span className='mainlogo'><img src='img/logo_JRGB_2D.png'/></span>
                <span className='textlogo' onClick={goToHome}><img src='img/JRGB_initial.png'/></span>
                <span className='loginbtn' onClick={goToPayment}><FaMoneyBill/> 결제내역</span>
            </span>
        </HeadWrapper>
    );
};

export default Head;

const HeadWrapper=styled.div`
    position:fixed;
    z-index:2;
    width:100%;
    height:60px;
    border-bottom:solid black 1px;
    padding-top:10px;
    padding-bottom:10px;
    background-color:white;
    .inner{
        position: relative;
        width:1600px;
        margin-left:100px;
        display:flex;
        justify-content:space-between;
        .mainlogo{
            position:absolute;
            top:0;
            height:70px;
            width:70px;
        }
        .textlogo{
            position: absolute;
            left:100px;
            top:0;
            height:80px;
            width:200px;
            z-index:5;
        }
        .loginbtn{
            position:absolute;
            right:100px;
            width:150px;
            margin-top:12px;
            text-align:center;
            font-size:20px;
            line-height:1.5;
            height:30px;
            border:solid 1px black;
            border-radius:2em;
            &:hover{
                background-color:black;
                color:white;
            }
        }
    }
`