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
