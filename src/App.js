import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import './App.css';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Reconciliationmanagement from './Reconciliation Management/Reconciliationmanagement';
import Report1 from './Reconciliation Management/Report1';
import Report2 from './Reconciliation Management/Report2';
import Transactiondataentry from './Transaction Data Entry/Transactiondataentry';
import Withdrawal from './Transaction Data Entry/Withdrawal';
import Deposit from './Transaction Data Entry/Deposit';
import Reportmanagement from './Report Management/Reportmanagement';
import Interbanktransfermanagement from './Inter Bank Transfer Management/Interbanktransfermanagement';
import Userregistration from './User Registration/Userregistration';
import Knowledgecenter from './Knowledge Center/Knowledgecenter';
import Depositbankreport from './Transaction Data Entry/Depositbankreport';
import ExcelUpload from './ExcelUpload';

function App() {
  return (
    <Router>
      <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Sidebar />
        
        {/* Content Area */}
        <div className="content-area" style={{ flex: 1, padding: '20px', backgroundColor: 'white', overflowY: 'auto' }}>
          {/* Routes for different components */}
          <Routes>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/reconciliation-management' element={<Reconciliationmanagement />} />
            <Route path='/report-1' element={<Report1 />} />
            <Route path='/report-2' element={<Report2 />} />
            <Route path='/transaction-data-entry' element={<Transactiondataentry />} />
            <Route path='/withdrawal' element={<Withdrawal />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/report-management' element={<Reportmanagement />} />
            <Route path='/inter-bank-transfer-management' element={<Interbanktransfermanagement />} />
            <Route path='/user-registration' element={<Userregistration />} />
            <Route path='/knowledge-center' element={<Knowledgecenter />} />
          <Route path='/excel' element={<ExcelUpload/>} />
            <Route path='/deposit-bank-report' element={<Depositbankreport/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
