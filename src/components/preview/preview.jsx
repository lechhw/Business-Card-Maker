import React from 'react';
import Card from '../card/card';
import styles from './preview.module.css';

const Preview = ({ cards }) => (
  <section className={styles.preview}>
    <div className={styles.badge}>Preview</div>
    <ul>
      {Object.keys(cards).map((key) => (
        <Card key={key} card={cards[key]} />
      ))}
    </ul>
  </section>
);

export default Preview;
