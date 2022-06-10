import React from 'react';
import EditForm from '../edit_form/edit_form';
import styles from './editor.module.css';

const Editor = ({ cards }) => (
  <section className={styles.editor}>
    <ul>
      {Object.keys(cards).map((key) => (
        <EditForm key={key} card={cards[key]} />
      ))}
    </ul>
  </section>
);

export default Editor;
