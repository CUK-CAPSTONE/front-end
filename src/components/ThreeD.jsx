import { Canvas } from '@react-three/fiber'
import React from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { House } from './House'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
//icon
import { FaRedo } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import Obj from './Obj'

export default function ThreeD() {
    const navigate = useNavigate();
    const goToHome = () =>{
        navigate("/");
      }
  return (
    <>
    <TotalWrapper>
        <span><button className="goHome" onClick={goToHome}><FaHome/></button></span>
      <ThreeDWrapper>
        <Canvas camera={{position:[20,5,-8]}}>
          <OrbitControls/>
          <axesHelper args={[200, 200, 200]} />
          <ambientLight intensity={1} />
          <group rotation-y={-Math.PI / 2}>
            {/* <House scale={[100,100,100]}/> */}
            <Obj/>
          </group>
        </Canvas>
      </ThreeDWrapper>
      <div className='btn-firstRow'>
        <button className='redo'><FaRedo/> 다시하기</button>
        <button className='share'><FaShareAlt/> 공유하기</button>
      </div>
      <div className='btn-secondRow'>
        <button className='print'><FaPrint/> 출력하기</button>
      </div>
    </TotalWrapper>
    </>
  )
}

const TotalWrapper = styled.div`
    width:1200px;
    margin-left:300px;
    overflow:hidden;
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

const ThreeDWrapper=styled.div`
  width:1000px;
  height:600px;
  margin-left:100px;
  background-color:#d9d9d9;
  border-radius:34px;
  position: relative;
`