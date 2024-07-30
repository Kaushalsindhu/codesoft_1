import { createContext, useContext } from 'react';

const FlashMessageContext = createContext();

export const useFlashMessage = () => {
    return useContext(FlashMessageContext);
};

export default FlashMessageContext;