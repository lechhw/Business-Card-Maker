import React, { useRef } from 'react';
import ImageInput from '../image_input/image_input';
import styles from './edit_form.module.css';

const EditForm = ({ card, updateCard, deleteCard }) => {
  const { name, title, company, address, number, email, theme, fileURL } = card;

  const onSubmit = (e) => {
    e.preventDefault();
    deleteCard(card);
  };

  const onChange = (e) => {
    if (e.target == null) {
      return;
    }
    e.preventDefault();
    updateCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        name="title"
        value={title}
        placeholder="Title"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        name="company"
        value={company}
        placeholder="Company"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        name="address"
        value={address}
        placeholder="Address"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        name="number"
        value={number}
        placeholder="Number"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
      />
      <div className={styles.wrapper}>
        <div className={styles.image_input}>
          <ImageInput />
        </div>
        <select
          className={styles.select}
          name="theme"
          value={theme}
          onChange={onChange}
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
        <button className={styles.button} onClick={onSubmit}>
          Delete
        </button>
      </div>
    </form>
  );
};

export default EditForm;
