// const uploadSubmit = async (e) => {
    //     e.preventDefault();
    //     await fetchKeywordData();
    //     setDataFetched(true);
    //     try {

    //         setSuccess('업로드 완료!');
    //         setTimeout(()=>{
    //             setSuccess(null)
    //         },2000);
    //         setFile(null);
    //         if (fileref.current){
    //             fileref.current.value='';
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setError('업로드 실패 :(');
    //     }finally{setIsLoading(false)}
    // }


    // useEffect(()=>{
    //     const objResult = async () => {
    //         console.log("objResult 함수 실행됨");
    //         console.log(obj);
    //         try {
    //             console.log("최종 obj 가져오는 중...");
    //             var request={method: 'GET',
    //                 headers: {
    //                     'accept': '*/*',
    //                     "Access-Control-Allow-Origin": "*",
    //                     'x-api-key': 'wkflsrhql2024',
    //                 }
    //             }
    //             const response = await fetch(`https://capstone.hyunn.site/api/image/result/${obj}`,request);
    //             console.log(response);
    //             const responseData = await response.json();
    //             console.log(responseData);
    //             setResult(response.threeDimension);  // assuming the actual object URL or data is in responseData
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     if(obj){
    //         objResult();
    //     }
    // },[obj]);
