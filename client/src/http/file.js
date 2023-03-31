import React from 'react';

export const FileUploadForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('files', event.target.elements.fileInput.files[0]);
    fetch("http://localhost:5000/api/file", {
      method: 'POST',
      headers: {
        // add any required authorization headers or tokens here
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // handle successful response here
      })
      .catch(error => {
        // handle error here
      });
  };

  return (
    <form onSubmit={submitHandler} method="post" enctype="multipart/form-data" action="http://localhost:5000/api/file">
      <input type="file" name="fileInput"></input>
      <button type="submit">Upload</button>
    </form>
  );
}