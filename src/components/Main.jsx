import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FaFileUpload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "../style/font.css";
import Head from './Head';




const Main = () => {
    const [isActive,setIsActive]=useState(true);
    const [x,setX]=useState([]);

    const wholePage = document.getElementsByClassName("slider");
    const totalPageNumber = wholePage[0]?.children?.length;

    const [currentInputs,setCurrentInputs]=useState({
      currentWindowHeight:window.innerHeight,
      currentPage:0,
    });

    const setPageSize=()=>{
      setCurrentInputs({currentWindowHeight:window.innerHeight})
    };


    const setPage=()=>{
      for(var i=1;i<totalPageNumber;i++){
        if(window.scrollY<currentInputs.currentWindowHeight*i){
          setCurrentInputs({...currentInputs,currentPage:i});
          return;
        }
      }
    };
    useEffect(()=>{
      setPageSize();
      setPage();
    },[]);

    useEffect(()=>{
      wheelAction();
      window.addEventListener('scroll',setPage);
      window.addEventListener('resize',setPageSize);
      
      return ()=>{
        window.removeEventListener("scroll",setPage);
        window.removeEventListener("resize",setPageSize);
      };
    });

    function wheelAction(){
      window.addEventListener("wheel", (e) => {
        // 마우스 휠을 내릴때
        if (e.deltaY > 0) {
          let p = 1;
          while (p < totalPageNumber) {
            if (currentInputs.currentPage === p) {
              window.scrollTo({
                top: currentInputs.currentWindowHeight * p,
                behavior: "smooth",
              });
            }
            p++;
          }
        }
        // 마우스 휠을 올릴때
        if (e.deltaY < 0) {
          let p = 1;
          while (p < totalPageNumber) {
            if (currentInputs.currentPage === p) {
              window.scrollTo({
                top: currentInputs.currentWindowHeight * (p - 1),
                behavior: "smooth",
              });
            }
            p++;
          }
        }
      });
    }
    

    const navigate = useNavigate();

    const goToThree = () =>{
      navigate("/three");
    }
    const goToApi =()=>{
      navigate("/api");
    }

    const handleClickRadioBtn2 = (e)=>{
      console.log(e.target.value)
      setX(e.target.value)

    }


    return (
        <>
        <Head/>
        <Inner className='slider'>
            <MainWrapper>
                <UploadBtn>
                    <div className='uploadicon'><FaFileUpload /></div>
                    <div>사진 업로드</div>
                </UploadBtn>

                <ToggleSwitch>
	                <CheckBox type="checkbox"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}></CheckBox>
	                <ToggleSlider></ToggleSlider>
                  <span className='male'>{isActive ? "남":""}</span>
                  <span className='female'>{isActive ? "":"여"}</span>
                </ToggleSwitch>

                <EmotionRadio>
                  <div className='borderbox'>
                  <label className={x==="1" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="1"
                      checked={x === "1"}
                      onChange={handleClickRadioBtn2}
                    />
                  <span>화남</span></label>
                  <label className={x==="2" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="2"
                      checked={x === "2"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span>슬픔</span></label>
                    <label className={x==="3" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="3"
                      checked={x === "3"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span>평온</span></label>
                    <label className={x==="4" ? "input-hidden active" : "input-hidden"}>
                    <input
                      type='radio'
                      value="4"
                      checked={x === "4"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span>즐거움</span></label>
                    <label className={x==="5" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="5"
                      checked={x === "5"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span>놀람</span></label>
                    </div>
                </EmotionRadio>

                <SubmitBtn>
                  <span>생성하기!</span>
                </SubmitBtn>
                <SubBtnWrapper>
                  <span><button className='three-btn' onClick={goToThree}>3D</button></span>
                  <span><button className='api-btn' onClick={goToApi}>api</button></span>
                </SubBtnWrapper>
                
            </MainWrapper>
            <ProjectInfoWrapper>
              <InfoInner>
                <div className='textbox'>Info text</div>
                <div className='text-body'>저희 자린고비는 어쩌고저쩌고</div>
              </InfoInner>
            </ProjectInfoWrapper>
        </Inner>
        </>
    );
};

export default Main;

const Inner=styled.div`
    width:1200px;
    margin-left:300px;
    overflow:hidden;
`
const MainWrapper=styled.div`
    position:relative;
    width:100%;
    height:100vh;
    display:flex;
    background-color:#DCDCDC;
    text-align:center;
    justify-content:center;

    .three-btn{
      position:absolute;
      right:100px;
      bottom: 10px;
    }

    .api-btn{
      position:absolute;
      right:200px;
      bottom:10px;
    }

`
const UploadBtn=styled.button`
    position: absolute;
    left:100px;
    top:100px;
    margin-top:50px;
    font-size:24px;
    height:700px;
    width:500px;
    background-color:transparent;
    border:solid 1px black;
    font-family:"SCDream";
    border-radius:34px;
    .uploadicon{
        display:inline-block;
        font-size:60px;
    }
    &:hover{
        background-color:#c3c3c3;
    }

`
const ToggleSwitch = styled.label`
  position: absolute;
  top:150px;
  right:100px;
  display: inline-block;
  width: 400px;
  height: 86px;
  
  .male{
    position:absolute;
    top:15px;
    left:20px;
    z-index:3;
    font-size:52px;
    color:white;
  }
  .female{
    position:absolute;
    top:15px;
    right:20px;
    z-index:3;
    font-size:52px;
  }
`
const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f13d52;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content:  "";
    height: 66px;
    width: 190px;
    left: 10px;
    bottom: 10px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }
`
const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #2196F3;
  }

  &:focus + ${ToggleSlider} {
    box-shadow: 0 0 1px #2196F3;
  }

  &:checked + ${ToggleSlider}:before {
    -webkit-transform: translateX(189px);
    -ms-transform: translateX(189px);
    transform: translateX(189px);
  }
`
const SubmitBtn=styled.button`
  position: absolute;
  background-color:#6EE046;
  color:white;
  bottom:70px;
  right:100px;
  width:400px;
  height:300px;
  font-family:"SCDream";
  border-radius:25%;
  border:0px;
  span{
    font-size:40px;
  }
  &:hover{
    background-color:lightgray;
  }
`
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
const ProjectInfoWrapper=styled.div`
  position: relative;
  width:100%;
  height:100vh;
  background-color:grey;
`
const InfoInner=styled.div`
  position:absolute;
  background-color:white;
  width:80%;
  height:80%;
  top:10%;
  margin-left:10%;
  .textbox{
    width:80%;
    height:100px;
    margin-left:10%;
    margin-top:10px;
    margin-bottom:10px;
    text-align:center;
    background-color:darkgray;
  }
  .text-body{
    position:absolute;
    bottom:50px;
    width:80%;
    height:500px;
    margin-left:10%;
    background-color:darkgreen;
    color:white;
    text-align:center;
  }
`
const SubBtnWrapper=styled.div`
  display:flex;
  button{
    display:inline-block;
    background-color:white;
    border:0px;
    border-radius:25%;

  }

`


