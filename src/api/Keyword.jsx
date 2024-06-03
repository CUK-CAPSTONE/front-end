import React, { useEffect } from 'react';
import { useKeyword } from './useKeyword';
import styled from 'styled-components';

function Keyword({ onFetchKeyword, gender, emote, photo }) {
    const { fetchKeywordData } = useKeyword({ gender, emote });

    useEffect(() => {
        if (photo) {
            const file = base64ToFile(photo, "human.jpg");
            fetchKeywordData(file);
        }
    }, [photo]);

    function base64ToFile(base64, filename) {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1].replace('jpeg', 'jpg'); // MIME 타입을 변경
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleButtonClick = async () => {
        if (photo) {
            const file = base64ToFile(photo, "human.jpg");
            const data = await fetchKeywordData(file);
            onFetchKeyword(data);
        } else {
            console.error('No photo provided');
        }
    };

    return (
        <ButtonWrapper>
            <button onClick={handleButtonClick}>닮은꼴 검사</button>
        </ButtonWrapper>
    );
}

export default Keyword;

const ButtonWrapper = styled.div`
    button {
        position:absolute;
        width: 200px;
        height: 60px;
        right:40px;
        background-color: transparent;
        border-radius: 34px;
        margin-top: 30px;
        font-size: 24px;
        text-align: center;
        line-height: 1.5;
        font-family: "SCDream";
        border:solid 3px black;
        &:hover {
            background-color: #c3c3c3;
        }
    }
`;
