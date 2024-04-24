// Sidebar.js
import React from 'react';
import Card from '../../components/Card/Card';
import styles from './Sidebar.module.css';

const Sidebar = ({ users, onUserSelect }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Chats</h2>
      <div className={styles.scrollableContainer}>
        {users.map((user) => (
          <div key={user.id} className={styles.cardContainer}>
            <Card
              username={user.username}
              onClick={() => onUserSelect(user.username)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
