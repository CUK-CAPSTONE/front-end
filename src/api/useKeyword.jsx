import { useState } from 'react';
import { useDataContext } from '../context/FourContext';

export function useKeyword({ gender, emote }) {
    const [keyword, setKeyword] = useState(null);
    const [keywordText, setKeywordText] = useState(null);
    const { data, setData } = useDataContext();
    const [keyTalent,setKeyTalent]=useState(null);

    async function fetchKeywordData(file) {
        try {
            // FormData 객체 생성 및 파일 추가
            const form = new FormData();
            form.append('file', file);

            // API 호출
            const apiResponse = await fetch(`https://capstone.hyunn.site/api/image/image_to_text?gender=${gender}&emotion=${emote}`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'x-api-key': 'wkflsrhql2024',
                },
                body: form
            });

            // 응답 처리
            if (!apiResponse.ok) {
                throw new Error(`HTTP error! Status: ${apiResponse.status}`);
            }

            const resData = await apiResponse.json();
            console.log("키워드 api로부터 받아온 data",resData);
            setData(prevData => ({
                ...prevData,
                photo: resData.data.image,
            }));
            const responseKeyword = resData.data.keyWord;
            const mainKeyText = resData.data.title;
            const talent = resData.data.example;

            setKeyword(responseKeyword);
            setKeywordText(mainKeyText);
            setKeyTalent(talent);
            console.log(talent);
            console.log(keyTalent);

            return { keyword: responseKeyword, keywordText: mainKeyText, keyTalent: talent };
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return { fetchKeywordData, keyword, keywordText, keyTalent };
}
