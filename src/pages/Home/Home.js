import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Home.module.css';
import ChatHistory from '../../components/ChatHistory/ChatHistory';
import { users } from '../../config/UsersList';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Set the selected user to the first user by default when the component mounts
  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0].username);
    }
  }, []);

  const handleUserSelect = (username) => {
    setSelectedUser(username);
  };

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
