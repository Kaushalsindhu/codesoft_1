import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css'
import { useFlashMessage } from './../../context/FlashMessageContext';

function Notifications () {
  const [notifications, setNotifications] = useState([]);
  const {showFlashMessage} = useFlashMessage();

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/user/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const removeNotification = async (notification) => {
    try {
      const response = await axios.put(`/api/user/notifications`, {data:{notification}});
      // Remove the notification from the state to update the UI
      setNotifications(notifications.filter(n => n !== notification));
      showFlashMessage(response.data.message, response.data.type);
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((notification, index) => (
            <li className="notification-item" key={index}>
              <p>{notification}</p>
              <button onClick={() => removeNotification(notification)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-notifications">No notifications yet</div>
      )}
    </div>
  );
};

export default Notifications;