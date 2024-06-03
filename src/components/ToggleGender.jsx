import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function ToggleGender({ setGender }) {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setGender("male");
    }, [setGender]);

    const handleChange = () => {
        setIsActive(!isActive);
        if (isActive) {
            setGender("male");
        } else {
            setGender("female");
        }
    };

    return (
        <ToggleSwitch>
            <CheckBox type="checkbox" checked={isActive} onChange={handleChange}></CheckBox>
            <ToggleSlider></ToggleSlider>
            <div className='male'>{isActive ? "남" : ""}</div>
            <div className='female'>{isActive ? "" : "여"}</div>
        </ToggleSwitch>
    );
}

export default ToggleGender;

const ToggleSwitch = styled.label`
  position: absolute;
  top: 150px;
  right: 100px;
  display: inline-block;
  width: 400px;
  height: 86px;
  
  .male {
    position: absolute;
    top: 15px;
    left: 20px;
    z-index: 3;
    font-size: 52px;
    color: white;
  }
  .female {
    position: absolute;
    top: 15px;
    right: 20px;
    z-index: 3;
    font-size: 52px;
  }
`;
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
`;
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
`;
