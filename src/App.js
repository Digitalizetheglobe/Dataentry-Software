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
import WithdrwalBankReport from './Transaction Data Entry/WithdrwalBankReport';
import MergeReport from './Reconciliation Management/MergeReport';
import WithdrawalReconcilitionReport from './Withdrawal reconcilition/WithdrawalReconcilitionReport';
import Depositreconcilition from './Deposit reconcilition/Depositreconcilition';
import Dashboard from './Dashboard/dashboard';
import PrivateRoute from './PrivateRoute';
import YearlyFinancialActivity from './Dashboard/YearlyFinancialActivity.js';
import BankWiseDeposit from './Dashboard/BankWiseDeposit.js';


function App() {
  return (
    <Router>
      <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
        <div className="content-area" style={{ flex: 1, padding: '20px', backgroundColor: 'white', overflowY: 'auto' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/reconciliation-management"
              element={
                <PrivateRoute>
                  <Reconciliationmanagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/report-1"
              element={
                <PrivateRoute>
                  <Report1 />
                </PrivateRoute>
              }
            />
            <Route
              path="/report-2"
              element={
                <PrivateRoute>
                  <Report2 />
                </PrivateRoute>
              }
            />
            <Route
              path="/transaction-data-entry"
              element={
                <PrivateRoute>
                  <Transactiondataentry />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdrawal"
              element={
                <PrivateRoute>
                  <Withdrawal />
                </PrivateRoute>
              }
            />
            <Route
              path="/deposit"
              element={
                <PrivateRoute>
                  <Deposit />
                </PrivateRoute>
              }
            />
            <Route
              path="/report-management"
              element={
                <PrivateRoute>
                  <Reportmanagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/inter-bank-transfer-management"
              element={
                <PrivateRoute>
                  <Interbanktransfermanagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-registration"
              element={
                <PrivateRoute>
                  <Userregistration />
                </PrivateRoute>
              }
            />
            <Route
              path="/knowledge-center"
              element={
                <PrivateRoute>
                  <Knowledgecenter />
                </PrivateRoute>
              }
            />
            <Route
              path="/excel"
              element={
                <PrivateRoute>
                  <ExcelUpload />
                </PrivateRoute>
              }
            />
            <Route
              path="/deposit-bank-report"
              element={
                <PrivateRoute>
                  <Depositbankreport />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdrawal-bank-report"
              element={
                <PrivateRoute>
                  <WithdrwalBankReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/MergeReport"
              element={
                <PrivateRoute>
                  <MergeReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/WithdrawalReconcilitionReport"
              element={
                <PrivateRoute>
                  <WithdrawalReconcilitionReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/Depositreconcilition"
              element={
                <PrivateRoute>
                  <Depositreconcilition />
                </PrivateRoute>
              }
            />
             < Route 
            path='/YearlyFinancialActivity'
            element={
              <PrivateRoute>
                <YearlyFinancialActivity/>
              </PrivateRoute>
            }
            />
             < Route 
            path='/BankWiseDeposit'
            element={
              <PrivateRoute>
                <BankWiseDeposit/>
              </PrivateRoute>
            }
            />
            
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './Sidebar/Sidebar';
// import './App.css';
// import SignIn from './SignIn/SignIn';
// import SignUp from './SignUp/SignUp';
// import Reconciliationmanagement from './Reconciliation Management/Reconciliationmanagement';
// import Report1 from './Reconciliation Management/Report1';
// import Report2 from './Reconciliation Management/Report2';
// import Transactiondataentry from './Transaction Data Entry/Transactiondataentry';
// import Withdrawal from './Transaction Data Entry/Withdrawal';
// import Deposit from './Transaction Data Entry/Deposit';
// import Reportmanagement from './Report Management/Reportmanagement';
// import Interbanktransfermanagement from './Inter Bank Transfer Management/Interbanktransfermanagement';
// import Userregistration from './User Registration/Userregistration';
// import Knowledgecenter from './Knowledge Center/Knowledgecenter';
// import Depositbankreport from './Transaction Data Entry/Depositbankreport';
// import ExcelUpload from './ExcelUpload';
// import  WithdrwalBankReport from './Transaction Data Entry/WithdrwalBankReport';
// import MergeReport from './Reconciliation Management/MergeReport';
// import WithdrawalReconcilitionReport from './Withdrawal reconcilition/WithdrawalReconcilitionReport';
// import Depositreconcilition from './Deposit reconcilition/Depositreconcilition';
// import Dashboard from './Dashboard/dashboard';


// function App() {
//   return (
//     <Router>
//       <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
       
//         {/* <Sidebar /> */}
//         <div className="content-area" style={{ flex: 1, padding: '20px', backgroundColor: 'white', overflowY: 'auto' }}>
         
//           <Routes>
//           <Route path='/' element={< Dashboard />} />
//             <Route path='/sign-in' element={<SignIn />} />
//             <Route path='/sign-up' element={<SignUp />} />
//             <Route path='/' element={< Dashboard />} />
//             <Route path='/reconciliation-management' element={<Reconciliationmanagement />} />
//             <Route path='/report-1' element={<Report1 />} />
//             <Route path='/report-2' element={<Report2 />} />
//             <Route path='/transaction-data-entry' element={<Transactiondataentry />} />
//             <Route path='/withdrawal' element={<Withdrawal />} />
//             <Route path='/deposit' element={<Deposit />} />
//             <Route path='/report-management' element={<Reportmanagement />} />
//             <Route path='/inter-bank-transfer-management' element={<Interbanktransfermanagement />} />
//             <Route path='/user-registration' element={<Userregistration />} />
//             <Route path='/knowledge-center' element={<Knowledgecenter />} />
//           <Route path='/excel' element={<ExcelUpload/>} />
//             <Route path='/deposit-bank-report' element={<Depositbankreport/>}/>
//             <Route path='/withdrawal-bank-report' element={<WithdrwalBankReport/>} />
//             <Route path='/MergeReport' element={<MergeReport/>} />
//             <Route path='/WithdrawalReconcilitionReport' element={<WithdrawalReconcilitionReport/>} />
//             <Route path='/Depositreconcilition' element={<Depositreconcilition/>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

