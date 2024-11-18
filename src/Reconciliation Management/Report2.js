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
  const [loading, setLoading] = useState(false);
  // Fetch data from API
  const fetchData = async () => {
    try {
      //api.cptechsolutions.com 
      const response = await axios.get('http://api.cptechsolutions.com/api/excel/data2');
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
      const response = await axios.post('http://api.cptechsolutions.com/api/excel/excel/upload2', formData, {
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


  // Handle file update for Excel 2 (PUT)
  const handleUpdate = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to update.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.put('http://api.cptechsolutions.com/api/excel/excel/upload2', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      setSelectedFile(null);
      fetchData();
    } catch (error) {
      console.error('Error updating file:', error);
      toast.error('Error updating file. Please try again.');
    } finally {
      setLoading(false);
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
      <div >
        <div className="flex">
          {/* Sidebar */}
          <Sidebar className="fixed" />

      {/* Main Content */}
      <div className="ml-60 p-6 min-h-screen w-full overflow-hidden">
    <div className="max-w-5xl mr-1 mx-auto p-4 bg-white rounded">
      <div className="p-4 bg-gray-50 rounded-lg ml-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Excel 2 Data Table</h2>
            <div className="flex items-center space-x-4">
            </div>
          </div>
          {/* File Upload Section */}
          <div className="flex items-center mb-4">
            <input type="file" onChange={handleFileChange} className="mr-2" />
            <button
              onClick={handleUpload}
              className="bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Excel 2'}
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 border border-green-700 hover:bg-white hover:text-green-700 text-white hover:border-green-700 text-white py-2 px-4 rounded ml-2"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Excel 2'}
            </button>
          </div>
        </div>
        {/* File Upload Section */}
        {/* <div className="flex items-center mb-4" style={{ marginLeft: '300px' }}>
        <input type="file" onChange={handleFileChange} className="mr-2" />
        <button
          onClick={handleUpload}
          className="bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"
          >
          Upload Excel 2
        </button>
      </div> */}

        <div className="overflow-x-auto ml-10 rounded-lg mt-5">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold border">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border">UID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border">Deposit</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border">Withdraw</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border">Balance</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border">from - to</th>
                <th className="px-4 py-3 text-left text-sm font-semibold border">Updated At</th>
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
          <ul className="inline-flex -space-x-px text-sm" style={{ marginLeft: '300px' }}>
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
    </div>
    </div>
    </div>
    </>
  );
};

export default Report2;
