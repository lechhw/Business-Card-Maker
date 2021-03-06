# πΌ Business Card Maker

# Intro

React λ₯Ό μ΄μ©νμ¬ μμν λͺν¨ μ μ μΉ μ΄νλ¦¬μΌμ΄μμλλ€.<br>
Firebase μ Authentication μλΉμ€λ₯Ό μ΄μ©νμ¬ μμλ‘κ·ΈμΈ κΈ°λ₯μ κ΅¬ννμκ³ ,<br>
μ΄ κ³Όμ μμ μ»μ΄μ¨ user uid κ°μΌλ‘ Realtime database μ λͺν¨μ μ€μκ°μΌλ‘ CRUD ν  μ μκ²λ κ΅¬ν νμμ΅λλ€.<br>
κ·Έλ¦¬κ³  Cloudinary λ₯Ό μ΄μ©νμ¬ μ¬μ©μκ° μ΄λ―Έμ§λ₯Ό μλ²μ μλ‘λ ν  μ μκ² νμ¬ μΈμ  μ΄λμλ  ν΄λΉ μ΄λ―Έμ§λ₯Ό λΆλ¬μ¬ μ μμ΅λλ€.<br>
λν μΈλΆλΌμ΄λΈλ¬λ¦¬(dom-to-image, fileSaver) λ₯Ό μ¬μ©νμ¬ μμ±ν μΉ΄λλ₯Ό png νμΌλ‘ μ μ₯ν  μ μλ κΈ°λ₯μ κ΅¬ννμμ΅λλ€.

<br>

## Live Demo : [Business Card Maker](https://lechhw-business-card-maker.netlify.app)

μμκΈ°κ° (2022.06.09 ~ 2022.06.13)

<br>

# Skills

- [x] React
  - React Functional Component
- [x] React Router
- [x] PostCSS
- [x] Firebase
  - Authentication
  - Realtime Database
- [x] Cloudinary
- [x] Deploy: Netlify

<br>

# Preview

## Login

<img src="https://user-images.githubusercontent.com/99241230/173326906-760eb6a2-d72f-4009-b8e0-e58bdfcbcdd6.gif">

<br>

## Maker

<img src="https://user-images.githubusercontent.com/99241230/173326710-537b400f-2bce-4a8c-b1fd-6c263425035b.gif">

<br>

## Save & Search

<img src="https://user-images.githubusercontent.com/99241230/173327792-fdb03992-14a9-426d-8331-b3be09afaac0.gif">

<br>

## Responsive Web

<img  src="https://user-images.githubusercontent.com/99241230/173328278-be6daea5-5a5e-42d1-829a-e0db13f635f0.gif">

<br>

# Solution

## β Database
`syncCard()` ν¨μλ λ°μ΄ν°λ² μ΄μ€μ ν΄λΉ ref(κ²½λ‘) μ λ¦¬μ€λλ₯Ό λ±λ‘νμ¬ λ³κ²½μ¬ν­μ΄ μλ€λ©΄ λ±λ‘λ μ½λ°± ν¨μλ₯Ό νΈμΆν©λλ€. κ·Έλ¦¬κ³  μΆνμ λ¦¬μ€λλ₯Ό μ κ±°ν΄μ£Όλ `off()` ν¨μλ₯Ό λ¦¬ν΄ν΄μ€λλ€.
μ΄λ maker μ»΄ν¬λνΈμ `useEffect()` μμμ μ½λ°±ν¨μννλ‘ λ¦¬ν΄μ ν΄μ£Όμ΄ μΈλ§μ΄νΈκ° λλ©΄ `off()` ν¨μκ° μ€νλ©λλ€.

```js
// card_database.js
import { firebaseDatabase } from './firebase';

class CardDatabase {
  //..μλ΅

  syncCard(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);

    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }
}

export default CardDatabase;

// maker.js
useEffect(() => {
  if (!userId) {
    return;
  }
  const stopSync = cardDatabase.syncCard(userId, (value) => {
    setCards(value);
  });

  return () => stopSync();
}, [userId, cardDatabase]);
```

<br>

## β Image uploader(Cloudinary) 
file μ μΈμλ‘ λ°μμ μλ²μ μλ‘λ ν ν΄λΉ μ΄λ―Έμ§ url μ λ¦¬ν΄ν΄μ€λλ€.

```js
class UploadImage {
  async upload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'docs_upload_example_us_preset');

    const result = await fetch(
      'https://api.cloudinary.com/v1_1/demo/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    return result.json();
  }
}

export default UploadImage;
```

<br>

## β Save image(dom-to-image, fileSaver) 
`toBlob()` ν¨μλ₯Ό ν΅ν΄ μ΄λ²€νΈκ° μΌμ΄λ  νκ²μ(card) μ ννκ³  `saveAs()` ν¨μλ‘ ν΄λΉ νκ²μ png νμΌλ‘ μ μ₯μμΌ μ€λλ€.

```js
import React, { memo, useRef } from 'react';
import styles from './card.module.css';
import domToImage from 'dom-to-image';
import { saveAs } from 'file-saver';

const Card = memo(({ card }) => {
  const cardRef = useRef();

  const onSaveFile = () => {
    const card = cardRef.current;
    // dom-to-image
    const filter = (card) => {
      return card.tagName !== 'BUTTON';
    };
    domToImage.toBlob(card, { filter: filter }).then((blob) => {
      // fileSaver
      saveAs(blob, `πΌ ${name} card.png`);
    });
  };

  return (
    <li className={styles.list}>
      <div ref={cardRef}>
        <article className={`${styles.card} ${getTheme(theme)}`}>
          <button className={styles.save} onClick={onSaveFile} title="save">
            <img src="./images/save.png" alt="save" />
          </button>
          //... μλ΅
        </article>
      </div>
    </li>
  );
});

export default Card;
```

<br>

## β Search
search componenet μ input valueλ₯Ό `setSearch()` μ μ μ₯νκ³ , search μ λ°μ΄ν°κ° λ€μ΄μ€λ©΄ card μ name κ³Ό λΉκ΅νμ¬ ν΄λΉνλ card λ₯Ό λ¦¬ν΄ν΄μ£Όκ³  λ°μ΄ν°κ° μμΌλ©΄ card μ μ²΄λ₯Ό λ¦¬ν΄ν©λλ€.

```js
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

```
