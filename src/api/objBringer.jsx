import { useState, useEffect } from "react";
import { useDataContext } from "../context/FourContext";

export function useObjBringer() {
    const { data } = useDataContext();
    const [obj, setObj] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (data.photo) {
            const file = base64ToFile(data.photo, "photo.jpg");
            setPhoto(file);
        }
    }, [data.photo]);

    useEffect(() => {
        const fetchObj = async () => {
            console.log("fetchObj 함수 실행됨");
            try {
                console.log("3d 모델링 가져오는 중..");
                const response = await fetch(
                    `https://capstone.hyunn.site/api/image/text_to_3D/cat`, // 프록시 경로를 사용합니다.
                    {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'x-api-key': 'wkflsrhql2024',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            image: "img/human.jpg",
                            gender: "male",
                            emotion: "happy"
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                const objUrl = responseData.data.threeDimensionUrl.obj; // assuming this is the returned URL key
                console.log("Received obj URL:", objUrl);

                // 프록시를 통해 obj 파일을 다운로드
                const proxyObjUrl = `/proxy${new URL(objUrl).pathname}${new URL(objUrl).search}`;
                console.log("Proxy obj URL:", proxyObjUrl);

                const objResponse = await fetch(proxyObjUrl, {
                    headers: {
                        'accept': '*/*'
                    }
                });

                if (!objResponse.ok) {
                    throw new Error(`HTTP error! status: ${objResponse.status}`);
                }

                const objBlob = await objResponse.blob();
                const objFile = new File([objBlob], "model.obj", { type: objBlob.type });
                setObj(objFile);
                setLoading(false); // 로딩 완료
                console.log(objFile);
            } catch (error) {
                console.log(error);
                setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
            }
        };

        fetchObj();
    }, [photo]);

    return { obj, loading };
}
