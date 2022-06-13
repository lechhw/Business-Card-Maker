import React, { memo } from 'react';
import styles from './add_form.module.css';

const AddForm = memo(({ addCard }) => {
  const onSubmit = (e) => {
    e.preventDefault();

    const card = {
      id: Date.now(),
      name: '',
      title: '',
      company: '',
      address: '',
      number: '',
      email: '',
      theme: 'light',
      fileURL: '',
    };
    addCard(card);
  };

  return (
    <div className={styles.add_form} onClick={onSubmit}>
      <img src="./images/plus.png" alt="add" />
    </div>
  );
});

export default AddForm;
