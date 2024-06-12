import React, { useEffect, useState } from 'react';
import { usePaylist } from '../api/paylist';
import styled from 'styled-components';
import Head from '../components/Head';

const PayCheck = () => {
    const { data, loading, error } = usePaylist();
    const [receive, setReceive] = useState(null);

    useEffect(() => {
        if (!loading && data) {
            setReceive(data);
        }
    }, [loading, data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Head />
            {receive && (
                <Inner>
                    <PaylistWrapper>
                        <TextWrapper>
                            <p className='payMenu'>결제 내역</p>
                            <p>paymentId : {receive[0].paymentId ? receive[0].paymentId : "없음"}</p>
                            <p>productName : {receive[0].productName ? receive[0].productName : "없음"}</p>
                            <p>price : {receive[0].price ? receive[0].price : "없음"}</p>
                            <p>address : {receive[0].address ? receive[0].address : "없음"}</p>
                            <p>tid : {receive[0].paymentId ? receive[0].paymentId : "없음"}</p>
                            <p>imageId : {receive[0].imageId ? receive[0].imageId : "없음"}</p>
                            <p>shipping : {receive[0].shipping ? receive[0].shipping : "없음"}</p>
                            <p>keyword : {receive[0].keyWord ? receive[0].keyWord : "없음"}</p>
                        </TextWrapper>
                    </PaylistWrapper>
                </Inner>
            )}
        </>
    );
};

export default PayCheck;

const Inner = styled.div`
    width: 1200px;
    margin-left: 300px;
    overflow: hidden;
`;

const PaylistWrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 60px); /* Head 컴포넌트의 높이를 고려한 조정 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ececec;

    .payMenu {
        margin-top: 20px;
        font-size: 28px; /* 폰트 크기 조정 */
        font-weight: bold;
    }

    p {
        width: 800px;
        text-align: center;
        margin-bottom: 20px; /* 마진 조정 */
        font-size: 24px; /* 폰트 크기 조정 */
    }
`;

const TextWrapper = styled.div`
    width: 800px;
    background-color: transparent;
    z-index: 2;
    padding-top: 20px;
`;
