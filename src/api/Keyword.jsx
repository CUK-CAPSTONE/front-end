import React from 'react';
import { useKeyword } from './useKeyword';

function Keyword({ onFetchKeyword }) {
    const { fetchKeywordData } = useKeyword();

    const handleButtonClick = async () => {
        const data = await fetchKeywordData();
        onFetchKeyword(data);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Fetch Keyword Data</button>
        </div>
    );
}

export default Keyword;