import styled from 'styled-components';

export const Button = styled.button`
    width: 200px;
    height: 60px;
    background-color: transparent;
    border-radius: 34px;
    margin-top: 30px;
    font-size: 24px;
    text-align: center;
    line-height: 1.5;
    font-family: "SCDream";
    border: solid 3px black;
    &:hover {
        background-color: #c3c3c3;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    position: absolute;
    right: 40px;
`;