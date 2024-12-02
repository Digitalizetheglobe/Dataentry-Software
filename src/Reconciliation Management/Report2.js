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
      toast.error(
        error.response?.data?.message || 'Error updating file. Please try again.'
      );
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
          <div className="ml-80 p-6 min-h-screen w-full overflow-y-auto">
          <div className="">
            <div className="h-full flex flex-col max-h-screen">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mt-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-700">Excel 2 Data Table</h2>
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
                    className={`bg-green-600 border border-green-700 text-white py-2 px-4 rounded ml-2 ${loading
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-white hover:text-green-700 hover:border-green-700'
                      }`}
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
              <div className="flex-grow bg-white rounded-lg mt-4 p-4 px-0">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="border p-2 text-left">ID</th>
                      <th className="border p-2 text-left">UID</th>
                      <th className="border p-2 text-left">Deposit</th>
                      <th className="border p-2 text-left">Withdraw</th>
                      <th className="border p-2 text-left">Balance</th>
                      <th className="border p-2 text-left">from - to</th>
                      <th className="border p-2 text-left">Updated At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.id} className="text-left">
                        <td className="p-2 border">{item.id}</td>
                        <td className="p-2 border">{item.uid}</td>
                        <td className="p-2 border">{item.deposit}</td>
                        <td className="p-2 border">{item.withdraw}</td>
                        <td className="p-2 border">{item.balance}</td>
                        <td className="p-2 border">{item.from_to}</td>
                        <td className="p-2 border">{item.updatedAt}</td>
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
      </div>
    </>
  );
};

export default Report2;
