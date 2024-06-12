import { useEffect, useState } from "react";

export function useKakao() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKakao = async () => {
            console.log("fetchKakao 함수 실행됨");
            try {
                console.log("결제 준비 중..");
                const response = await fetch(
                    `https://capstone.hyunn.site/api/payment/ready?image_id=9`,
                    {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'x-api-key': 'wkflsrhql2024',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            "partner_user_id": "01089788746",
                            "item_name": "초코파이",
                            "total_amount": 1100
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                const kakaoUrl = responseData.data.next_redirect_pc_url; // assuming this is the returned URL key
                console.log("Received kakao URL:", kakaoUrl);

                setData(kakaoUrl);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error);
                setLoading(false);
            }
        };

        fetchKakao();
    }, []);

    return { data, loading, error };
}
