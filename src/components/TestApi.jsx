import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestApi = () => {
    useEffect(()=>{
        initApi();
    },[]);

    
    async function initApi(){
          // const [mtl,setMtl]=useState(null);
          // const [texture,setTexture]=useState(null);
      
          try{
              const response= await axios.post(
                  `https://capstone.hyunn.site/api/image/text_to_3D/cat`,
                  {
                      "image": "img/human.jpg",
                      "gender": "male",
                      "emotion": "happy"
                  },
                  {
                      headers:{
                          'accept':'*/*',
                          'x-api-key':'wkflsrhql2024',
                          'Content-Type':'application/json'
                      }
                  }
              )
              console.log(response);
          }
          catch(error){
              console.log(error);
          }
    }

    return (
        <>
        </>
    );
};

export default TestApi;