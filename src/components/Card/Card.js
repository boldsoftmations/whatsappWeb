import React from 'react';
import styles from './Card.module.css';
import AvatarImage from '../../Images/Avtaar.png'; // Adjust the path and filename as necessary

const Card = ({ username, onClick }) => {
  const handleClick = () => {
    onClick(username); // Call the onClick handler with the username when the card is clicked
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.avatar}>
        <img src={AvatarImage} alt="Avatar" className={styles.avatarImage} />
      </div>
      <div className={styles.username}>{username}</div>
    </div>
  );
};

export default Card;
