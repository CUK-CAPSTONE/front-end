import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShareAlt } from "react-icons/fa";

const Modal = ({ show, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = () => {
        onSubmit(inputValue);
        onClose(); // 모달을 닫습니다.
    };

    return (
        <ModalWrapper>
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <p>URL 입력</p>
                <InputField
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <SubmitButton onClick={handleSubmit}><FaShareAlt /></SubmitButton>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: lightgray;
    padding: 20px;
    border-radius: 34px;
    width: 800px;
    max-width: 80%;
    text-align: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 410px;
    right: 570px;
    background: none;
    color:black;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

const InputField = styled.input`
    width: 700px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    margin-left: 10px;
    border: none;
    border-radius: 4px;
    background-color: #6EE046;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #58b338;
    }
`;
