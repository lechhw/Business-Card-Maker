import React, { useRef, useState } from 'react';
import styles from './image_input.module.css';

const ImageInput = ({ uploadImage, onFileChange, name }) => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (e) => {
    setLoading(true);
    const uploaded = await uploadImage.upload(e.target.files[0]);
    setLoading(false);

    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />

      {!loading && (
        <button
          className={`${styles.button} ${name && styles.upload}`}
          onClick={onButtonClick}
        >
          {name || 'No file'}
        </button>
      )}

      {loading && <div className={styles.loading}></div>}
    </div>
  );
};

export default ImageInput;
