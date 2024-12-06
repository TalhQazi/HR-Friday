import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Login from "./components/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Payroll from "./components/Payroll";
import Employees from "./components/Employees";
import ApplyForLeave from "./components/ApplyForLeave";
import Attendance from "./components/Attendance";
import PayRoll from "./components/PayRoll/index";
import Traning from "./components/Traning";
import PaySlipContainer from "./components/PaySlipContainer";
import Performance from "./components/performance";
function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/payroll"
              element={
                <ProtectedRoutes>
                  <PayRoll />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/performance"
              element={
                <ProtectedRoutes>
                  <Performance />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoutes>
                  <Employees />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/apply-for-leave"
              element={
                <ProtectedRoutes>
                  <ApplyForLeave />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoutes>
                  <Attendance />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/trainings"
              element={
                <ProtectedRoutes>
                  <Traning />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/payslip/:company_id/:payroll_id"
              element={
                <ProtectedRoutes>
                  <PaySlipContainer />
                </ProtectedRoutes>
              }
            />
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
