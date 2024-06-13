import React, { useEffect, useState } from 'react';
import { usePaylist } from '../api/paylist';
import styled from 'styled-components';
import Head from '../components/Head';

const PayCheck = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { data, loading, error } = usePaylist(triggerFetch ? email : null, triggerFetch ? phone : null);
    const [receive, setReceive] = useState(null);

    useEffect(() => {
        if (!loading && data) {
            setReceive(data);
            console.log(receive);
        }
    }, [loading, data]);

    if (loading) {
        return <div>please wait a second...</div>;
    }

    return (
        <>
            <Head />
            <Container>
                <InputWrapper>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Phone Number:
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </label>
                    <button onClick={() => setTriggerFetch(true)}>조회</button>
                </InputWrapper>
                {receive && (
                    <Inner>
                        <PaylistWrapper>
                            {receive.map((item, index) => (
                                <TextWrapper key={index}>
                                    <p className='payMenu'>결제 내역 {index + 1}</p>
                                    <p>결제 ID : {item.paymentId ? item.paymentId : "없음"}</p>
                                    <p>제품명 : {item.productName ? item.productName : "없음"}</p>
                                    <p>가격 : {item.price ? item.price : "없음"}</p>
                                    <p>주소 : {item.address ? item.address : "없음"}</p>
                                    <p>tid : {item.paymentId ? item.paymentId : "없음"}</p>
                                    <p>이미지 ID : {item.imageId ? item.imageId : "없음"}</p>
                                    <p>배송 상태 : {item.shipping ? item.shipping : "없음"}</p>
                                    <p>키워드 : {item.keyWord ? item.keyWord : "없음"}</p>
                                    <ButtonWrapper>
                                        <a href={item.image} target="_blank" rel="noopener noreferrer">
                                            <button>이미지 다운로드</button>
                                        </a>
                                        <a href={item.threeDimension} target="_blank" rel="noopener noreferrer">
                                            <button>모델링 다운로드</button>
                                        </a>
                                    </ButtonWrapper>
                                </TextWrapper>
                            ))}
                        </PaylistWrapper>
                    </Inner>
                )}
            </Container>
        </>
    );
};

export default PayCheck;

const Container = styled.div`
    width:1200px;
    margin-left:360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh; /* Viewport height를 기준으로 최소 높이를 설정 */
    padding-top: 100px; /* Head 컴포넌트 아래로 내리기 위한 패딩 조정 */
    background-color: #ececec;
    overflow-y: auto; /* 스크롤 가능하도록 설정 */
`;

const Inner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px; /* InputWrapper 아래로 내리기 위한 마진 조정 */
    overflow: hidden;
`;

const PaylistWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column; /* 여러 개의 TextWrapper를 수직으로 배치 */
    justify-content: center;
    align-items: center;
    background-color: #ececec;
`;

const TextWrapper = styled.div`
    width: 800px;
    background-color: transparent;
    z-index: 2;
    padding-top: 20px;
    margin-bottom: 20px; /* 각 결제 내역 간의 간격을 위해 추가 */

    .payMenu {
        margin-top: 20px;
        font-size: 28px; /* 폰트 크기 조정 */
        font-weight: bold;
    }

    p {
        text-align: center;
        margin-bottom: 20px; /* 마진 조정 */
        font-size: 24px; /* 폰트 크기 조정 */
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    button {
        padding: 10px 20px;
        font-size: 18px;
        background-color: #6EE046;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #58b338;
        }
    }
`;

const InputWrapper = styled.div`
    width: 800px;
    margin: 0 auto; /* Inner와 같은 배경색을 적용하기 위해 변경 */
    padding-bottom: 20px; /* 추가된 패딩 */
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ececec; /* Inner와 동일한 배경색 */

    label {
        margin-bottom: 10px;
        font-size: 18px;

        input {
            margin-left: 10px;
            padding: 5px;
            font-size: 16px;
        }
    }

    button {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 18px;
        background-color: #6EE046;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #58b338;
        }
    }
`;
