import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import UploadImage from './service/upload_image';
import ImageInput from './components/image_input/image_input';
import CardDatabase from './service/card_database';

const root = ReactDOM.createRoot(document.getElementById('root'));
const authService = new AuthService();
const uploadImage = new UploadImage();
const cardDatabase = new CardDatabase();

// 컴포넌트 props 는 보통 대문자로 시작
const FileInput = memo((props) => (
  <ImageInput {...props} uploadImage={uploadImage} />
));
// 말단에 있는 ImageInput 컴포넌트에 prop 을 전달할때에는 이런식으로 작성해서 전달해주면, 나중에 추가할 prop 이 생겼을때 여기에서만(index.js) 수정해주면 props 에  담겨져서 전달된다.(확장가능한 컴포넌트)
//const FileInput=<ImageFileInput imageUpLoader={imageUploader} />  ->이렇게 작성하면 다른 prop을 전달할 수 없음

root.render(
  <App
    FileInput={FileInput}
    authService={authService}
    cardDatabase={cardDatabase}
  />
);
