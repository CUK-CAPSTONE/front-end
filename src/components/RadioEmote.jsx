import React, { useState } from 'react';
import styled from 'styled-components';

//icon
import { FaRegAngry } from "react-icons/fa";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { FaRegGrin } from "react-icons/fa";
import { FaRegGrinSquint } from "react-icons/fa";
import { FaRegSurprise } from "react-icons/fa";

function RadioEmote({ setEmote }) {
    const [x,setX]=useState("angry");

    const handleClickRadioBtn2 = (e)=>{
        setX(e.target.value);
        setEmote(e.target.value);
    }
    
    return (
        <EmotionRadio>
                  <div className='borderbox'>
                  <label className={x==="angry" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="angry"
                      checked={x === "angry"}
                      onChange={handleClickRadioBtn2}
                    />
                  <span><FaRegAngry/></span></label>
                  <label className={x==="sad" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="sad"
                      checked={x === "sad"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegFaceSadTear/></span></label>
                    <label className={x==="happy" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="happy"
                      checked={x === "happy"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegGrin/></span></label>
                    <label className={x==="joy" ? "input-hidden active" : "input-hidden"}>
                    <input
                      type='radio'
                      value="joy"
                      checked={x === "joy"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegGrinSquint/></span></label>
                    <label className={x==="surprise" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="surprise"
                      checked={x === "surprise"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegSurprise/></span></label>
                    </div>
        </EmotionRadio>
    );
}

export default RadioEmote;

const EmotionRadio=styled.div`
  position:absolute;
  display:flex;
  gap:10px;
  width:400px;
  height:84px;
  font-size:16px;
  background-color:transparent;
  top:350px;
  right:100px;
  display:flex;
  justify-content:center;
  text-align:center;
  z-index:3;
  span{
    font-size:36px;
  }
  .active{
    background-color:#7EAEF6;
  }
  .borderbox{
      display:flex;
      gap:5px;
      width:100%;
      height:100%;
      background-color:#508AE2;
      position:absolute;
      justify-content:center;
      top:0px;
      right:0px;
      z-index:2;
      border-radius:34px;
    }
  input{
    display:none;
  }
  label{
    position: relative;
    background-color:transparent;
    height:68px;
    width:76px;
    top:8px;
    text-align:center;
    border-radius:20px;
    box-shadow: 0px 0px 5px #444;
    span{
      height:100%;
      line-height:68px;
    }
  }
  label:first-of-type{
    margin-left:10px;
  }
  label:last-of-type{
    margin-right:10px;
  }
  label:hover{
    background-color:#9bc2cf;
  }
  
`

