import React from 'react';
import AddForm from '../add_form/add_form';
import EditForm from '../edit_form/edit_form';
import styles from './editor.module.css';

const Editor = ({ cards, updateCard, addCard, deleteCard }) => (
  <section className={styles.editor}>
    <div className={styles.badge}>Editor</div>
    <ul>
      {Object.keys(cards).map((key) => (
        <EditForm
          key={key}
          card={cards[key]}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ))}
    </ul>

    <AddForm addCard={addCard} />
  </section>
);

export default Editor;
