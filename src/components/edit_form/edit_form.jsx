import React from 'react';
import Button from '../button/button';
import ImageInput from '../image_input/image_input';
import styles from './edit_form.module.css';

const EditForm = ({ card }) => {
  const { name, title, company, address, number, email, theme, fileURL } = card;
  return (
    <li>
      <form className={styles.form}>
        <input className={styles.input} type="text" name="name" value={name} />
        <input
          className={styles.input}
          type="text"
          name="title"
          value={title}
        />
        <input
          className={styles.input}
          type="text"
          name="company"
          value={company}
        />
        <input
          className={styles.input}
          type="text"
          name="address"
          value={address}
        />
        <input
          className={styles.input}
          type="text"
          name="name"
          value={number}
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          value={email}
        />
        <div className={styles.wrapper}>
          <div className={styles.image_input}>
            <ImageInput />
          </div>
          <select className={styles.select} name="theme" value={theme}>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
          <div className={styles.button}>
            <Button name="Delete" />
          </div>
        </div>
      </form>
    </li>
  );
};

export default EditForm;
