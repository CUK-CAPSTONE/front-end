import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PaymentResult = () => {
    const location = useLocation();
    const paymentData = location.state;

    return (
        <ResultWrapper>
            {paymentData ? (
                <div>
                    <h2>결제 결과</h2>
                    <p>상품명: {paymentData.productName}</p>
                    <p>총 금액: {paymentData.amount.total}원</p>
                    <p>배송지: {paymentData.address}</p>
                    <p>결제 상태: {paymentData.shippingStatus}</p>
                    <p>사용자 닉네임: {paymentData.userNickname}</p>
                    <p>이메일: {paymentData.userEmail}</p>
                    <p>승인 시간: {paymentData.approvedAt}</p>
                    <p>전화번호: {paymentData.phoneNumber}</p>
                </div>
            ) : (
                <p>결제 정보를 불러오는 중...</p>
            )}
        </ResultWrapper>
    );
};

export default PaymentResult;

const ResultWrapper = styled.div`
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;

    h2 {
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 10px;
    }
`;
