import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const history = useHistory();
  // historyState 는 login 컴포넌트에서 넘어왔다면 user 정보가 있을 것이고, 다른 컴포넌트에서 넘어왔다면 값이 없을 것이다.
  const historyState = history.location.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [cards, setCards] = useState({
    1: {
      id: '1',
      name: '이창환',
      title: 'Frontend',
      company: 'ABC company',
      address: '서울시 **구 **대로 123',
      number: '010-1234-5678',
      email: 'changhwanlee94@gmail.com',
      theme: 'light',
      fileURL: '',
    },
    2: {
      id: '2',
      name: '이창환',
      title: 'Frontend',
      company: 'ABC company',
      address: '서울시 **구 **대로 123',
      number: '010-1234-5678',
      email: 'changhwanlee94@gmail.com',
      theme: 'dark',
      fileURL: '',
    },
    3: {
      id: '2',
      name: '이창환',
      title: 'Frontend',
      company: 'ABC company',
      address: '서울시 **구 **대로 123',
      number: '010-1234-5678',
      email: 'changhwanlee94@gmail.com',
      theme: 'dark',
      fileURL: '',
    },
  });

  // onLogout 함수에서 바로 로그인화면으로 넘겨주지않고
  // authService 와 history의 값이 업데이트될때마다 onAuthChang함수를 이용하여
  // user 데이터값의 유무를 확인후 user 데이터가 없다면 로그인화면으로 넘어가게 해주었다.
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [authService, history]);

  const onLogOut = () => {
    authService.logout();
  };

  return (
    <section className={styles.maker}>
      <div className={styles.header}>
        <Header onLogOut={onLogOut} />
      </div>
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </section>
  );
};

export default Maker;
