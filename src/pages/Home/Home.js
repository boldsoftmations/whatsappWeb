// Home.js
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Home.module.css';
import ChatHistory from '../../components/ChatHistory/ChatHistory';
import { users } from '../../config/UsersList';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (username) => {
    setSelectedUser(username);
  };

  console.log("selectedUser",selectedUser)
  return (
    <div className={styles.homeContainer}>
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Sidebar users={users} onUserSelect={handleUserSelect} />
        </div>
        
        {/* Chat History */}
        <div className={styles.chatHistory}>
          <ChatHistory users={users} selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default Home;
