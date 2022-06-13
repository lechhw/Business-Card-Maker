import React from 'react';
import AddForm from '../add_form/add_form';
import EditForm from '../edit_form/edit_form';
import styles from './editor.module.css';

const Editor = ({ FileInput, cards, updateCard, addCard, deleteCard }) => (
  <section className={styles.editor}>
    <ul>
      {Object.keys(cards).map((key) => (
        <EditForm
          key={key}
          FileInput={FileInput}
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
