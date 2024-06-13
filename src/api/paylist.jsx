import { useEffect, useState } from "react";

export function usePaylist(email,phoneNumber) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaylist = async () => {
            console.log("fetchPaylist 함수 실행됨");
            try {
                console.log("결제내역 불러오는 중..");
                console.log("현재 전화번호 :",phoneNumber);
                console.log("현재 이메일 :",email);
                const response = await fetch(
                    `https://capstone.hyunn.site/api/user/payments`,
                    {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'x-api-key': 'wkflsrhql2024',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            "phone": phoneNumber,
                            "email": email
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log("받아온 결제내역", responseData.data);

                setData(responseData.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error);
                setLoading(false);
            }
        };

        fetchPaylist();
    }, [email,phoneNumber]);

    return { data, loading, error };
}
