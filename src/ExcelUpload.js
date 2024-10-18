import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please upload an Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/deposit-withdraw/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error uploading file. Please try again.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Upload Excel File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} accept=".xlsx,.xls" className="mb-4" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload</button>
      </form>
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  );
};

export default ExcelUpload;
