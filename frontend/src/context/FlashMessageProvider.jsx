import React, { useState } from 'react';
import FlashMessageContext from './FlashMessageContext';

const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const showFlashMessage = (message, type = 'success') => {
    setFlashMessage({ message, type });
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000); // Automatically clear after 3 seconds
  };

  const clearFlashMessage = () => {
    setFlashMessage(null);
  };

  return (
    <FlashMessageContext.Provider value={{ flashMessage, showFlashMessage, clearFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export default FlashMessageProvider;
