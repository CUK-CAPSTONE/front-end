import { useState, useEffect } from "react";
import { useDataContext } from "../context/FourContext";

export function useObjBringer() {
    const { data } = useDataContext();
    const [obj, setObj] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [result,setResult]=useState(null);

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
                console.log("3d 코드 가져오는중..");
                const response = await fetch(
                    `https://capstone.hyunn.site/api/image/text_to_3D/cat`,
                    {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'x-api-key': 'wkflsrhql2024',
                            'Content-type' : 'application/json'
                        },
                        body: JSON.stringify({
                            image: "img/human.jpg",
                            gender: "male",
                            emotion: "happy"
                        })
                    }
                );
                const responseData = await response.json();
                setObj(responseData.data.previewResult);  // assuming the actual object URL or data is in responseData
            } catch (error) {
                console.log(error);
            }
        };

        fetchObj();
    }, [photo]);

    useEffect(()=>{
        const objResult = async () => {
            console.log("objResult 함수 실행됨");
            console.log(obj);
            try {
                console.log("최종 obj 가져오는 중...");
                var request={method: 'GET',
                    headers: {
                        'accept': '*/*',
                        "Access-Control-Allow-Origin": "*",
                        'x-api-key': 'wkflsrhql2024',
                    }
                }
                const response = await fetch(`https://capstone.hyunn.site/api/image/result/${obj}`,request);
                console.log(response);
                const responseData = await response.json();
                console.log(responseData);
                setResult(response.threeDimension);  // assuming the actual object URL or data is in responseData
            } catch (error) {
                console.log(error);
            }
        };

        if(obj){
            objResult();
        }
    },[obj]);

    return result;
}
