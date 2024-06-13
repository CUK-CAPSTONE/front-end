import { Canvas } from '@react-three/fiber';
import React, { useState, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaRedo, FaShareAlt, FaPrint, FaHome } from "react-icons/fa";
import Modal from '../components/Modal';
import GlbReal from '../components/GlbReal';
import { useKakao } from '../api/kakao';
import { useGlbBringer } from '../api/glbBringer';

export default function ThreeDreal() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { data, loading: kakaoLoading, error } = useKakao();
    const { glb: glbData, loading: glbLoading } = useGlbBringer();

    const openKakao = () => {
        if (kakaoLoading) {
            console.log("로딩 중...");
        } else if (error) {
            console.error("에러 발생:", error);
        } else {
            console.log("Kakao API 데이터:", data);
            window.open(data, "_blank"); // API 데이터를 기반으로 원하는 작업 수행
        }
    };

    return (
        <>
            <TotalWrapper>
                <ThreeDWrapper>
                    {glbLoading ? (
                        <img className='loading' src='img/loading.gif' alt="Loading" />
                    ) : (
                        <Canvas camera={{ position: [20, -10, -8] }}>
                            <OrbitControls />
                            <ambientLight intensity={1} />
                            <group rotation-y={-Math.PI / 2}>
                                <GlbReal glbData={glbData} loading={glbLoading} />
                            </group>
                        </Canvas>
                    )}
                </ThreeDWrapper>
                <div className='btn-firstRow'>
                    <button className='redo' onClick={goToHome}><FaRedo /> 다시하기</button>
                    <button className='share' onClick={openModal}><FaShareAlt /> 공유하기</button>
                </div>
                <div className='btn-secondRow'>
                    <button className='print' onClick={openKakao}><FaPrint /> 출력하기</button>
                </div>
            </TotalWrapper>
            <Modal show={isModalOpen} onClose={closeModal} />
        </>
    );
}

const TotalWrapper = styled.div`
    width:1200px;
    margin-left:360px;
    overflow:hidden;
    margin-top:10px;
    .goHome{
      background-color:transparent;
      width:50px;
      height:50px;
      font-size:48px;
      border:none;
    }
    .btn-firstRow{
    width:1000px;
    margin-left:100px;
    margin-top:20px;
    display:flex;
    gap:10px;
    button{
      font-family:"SCDream";
      background-color:#6EE046;
      color:white;
      font-size:40px;
      border-radius:34px;
      width:496px;
      height:100px;
      border:none;
      &:hover{
        background-color:#58b338;
      }
    }
  }
  .btn-secondRow{
    width:1000px;
    margin-left:100px;
    margin-top:20px;
    button{
      font-family:"SCDream";
      background-color:#6EE046;
      color:white;
      font-size:40px;
      border-radius:34px;
      width:1000px;
      height:100px;
      border:none;
      &:hover{
        background-color:#58b338;
      }
    }
  }
`

const ThreeDWrapper = styled.div`
  width:1000px;
  height:600px;
  margin-left:100px;
  background-color:#d9d9d9;
  border-radius:34px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading{
    width:300px;
    height:300px;
  }
`
