import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';

const Report2 = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/excel/data2');
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload for Excel 2
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/excel/excel/upload2', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      setSelectedFile(null);
      fetchData(); // Refresh the data after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <Sidebar/>
    <div className="mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800" style={{ marginLeft: '300px', marginTop: '10px' }}>Excel 2 Data Table</h1>

      {/* File Upload Section */}
      <div className="flex items-center mb-4" style={{ marginLeft: '300px' }}>
        <input type="file" onChange={handleFileChange} className="mr-2" />
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Upload Excel 2
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="border border-gray-200" style={{ marginLeft: '300px' }}>
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border">ID</th>
              <th className="px-4 py-2 text-left border">UID</th>
              <th className="px-4 py-2 text-left border">Deposit</th>
              <th className="px-4 py-2 text-left border">Withdraw</th>
              <th className="px-4 py-2 text-left border">Balance</th>
              <th className="px-4 py-2 text-left border">from - to</th>
              <th className="px-4 py-2 text-left border">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="bg-white border-b">
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.uid}</td>
                <td className="px-4 py-2 border">{item.deposit}</td>
                <td className="px-4 py-2 border">{item.withdraw}</td>
                <td className="px-4 py-2 border">{item.balance}</td>
                <td className="px-4 py-2 border">{item.from_to}</td>
                <td className="px-4 py-2 border">{item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="inline-flex -space-x-px text-sm" style={{ marginLeft: '500px' }}>
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 && 'cursor-not-allowed opacity-50'}`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter(number =>
              number === 1 ||
              number === totalPages ||
              (number >= currentPage - 2 && number <= currentPage + 2)
            )
            .map((number, index, array) => (
              <React.Fragment key={number}>
                {index > 0 && number !== array[index - 1] + 1 && (
                  <li>
                    <span className="flex items-center justify-center px-3 h-8 text-gray-500">...</span>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => paginate(number)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${number === currentPage
                      ? 'text-blue-600 border border-gray-300 bg-blue-50'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                      }`}
                  >
                    {number}
                  </button>
                </li>
              </React.Fragment>
            ))}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages && 'cursor-not-allowed opacity-50'}`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      <ToastContainer />
    </div>
    </>
  );
};

export default Report2;
