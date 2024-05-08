import React, { useEffect } from 'react';
import axios from 'axios';

const TestApi = () => {
    useEffect(()=>{
        initApi()
    },[]);

    
    async function initApi(){
        try{
            const response = await axios.post(
                'https://capstone.hyunn.site/api/user/images',
                {
                  'phone': '01012345678',
                  'email': 'root@naver.com'
                },
                {
                  headers: {
                    'accept': '*/*',
                    'x-api-key': 'wkflsrhql2024',
                    'Content-Type': 'application/json'
                  }
                }
              );

            
            
            console.log(typeof(response));
            console.log(JSON.stringify(response))

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