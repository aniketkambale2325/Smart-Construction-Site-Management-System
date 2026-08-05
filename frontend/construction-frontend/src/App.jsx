import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

import Login from "./pages/auth/Login";
import EmployeeList from "./pages/employees/EmployeeList";
import EmployeeForm from "./pages/employees/EmployeeForm";
import AttendanceScreen from "./pages/attendance/AttendanceScreen";
import SalaryScreen from "./pages/salary/SalaryScreen";
import ProjectList from "./pages/projects/ProjectList";
import ProjectForm from "./pages/projects/ProjectForm";
import SiteList from "./pages/sites/SiteList";
import SiteForm from "./pages/sites/SiteForm";
import DailyReportForm from "./pages/sites/DailyReportForm";

import MaterialList from "./pages/materials/MaterialList";
import VendorList from "./pages/vendors/VendorList";
import ExpenseList from "./pages/expenses/ExpenseList";
import ClientList from "./pages/clients/ClientList";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportGenerator from "./pages/reports/ReportGenerator";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProjectList />} />

            <Route path="employees" element={<EmployeeList />} />
            <Route path="employees/new" element={<EmployeeForm />} />
            <Route path="attendance/:employeeId" element={<AttendanceScreen />} />
            <Route path="salary/:employeeId" element={<SalaryScreen />} />

            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:projectId/sites" element={<SiteList />} />
            <Route path="projects/:projectId/sites/new" element={<SiteForm />} />
            <Route path="sites/:siteId/daily-reports" element={<DailyReportForm />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="materials" element={<MaterialList />} />
            <Route path="vendors" element={<VendorList />} />
            <Route path="clients" element={<ClientList />} />
            <Route path="projects/:projectId/expenses" element={<ExpenseList />} />
            <Route path="sites/:siteId/reports" element={<ReportGenerator />} />



          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}