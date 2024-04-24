// ChatHistory.js
import React from 'react';
import styles from './ChatHistory.module.css';

const ChatHistory = ({ selectedUser, users }) => {
  const user = users.find((user) => user.username === selectedUser);
  // Assuming selectedUser contains the chats for the selected user
  const chats = user ? user.chats : [];

  // Reverse the order of chats to display them from bottom to top
  const reversedChats = [...chats].reverse();

  return (
    <div className={styles.chatHistory}>
      <div className={styles.chatContainer}>
        {reversedChats.map((chat) => (
          <div
            key={chat.id}
            className={`${styles.chat} ${chat.sender === 'You' ? styles.sent : styles.received}`}
          >
            <p className={styles.sender}>{chat.sender}:</p>
            <p className={styles.message}>{chat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
