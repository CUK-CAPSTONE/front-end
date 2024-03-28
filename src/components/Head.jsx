import React from 'react';
import styled from 'styled-components';
import { RiLoginBoxFill } from "react-icons/ri";

const Head = () => {
    return (
        <HeadWrapper>
            <span className='inner'>
                <h1>JRGB</h1>
                <span className='loginbtn'><RiLoginBoxFill />Login</span>
            </span>
        </HeadWrapper>
    );
};

export default Head;

const HeadWrapper=styled.div`
    position:fixed;
    z-index:2;
    width:100%;
    height:40px;
    border-bottom:solid black 1px;
    padding-top:10px;
    padding-bottom:20px;
    background-color:white;
    .inner{
        width:1600px;
        margin-left:100px;
        display:flex;
        justify-content:space-between;
        h1{
            font-size:24px;
        }
        .loginbtn{
            width:100px;
            text-align:center;
            font-size:20px;
            line-height:1.5;
            border:solid 1px black;
            border-radius:2em;
        }
    }
`