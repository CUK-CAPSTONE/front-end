import React, { useEffect } from 'react';
import axios from 'axios';

const TestApi = () => {
    const key="rkxhfflreogkrrywkflsrhql2024";
    useEffect(()=>{
        initApi()
    },[]);

    // async function initApi(){
    //     try{
    //         const result = await axios.get('https://capstone.hyunn.site/api/user/images'
    //         // ,{
    //         //     headers:{
    //         //         Authorization:"rkxhfflreogkrrywkflsrhql2024",
    //         //         "phone": "01012345678",
    //         //         "email": "root@naver.com"
    //         //     },
    //         // }
    //         );
    //         console.log(result);
    //     }
    //     catch(error){
    //         console.error(error);
    //     }
    // }
    async function initApi(){
        try{
            const result = await axios.post('/api/user/images',{
                withCredentials:true,
                headers:{ 'x-api-key':"testapieky1234"},
                "phone": "01012345678",
                "email": "root@naver.com",
            });
            console.log(result);
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <>
        </>
    );
};

export default TestApi;