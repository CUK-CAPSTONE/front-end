import { useState } from 'react';

export function useKeyword({ gender, emote }) {
    const [keyword, setKeyword] = useState(null);
    const [keywordText, setKeywordText] = useState(null);

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

            const data = await apiResponse.json();
            const responseKeyword = data.data.keyWord;
            const mainKeyText = data.data.title;

            setKeyword(responseKeyword);
            setKeywordText(mainKeyText);

            return { keyword: responseKeyword, keywordText: mainKeyText };
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return { fetchKeywordData, keyword, keywordText };
}
