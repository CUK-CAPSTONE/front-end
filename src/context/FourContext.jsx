// FourContext.js
import React, { createContext, useContext, useState } from 'react';

const FourContext = createContext();

export const useDataContext = () => {
    return useContext(FourContext);
};

export const FourProvider = ({ children }) => {
    const [data, setData] = useState({
        photo: null,
        maxAnimal: null,
        gender: "male",
        emote: "angry"
    });

    return (
        <FourContext.Provider value={{ data, setData }}>
            {children}
        </FourContext.Provider>
    );
};
