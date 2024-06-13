import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "../style/font.css";
import Head from '../components/Head';
//icon
import { FaGithub } from "react-icons/fa";
import Uploader from '../components/Uploader';
import RadioEmote from '../components/RadioEmote';
import ToggleGender from '../components/ToggleGender';

const Main = () => {
    const [gender, setGender] = useState('');
    const [emote, setEmote] = useState('');
    const [maxAnimal, setMaxAnimal] = useState(null);

    const wholePage = document.getElementsByClassName("slider"); // 원페이지 스크롤
    const totalPageNumber = wholePage[0]?.children?.length;

    const [currentInputs, setCurrentInputs] = useState({
        currentWindowHeight: window.innerHeight,
        currentPage: 0,
    });

    const setPageSize = () => {
        setCurrentInputs({ currentWindowHeight: window.innerHeight })
    };

    // 원페이지 스크롤
    const setPage = () => {
        for (var i = 1; i < totalPageNumber; i++) {
            if (window.scrollY < currentInputs.currentWindowHeight * i) {
                setCurrentInputs({ ...currentInputs, currentPage: i });
                return;
            }
        }
    };
    useEffect(() => {
        setPageSize();
        setPage();
    }, []);

    useEffect(() => {
        wheelAction();
        window.addEventListener('scroll', setPage);
        window.addEventListener('resize', setPageSize);

        return () => {
            window.removeEventListener("scroll", setPage);
            window.removeEventListener("resize", setPageSize);
        };
    });

    function wheelAction() {
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
    } // 원페이지 스크롤 함수

    const navigate = useNavigate();

    const goToThree = () => {
        navigate("/three");
    } // 3D화면

    return (
        <>
            <Head />
            <Inner className='slider'>
                <MainWrapper>
                    <UploadBtn>
                        <Uploader gender={gender} emote={emote} setMaxAnimalParent={setMaxAnimal} />
                    </UploadBtn>
                    <ToggleGender setGender={setGender} />
                    <RadioEmote setEmote={setEmote} />
                    <SubmitBtn onClick={goToThree} disabled={!maxAnimal}>
                        <span>생성하기!</span>
                    </SubmitBtn>
                </MainWrapper>
                <ProjectInfoWrapper>
                    <InfoInner>
                        <div className='textbox'><img src='img/logo_JRGB_2D.png' /></div>
                        <div className='text-body'><br />
                            <span className='body-title'>JRGB - 생성형 AI와 3d print를 활용한 사용자 맞춤 3D 악세사리 출력 서비스</span><br /><br />
                            저희 [자린고비] 팀은 생성형 AI 모델과 3D 프린터를 통해 사용자가 선호하는 물체에 대한 데이터를<br />
                            먼저 입력받고, 성별, 감정등의 파라미터를 추가로 선택받아 선호하는 물체를 파라미터에 맞는 <br />
                            3D 객체를 생성하여 3D프린터로 출력하는 악세사리 출력 서비스를 제작하였습니다.  </div>
                        <div className='btn-box'><button className='github-btn' onClick={() => window.open("https://github.com/CUK-CAPSTONE")}><FaGithub /></button></div>
                    </InfoInner>
                </ProjectInfoWrapper>
            </Inner>
        </>
    );
};

export default Main;

const Inner = styled.div`
    width: 1200px;
    margin-left: 360px;
    height: 1800px;
    overflow: hidden;
`;
const MainWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 900px;
    display: flex;
    background-color: #ececec;
    text-align: center;
    justify-content: center;

    .three-btn {
      position: absolute;
      right: 100px;
      bottom: 10px;
    }

    .api-btn {
      position: absolute;
      right: 200px;
      bottom: 10px;
    }

`;
const UploadBtn = styled.button`
    position: absolute;
    left: 100px;
    top: 100px;
    margin-top: 50px;
    font-size: 24px;
    height: 750px;
    width: 500px;
    background-color: transparent;
    border: solid 1px black;
    font-family: "SCDream";
    border-radius: 34px;
`;

const SubmitBtn = styled.button`
  position: absolute;
  background-color: ${props => props.disabled ? '#c3c3c3' : '#6EE046'};
  color: white;
  bottom: 70px;
  right: 100px;
  width: 400px;
  height: 300px;
  font-family: "SCDream";
  border-radius: 34px;
  border: 0px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  span {
    font-size: 40px;
  }
  &:hover {
    background-color: ${props => props.disabled ? '#c3c3c3' : '#58b338'};
  }
`;

const ProjectInfoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 900px;
  background-color: #ececec;
`;
const InfoInner = styled.div`
  position: absolute;
  background-color: transparent;
  width: 80%;
  height: 80%;
  top: 10%;
  margin-left: 10%;
  img {
    position: relative;
    margin: 0 auto;
    height: 190px;
    width: 190px;
    }
  .textbox {
    width: 80%;
    height: 200px;
    margin-left: 10%;
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;
    position: relative;
  }
  .text-body {
    position: absolute;
    bottom: 180px;
    width: 80%;
    height: 300px;
    margin-left: 10%;
    background-color: #d9d9d9;
    text-align: center;
    box-shadow: inset 0px 0px 10px #666;
  }
  .body-title {
    font-size: 20px;
  }
  .btn-box {
    position: absolute;
    bottom: 50px;
    width: 80%;
    height: 200px;
    margin-left: 10%;
    display: flex;
    justify-content: center;
    .github-btn {
    margin: 0 auto;
    background-color: #6EE046;
    color: white;
    width: 224px;
    height: 52px;
    border-radius: 34px;
    position: absolute;
    bottom: 10px;
    &:hover {
      background-color: #58b338;
    }
  }
  }
  
`;
const SubBtnWrapper = styled.div`
  display: flex;
  button {
    display: inline-block;
    background-color: white;
    border: 0px;
    border-radius: 25%;

  }

`;
