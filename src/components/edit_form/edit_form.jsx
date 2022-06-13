import React, { useRef } from 'react';
import styles from './edit_form.module.css';

const EditForm = ({ FileInput, card, updateCard, deleteCard }) => {
  const {
    name,
    title,
    company,
    address,
    number,
    email,
    theme,
    fileName,
    fileURL,
  } = card;

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

  const onFileChange = (file) => {
    updateCard({
      ...card,
      fileName: 'Uploaded',
      fileURL: file.url,
    });
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        name="name"
        value={name}
        placeholder="Name"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        name="title"
        value={title}
        placeholder="Title"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        name="company"
        value={company}
        placeholder="Company"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        name="address"
        value={address}
        placeholder="Address"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        name="number"
        value={number}
        placeholder="Number"
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="email"
        autoComplete="off"
        name="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
      />
      <div className={styles.wrapper}>
        <div className={styles.image_input}>
          <FileInput onFileChange={onFileChange} name={fileName} />
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
