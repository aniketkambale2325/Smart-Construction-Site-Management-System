import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import Register from "../pages/auth/Register.jsx";
import EmployeeListPage from "../pages/employees/EmployeeListPage.jsx";
import EmployeeFormPage from "../pages/employees/EmployeeFormPage.jsx";
import AttendancePage from "../pages/attendance/AttendancePage.jsx";
import SalaryPage from "../pages/salary/SalaryPage.jsx";
import ProjectListPage from "../pages/projects/ProjectListPage.jsx";
import ProjectFormPage from "../pages/projects/ProjectFormPage.jsx";
import SiteListPage from "../pages/sites/SiteListPage.jsx";
import SiteFormPage from "../pages/sites/SiteFormPage.jsx";
import DailyReportFormPage from "../pages/sites/DailyReportFormPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import MaterialList from "../pages/materials/MaterialList.jsx";
import VendorList from "../pages/vendors/VendorList.jsx";
import ClientList from "../pages/clients/ClientList.jsx";
import ExpenseList from "../pages/expenses/ExpensesList.jsx";
import ReportGenerator from "../pages/reports/ReportGenerator.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<EmployeeListPage />} />
        <Route path="employees/new" element={<EmployeeFormPage />} />
        <Route path="attendance/:employeeId" element={<AttendancePage />} />
        <Route path="salary/:employeeId" element={<SalaryPage />} />
        <Route path="projects" element={<ProjectListPage />} />
        <Route path="projects/new" element={<ProjectFormPage />} />
        <Route path="projects/:projectId/sites" element={<SiteListPage />} />
        <Route path="projects/:projectId/sites/new" element={<SiteFormPage />} />
        <Route path="sites/:siteId/daily-reports" element={<DailyReportFormPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="materials" element={<MaterialList />} />
        <Route path="vendors" element={<VendorList />} />
        <Route path="clients" element={<ClientList />} />
        <Route path="projects/:projectId/expenses" element={<ExpenseList />} />
        <Route path="sites/:siteId/reports" element={<ReportGenerator />} />
      </Route>
    </Routes>
  );
}
