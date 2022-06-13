import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardDatabase }) => {
  const history = useHistory();
  const historyState = history.location.state;
  // historyState 는 login 컴포넌트에서 넘어왔다면 user 정보가 있을 것이고, 다른 컴포넌트에서 넘어왔다면 값이 없을 것이다.
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [cards, setCards] = useState({});

  // cardDatabase
  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardDatabase.syncCard(userId, (value) => {
      setCards(value);
    });

    return () => stopSync();
    // 콜백함수 형태로 useEffect 에서 리턴해주면, 리액트가 자동으로 언마운트시에 호출해준다.
  }, [userId, cardDatabase]);

  // authService
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [authService, history]);
  // onLogout 함수에서 바로 로그인화면으로 넘겨주지않고
  // authService 와 history의 값이 업데이트될때마다 onAuthChang함수를 이용하여
  // user 데이터값의 유무를 확인후 user 데이터가 없다면 로그인화면으로 넘어가게 해주었다.

  const addOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardDatabase.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardDatabase.removeCard(userId, card);
  };

  const onLogOut = () => {
    authService.logout();
  };

  return (
    <section className={styles.maker}>
      <div className={styles.header}>
        <Header onLogOut={onLogOut} />
      </div>
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          updateCard={addOrUpdateCard}
          addCard={addOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </section>
  );
};

export default Maker;
