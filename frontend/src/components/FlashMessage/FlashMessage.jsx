import React from 'react';
import { useFlashMessage } from '../../context/FlashMessageContext';
import './FlashMessage.css';

const FlashMessage = () => {
    const { flashMessage } = useFlashMessage();
  
    if (!flashMessage) return null;
  
    return (
      <div className={`flash-message ${flashMessage.type}`}>
        {flashMessage.message}
      </div>
    );
};
   
  export default FlashMessage;