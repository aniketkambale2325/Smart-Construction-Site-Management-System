import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginPage from "../pages/login/LoginPage.jsx";
import EmployeeListPage from "../pages/employee/EmployeeListPage.jsx";
import EmployeeFormPage from "../pages/employee/EmployeeFormPage.jsx";
import AttendancePage from "../pages/attendance/AttendancePage.jsx";
import SalaryPage from "../pages/salary/SalaryPage.jsx";
import ProjectListPage from "../pages/project/ProjectListPage.jsx";
import ProjectFormPage from "../pages/project/ProjectFormPage.jsx";
import SiteListPage from "../pages/site/SiteListPage.jsx";
import SiteFormPage from "../pages/site/SiteFormPage.jsx";
import DailyReportFormPage from "../pages/daily-report/DailyReportFormPage.jsx";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/employees" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR', 'SITE_ENGINEER']}>
                    <EmployeeListPage/>
                </ProtectedRoute>
            } />

            <Route path="/employees/new" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR']}>
                    <EmployeeFormPage/>
                </ProtectedRoute>
            } />

            <Route path="/attendance" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR', 'SITE_ENGINEER','SUPERVISOR']}>
                    <AttendancePage/>
                </ProtectedRoute>
            } />

            <Route path="/salary" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR', 'SITE_ENGINEER']}>
                    <SalaryPage/>
                </ProtectedRoute>
            } />

            <Route path="/projects" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR', 'CLIENT']}>
                    <ProjectListPage/>
                </ProtectedRoute>
            } />

            <Route path="/projects/new" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR']}>
                    <ProjectFormPage/>
                </ProtectedRoute>
            } />

            <Route path="/sites" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR', 'SITE_ENGINEER']}>
                    <SiteListPage/>
                </ProtectedRoute>
            } />

            <Route path="/sites/new" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CONTRACTOR']}>
                    <SiteFormPage/>
                </ProtectedRoute>
            } />

            <Route path="/sites/:siteId/daily-report" element={
                <ProtectedRoute allowedRoles={['SITE_ENGINEER','SUPERVISOR','ADMIN','CONTRACTOR']}>
                    <DailyReportFormPage/>
                </ProtectedRoute>
            } />

        </Routes>
    );
}