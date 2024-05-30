import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "../style/font.css";
import Head from './Head';
//icon
import { FaGithub } from "react-icons/fa";
import { FaRegAngry } from "react-icons/fa";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { FaRegGrin } from "react-icons/fa";
import { FaRegGrinSquint } from "react-icons/fa";
import { FaRegSurprise } from "react-icons/fa";
import Uploader from './Uploader';





const Main = () => {
    const [isActive,setIsActive]=useState(true);
    const [x,setX]=useState([]);

    const wholePage = document.getElementsByClassName("slider"); //원페이지 스크롤
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
    } //원페이지 스크롤 함수
    

    const navigate = useNavigate();

    const goToThree = () =>{
      navigate("/three");
    } //3D화면
    const goToApi =()=>{
      navigate("/api");
    } //api 테스트

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
                    <Uploader/>
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
                  <span><FaRegAngry/></span></label>
                  <label className={x==="2" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="2"
                      checked={x === "2"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegFaceSadTear/></span></label>
                    <label className={x==="3" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="3"
                      checked={x === "3"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegGrin/></span></label>
                    <label className={x==="4" ? "input-hidden active" : "input-hidden"}>
                    <input
                      type='radio'
                      value="4"
                      checked={x === "4"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegGrinSquint/></span></label>
                    <label className={x==="5" ? 'input-hidden active' : 'input-hidden'}>
                    <input
                      type='radio'
                      value="5"
                      checked={x === "5"}
                      onChange={handleClickRadioBtn2}
                    />
                    <span><FaRegSurprise/></span></label>
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
                <div className='textbox'><img src='img/logo_JRGB_2D.png'/></div>
                <div className='text-body'><br/>
                <span className='body-title'>JRGB - 생성형 AI와 3d print를 활용한 사용자 맞춤 3D 악세사리 출력 서비스</span><br/><br/>
                저희 [자린고비] 팀은 생성형 AI 모델과 3D 프린터를 통해 사용자가 선호하는 물체에 대한 데이터를<br/>
                먼저 입력받고, 성별, 감정등의 파라미터를 추가로 선택받아 선호하는 물체를 파라미터에 맞는 <br/>
                3D 객체를 생성하여 3D프린터로 출력하는 악세사리 출력 서비스를 제작하였습니다.  </div>
                <div className='btn-box'><button className='github-btn' onClick={()=>window.open("https://github.com/CUK-CAPSTONE")}><FaGithub/></button></div>
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
    background-color:#ececec;
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
  border-radius:34px;
  border:0px;
  span{
    font-size:40px;
  }
  &:hover{
    background-color:#58b338;
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
const ProjectInfoWrapper=styled.div`
  position: relative;
  width:100%;
  height:100vh;
  background-color:#ececec;
`
const InfoInner=styled.div`
  position:absolute;
  background-color:transparent;
  width:80%;
  height:80%;
  top:10%;
  margin-left:10%;
  img{
    position:relative;
    margin:0 auto;
    height:190px;
    width:190px;
    }
  .textbox{
    width:80%;
    height:200px;
    margin-left:10%;
    margin-top:30px;
    margin-bottom:10px;
    text-align:center;
    position: relative;
  }
  .text-body{
    position:absolute;
    bottom:180px;
    width:80%;
    height:300px;
    margin-left:10%;
    background-color:#d9d9d9;
    text-align:center;
    box-shadow: inset 0px 0px 10px #666;
  }
  .body-title{
    font-size:20px;
  }
  .btn-box{
    position:absolute;
    bottom:50px;
    width:80%;
    height:200px;
    margin-left:10%;
    display:flex;
    justify-content:center;
    .github-btn{
    margin:0 auto;
    background-color:#6EE046;
    color:white;
    width:224px;
    height:52px;
    border-radius:34px;
    position: absolute;
    bottom:10px;
    &:hover{
      background-color:#58b338;
    }
  }
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



