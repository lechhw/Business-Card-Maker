# 💼 Business Card Maker

# Intro

React 를 이용하여 작업한 명함 제작 웹 어플리케이션입니다.<br>
Firebase 의 Authentication 서비스를 이용하여 소셜로그인 기능을 구현하였고,<br>
이 과정에서 얻어온 user uid 값으로 Realtime database 에 명함을 실시간으로 CRUD 할 수 있게끔 구현 하였습니다.<br>
그리고 Cloudinary 를 이용하여 사용자가 이미지를 서버에 업로드 할 수 있게 하여 언제 어디서든 해당 이미지를 불러올 수 있습니다.<br>
또한 외부라이브러리(dom-to-image, fileSaver) 를 사용하여 작성한 카드를 png 파일로 저장할 수 있는 기능을 구현하였습니다.

---

## Live Demo : [Business Card Maker](https://lechhw-business-card-maker.netlify.app)

작업기간 (2022.06.09 ~ 2022.06.13)

<br>

# Skills

- [x] React
  - React Functional Component
- [x] React Router
- [x] PostCSS
- [x] Firebase
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

## 반응형 UI

<img  src="https://user-images.githubusercontent.com/99241230/173328278-be6daea5-5a5e-42d1-829a-e0db13f635f0.gif">

<br>

# Solution

-Firebase 의 모든 서비스를 import 하지 않고, 프로젝트내에서 필요한 서비스만 따로 정의 후에 export 하여 사용하였습니다.

```js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDatabase = firebaseApp.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const gitHubProvider = new firebase.auth.GithubAuthProvider();
```

<br>

- Database: syncCard 함수는 데이터베이스의 해당 ref(경로) 에 리스너를 등록하여 변경사항이 있다면 등록된 콜백 함수를 호출합니다. 그리고 추후에 리스너를 제거해주는 off() 함수를 리턴해줍니다. <br>
  이는 maker 컴포넌트의 useEffect()안에서 콜백함수형태로 리턴을 해주어 언마운트가 되면 off() 함수가 실행됩니다.

```js
// card_database.js
import { firebaseDatabase } from './firebase';

class CardDatabase {
  //..생략

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

- Image uploader: file 을 인자로 받아와 서버에 업로드 후 해당 이미지 url 을 리턴해줍니다.

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

- Save image(dom-to-image, fileSaver): toBlob 함수를 통해 이벤트가 일어날 타겟을(card) 선택하고
  saveAs 함수로 해당 타겟을 png 파일로 저장시켜 줍니다.

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
      saveAs(blob, `💼 ${name} card.png`);
    });
  };

  return (
    <li className={styles.list}>
      <div ref={cardRef}>
        <article className={`${styles.card} ${getTheme(theme)}`}>
          <button className={styles.save} onClick={onSaveFile} title="save">
            <img src="./images/save.png" alt="save" />
          </button>
          //... 생략
        </article>
      </div>
    </li>
  );
});

export default Card;
```
