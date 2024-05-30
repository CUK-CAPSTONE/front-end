import { useState } from 'react';

function getMaxKey(obj) {
    let maxKey = null;
    let maxValue = -Infinity;

    for (const [key, value] of Object.entries(obj)) {
        if (value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    }

    return maxKey;
}

export function useKeyword() {
    const [keyword, setKeyword] = useState(null);
    const [keywordText, setKeywordText] = useState(null);

    async function fetchKeywordData() {
        try {
            // 이미지 파일 경로 (public 폴더 기준)
            const imageUrl = 'img/human.jpg';

            // 이미지 파일 로드
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'human.jpg', { type: 'image/jpeg' });

            // FormData 객체 생성 및 파일 추가
            const form = new FormData();
            form.append('file', file);

            // API 호출
            const apiResponse = await fetch('https://capstone.hyunn.site/api/image/image_to_text?gender=female&emotion=happy', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'x-api-key': 'wkflsrhql2024'
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
            const mainKey = getMaxKey(responseKeyword);

            setKeyword(responseKeyword);
            setKeywordText(mainKeyText);

            return { keyword: responseKeyword, keywordText: mainKeyText };
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return { fetchKeywordData };
}
