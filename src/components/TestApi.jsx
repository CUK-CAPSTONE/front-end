import React, { useEffect } from 'react';

const TestApi = () => {
    const key="rkxhfflreogkrrywkflsrhql2024";
    useEffect(()=>{
        initApi()
    },[]);

    async function initApi(){
        try{
            // const result = await axios.get('https://capstone.hyunn.site/swagger-ui/index.html');
            // console.log(result);
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