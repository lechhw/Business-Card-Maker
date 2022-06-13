import React, { memo, useRef } from 'react';
import styles from './card.module.css';
import domToImage from 'dom-to-image';
import { saveAs } from 'file-saver';

const DEFAULT_IMAGE = './images/default_profile.png';

const Card = memo(({ card }) => {
  const { name, title, company, address, number, email, theme, fileURL } = card;
  const url = fileURL || DEFAULT_IMAGE;
  const cardRef = useRef();

  const onSaveFile = () => {
    const card = cardRef.current;
    const filter = (card) => {
      return card.tagName !== 'BUTTON';
    };
    domToImage.toBlob(card, { filter: filter }).then((blob) => {
      saveAs(blob, 'card.png');
    });
  };

  return (
    <li className={styles.list}>
      <article ref={cardRef} className={`${styles.card} ${getTheme(theme)}`}>
        <button className={styles.save} onClick={onSaveFile}>
          <img src="./images/save.png" alt="save" />
        </button>

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
});

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
