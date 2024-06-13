import React, { useEffect, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import styled from 'styled-components';
import Keyword from '../api/Keyword';
import { useDataContext } from '../context/FourContext';

const Uploader = ({ emote, gender, setMaxAnimalParent }) => {
    const [file, setFile] = useState(null); //사진 (키워드 api 요소)
    const [photoReady, setPhotoReady] = useState(false);
    const [success, setSuccess] = useState(null);
    //키워드, 키워드 텍스트
    const [animalObj, setAnimalObj] = useState(null);
    const [animalText, setAnimalText] = useState(null);
    const [example, setExample] = useState(null);
    //퍼센테이지
    const [deerPer, setDeerPer] = useState(0);
    const [dogPer, setDogPer] = useState(0);
    const [catPer, setCatPer] = useState(0);
    const [rabbitPer, setRabbitPer] = useState(0);
    const [bearPer, setBearPer] = useState(0);
    const [maxAnimal, setMaxAnimal] = useState(null);

    const { data, setData } = useDataContext();

    const handleFetchKeyword = ({ keyword, keywordText, keyTalent }) => {
        setAnimalObj(keyword);
        setAnimalText(keywordText);
        setExample(keyTalent);
        console.log("연예인 :", example);
        updateStateBasedOnMaxValue(keyword);

        setData(prevData => ({
            ...prevData,
            maxAnimal: Object.keys(keyword).reduce((a, b) => (keyword[a] > keyword[b] ? a : b)),
            emote,
            gender
        }));
    };

    useEffect(() => {
        console.log('Data updated:', data);
    }, [data]);

    // 객체에서 가장 큰 값을 가진 동물 값 뽑아내기
    const updateStateBasedOnMaxValue = (data) => {
        let maxValue = -Infinity;
        let maxAnimal = '';

        for (const [animal, value] of Object.entries(data)) {
            // 퍼센테이지 숫자 업데이트
            if (animal === 'deer') {
                setDeerPer(value);
            } else if (animal === 'cat') {
                setCatPer(value);
            } else if (animal === 'dog') {
                setDogPer(value);
            } else if (animal === 'rabbit') {
                setRabbitPer(value);
            } else if (animal === 'bear') {
                setBearPer(value);
            }

            // api에 넣을 키워드 뽑아내기
            if (value > maxValue) {
                maxAnimal = animal;
            }
        }

        if (maxAnimal) {
            setMaxAnimal(maxAnimal);
            setMaxAnimalParent(maxAnimal); // 부모 컴포넌트에 상태 전달
        }
    };

    // 이미지 제출 시 함수
    const onChangeImage = (e) => {
        const { files } = e.target;
        const uploadFile = files[0];
        const reader = new FileReader();

        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => {
            setFile(reader.result);
        };
    };

    // api 발사 준비
    useEffect(() => {
        if (file) {
            setPhotoReady(true);
        }
    }, [file]);

    return (
        <TotalWrapper>
            <img src={file} />
            <label htmlFor="file">
                <div className="btn-upload">
                    <div className='uploadicon'>
                        <FaFileUpload />
                        <span className='uploadBtnText'> 사진 업로드</span>
                    </div>
                </div>
            </label>
            <input type="file" accept="image/*" id="file" onChange={onChangeImage} />
            {photoReady && <Keyword onFetchKeyword={handleFetchKeyword} gender={gender} emote={emote} photo={file} />}
            {maxAnimal && (
                <ParameterWrapper>
                    <Container>
                        <span>사슴상</span>
                        <Background />
                        <Deer percent={deerPer * 100} />
                    </Container>
                    <Container>
                        <span>강아지상</span>
                        <Background />
                        <Dog percent={dogPer * 100} />
                    </Container>
                    <Container>
                        <span>토끼상</span>
                        <Background />
                        <Rabbit percent={rabbitPer * 100} />
                    </Container>
                    <Container>
                        <span>고양이상</span>
                        <Background />
                        <Cat percent={catPer * 100} />
                    </Container>
                    <Container>
                        <span>곰상</span>
                        <Background />
                        <Bear percent={bearPer * 100} />
                    </Container>
                    <div>
                        <ResultAnimal>{animalText}</ResultAnimal>
                        <ResultExample>연예인 : {example}</ResultExample>
                    </div>
                </ParameterWrapper>
            )}
            <div>{success}</div>
        </TotalWrapper>
    );
};

const TotalWrapper = styled.div`
    width: 500px;
    height: 750px;
    position: relative;
    border: none;
    label {
        display: inline-block;
        position: absolute;
        left: 20px;
        width: 214px;
        height: 60px;
    }
    img {
        position: relative;
        top: 20px;
        left: 50px;
        padding-bottom: 10px;
        width: 400px;
        height: 400px;
        border: none;
    }
    #file {
        display: none;
    }
    .btn-upload {
        position: relative;
        display: flex;
        width: 200px;
        height: 54px;
        z-index: 2;
        background-color: transparent;
        border: solid 3px black;
        border-radius: 34px;
        margin-top: 30px;
        margin-left: 20px;

        &:hover {
            background-color: #c3c3c3;
        }
    }
    .uploadicon {
        margin: 0 auto;
        font-size: 24px;
        height: 100%;
        text-align: center;
        line-height: 1.5;
        justify-content: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .uploadBtnText {
        font-size: 24px;
        text-align: center;
        line-height: 1.5;
        justify-content: center;
        margin-left: 8px;
    }
`;

const Container = styled.div`
  margin: 10px 0;
  height: 10px;
  width: 400px;
  position: relative;
  line-height: 1.5;
  span {
    position: absolute;
    left: 20px;
    font-size: 10px;
    margin-bottom: 1px;
  }
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 70px;
  top: 0;
  border-radius: 3px;
  transition: width 10s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: lightgrey;
  width: 100%;
`;

const Deer = styled(BaseBox)`
  background: #75cc54;
  width: ${({ percent }) => percent}%;
`;

const Dog = styled(BaseBox)`
  background: #1BAFEA;
  width: ${({ percent }) => percent}%;
`;

const Rabbit = styled(BaseBox)`
  background: #EBA6BE;
  width: ${({ percent }) => percent}%;
`;

const Cat = styled(BaseBox)`
  background: #FBB03B;
  width: ${({ percent }) => percent}%;
`;

const Bear = styled(BaseBox)`
  background: #C38C66;
  width: ${({ percent }) => percent}%;
`;

const ResultAnimal = styled.div`
    font-size: 15px;
`;

const ResultExample = styled.div`
    margin-top: 5px;
    font-size: 15px;
`;

const ParameterWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 500px;
    height: 200px;
`;

export default Uploader;
