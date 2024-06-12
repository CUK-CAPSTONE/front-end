import { useEffect, useState } from "react";

export function usePaylist() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaylist = async () => {
            console.log("fetchKakao 함수 실행됨");
            try {
                console.log("결제내역 불러오는 중..");
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
                            "phone": "01089788746",
                            "email": "land8746@naver.com"
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
    }, []);

    return { data, loading, error };
}
