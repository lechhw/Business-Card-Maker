import React, { useState } from 'react';
import Card from '../card/card';
import Search from '../search/search';
import styles from './preview.module.css';

const Preview = ({ cards }) => {
  const [search, setSearch] = useState('');
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className={styles.preview}>
      <div className={styles.search}>
        <Search onChange={onChange} />
      </div>

      <ul>
        {!search &&
          Object.keys(cards).map((key) => <Card key={key} card={cards[key]} />)}

        {search &&
          Object.keys(cards)
            .filter((key) => cards[key].name.toLowerCase().includes(search))
            .map((key) => <Card key={key} card={cards[key]} />)}
      </ul>
    </section>
  );
};

export default Preview;
