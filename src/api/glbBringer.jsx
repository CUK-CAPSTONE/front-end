import { useState, useEffect, useRef } from "react";
import { useDataContext } from "../context/FourContext";

export function useGlbBringer() {
    const { data } = useDataContext();
    const [glb, setGlb] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageId, setImageId] = useState(null);
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

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
        const fetchGlb = async () => {
            console.log("fetchGlb 함수 실행됨");
            try {
                console.log("3d 모델링 가져오는 중..");
                console.log("현재 사진 : ", data.photo);
                const response = await fetch(
                    `https://capstone.hyunn.site/api/image/text_to_3D/${data.maxAnimal}`,
                    {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'x-api-key': 'wkflsrhql2024',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            image: data.photo,
                            gender: data.gender,
                            emotion: data.emote
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                const glbUrl = responseData.data.threeDimensionUrl.glb;
                const glbImageId = responseData.data.imageId;
                setImageId(glbImageId);
                console.log("glbImageId :", imageId);

                // 상대 경로 생성
                const urlObj = new URL(glbUrl);
                const relativePath = urlObj.pathname + urlObj.search;
                const proxyGlbUrl = `${PROXY}${relativePath}`;
                console.log("Proxy glb URL:", proxyGlbUrl);

                const glbResponse = await fetch(proxyGlbUrl, {
                    headers: {
                        'accept': '*/*'
                    }
                });

                if (!glbResponse.ok) {
                    throw new Error(`HTTP error! status: ${glbResponse.status}`);
                }

                const glbBlob = await glbResponse.blob();
                const glbFile = new File([glbBlob], "model.glb", { type: glbBlob.type });
                console.log(glbFile);
                setGlb(glbFile);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        if (data.photo) {
            fetchGlb();
        }
    }, [data.maxAnimal, data.gender, data.emote]);

    useEffect(() => {
        if (glb) {
            console.log("GLB 파일 상태가 업데이트되었습니다:", glb);
        }
    }, [glb]);

    return { glb, loading, imageId };
}
