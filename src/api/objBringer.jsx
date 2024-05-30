import { useState } from "react";

export async function sendThree(){

    const [obj,setObj]=useState(null);
    const [mtl,setMtl]=useState(null);
    const [texture,setTexture]=useState(null);

    try{
        const response= await axios.get(
            'https://capstone.hyunn.site/api/get-json',
            {
                'phone': '01012345678',
                'email' : 'root@naver.com'
            },
            {
                headers:{
                    'accept':'*/*',
                    'x-api-key':'wkflsrhql2024',
                    'Content-Type':'application/json'
                }
            }
        )

        setObj(response);
    }
    catch(error){
        console.log(error);
    }

    return obj;
}