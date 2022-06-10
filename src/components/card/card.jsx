import React from 'react';
import styles from './card.module.css';

const DEFAULT_IMAGE = './images/default_profile.png';

const Card = ({ card }) => {
  const { name, title, company, address, number, email, theme, fileURL } = card;
  const url = fileURL || DEFAULT_IMAGE;

  return (
    <li className={styles.list}>
      <article className={`${styles.card} ${getTheme(theme)}`}>
        <div className={styles.info}>
          <div className={styles.profile}>
            <img className={styles.avatar} src={url} alt="profile" />
          </div>
          <strong className={styles.name}>{name}</strong>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.detail_info}>
          <p className={styles.company}>{company}</p>
          <p className={styles.address}>{address}</p>
          <p className={styles.number}>{number}</p>
          <p className={styles.email}>{email}</p>
        </div>
      </article>
    </li>
  );
};

function getTheme(theme) {
  switch (theme) {
    case 'light':
      return styles.light;
    case 'dark':
      return styles.dark;
    default:
      throw new Error(alert('There is no such theme.'));
  }
}
export default Card;
