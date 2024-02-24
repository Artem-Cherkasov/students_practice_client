import React, { useState } from 'react';
import './App.scss';
import { Route, Routes, Navigate } from "react-router-dom";
import Events from "./pages/Events/Events";
import Header from "./components/Header";
import DocumentList from "./pages/Documents/DocumentList";
import StudentList from "./pages/StudentList/StudentList";
import CompanyList from "./pages/CompanyList/CompanyList";
import DepartmentList from "./pages/DepartmentList/DepartmentList"
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import EmployeeList from './pages/EmployeesList/EmployeesList';
import NotFound from './pages/NotFound/NotFound';
import StudentProfile from './pages/Student/StudentProfile';
import StudentTemplates from './pages/Student/StudentTemplates';
import StudentDocuments from './pages/Student/StudentDocuments';
import StudentCompanyList from './pages/Student/StudentCompanyList';
import EditStudentProfile from './pages/Student/EditStudentProfile';
import EmployeeProfile from './pages/Employee/EmployeeProfile';
import EditEmployeeProfile from './pages/Employee/EditEmployeeProfile';
import CompanyProfile from './pages/Company/CompanyProfile';
import EditCompanyProfile from './pages/Company/EditCompanyProfile';
import CompanyStudentList from './pages/Company/CompanyStudentList/CompanyStudentList';
import CompanyEventList from './pages/Company/CompanyEventList/CompanyEventList';
import Offers from './pages/Student/Offers';
import AdminProfile from './pages/Admin/AdminProfile';

const App = () => {
    function RequireAuth({ children, redirectTo, path }) {
        let isAuthenticated = localStorage.getItem("role");
        let role = localStorage.getItem("role")
        if (isAuthenticated) {
            if (role === path) {
                return children
            }
            else {
                return <Navigate to={redirectTo} />
            }
        }
        else {
            return <Navigate to={redirectTo} />
        }
        // return isAuthenticated ? children : <Navigate to={redirectTo} />;
    }

    return (
        <div>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/' element={<><title>IT-training приложение для работы с учебной практикой</title><Header /> <Home /></>} />
                    <Route path='/auth'>
                        <Route path="auth_form" element={<><title>Авторизация</title><Header /> <Auth /></>} />
                    </Route>
                    <Route path='/employee'>
                        <Route
                            path="profile"
                            element={
                                <RequireAuth redirectTo="/notfound" path="employee">
                                    <><title>Профиль сотрудника</title><Header /> <EmployeeProfile /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="events"
                            element={
                                <RequireAuth redirectTo="/notfound" path="employee">
                                    <><title>Список мероприятий</title><Header /> <Events /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="students"
                            element={
                                <RequireAuth redirectTo="/notfound" path="employee">
                                    <><title>Список студентов</title><Header /> <StudentList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="companies"
                            element={
                                <RequireAuth redirectTo="/notfound" path="employee">
                                    <><title>Список компаний</title><Header /> <CompanyList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="documents"
                            element={
                                <RequireAuth redirectTo="/notfound" path="employee">
                                    <><title>Список документов</title><Header /> <DocumentList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="edit_profile"
                            element={
                                <RequireAuth redirectTo="/notfound" path="employee">
                                    <><title>Редактирование профиля</title><Header /> <EditEmployeeProfile /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="main"
                            element={
                                <RequireAuth redirectTo="/notfound" path="employee">
                                    <><title>Главная</title><Header /> <Home /></>
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route path='/student'>
                        <Route
                            path="profile"
                            element={
                                <RequireAuth redirectTo="/notfound" path="student">
                                    <><title>Профиль студента</title><Header /> <StudentProfile /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="templates"
                            element={
                                <RequireAuth redirectTo="/notfound" path="student">
                                    <><title>Список шаблонов</title><Header /> <StudentTemplates /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="documents"
                            element={
                                <RequireAuth redirectTo="/notfound" path="student">
                                    <><title>Список документов</title><Header /> <StudentDocuments /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="companies"
                            element={
                                <RequireAuth redirectTo="/notfound" path="student">
                                    <><title>Список компаний</title><Header /> <StudentCompanyList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="edit_profile"
                            element={
                                <RequireAuth redirectTo="/notfound" path="student">
                                    <><title>Редактирование профиля</title><Header /> <EditStudentProfile /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="offers"
                            element={
                                <RequireAuth redirectTo="/notfound" path="student">
                                    <><title>Список предложений</title><Header /> <Offers /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="main"
                            element={
                                <RequireAuth redirectTo="/notfound" path="student">
                                    <><title>Главная</title><Header /> <Home /></>
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route path='/company'>
                        <Route
                            path="profile"
                            element={
                                <RequireAuth redirectTo="/notfound" path="company">
                                    <><title>Профиль компании</title><Header /> <CompanyProfile /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="edit_profile"
                            element={
                                <RequireAuth redirectTo="/notfound" path="company">
                                    <><title>Редактирование профиля</title><Header /> <EditCompanyProfile /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="events"
                            element={
                                <RequireAuth redirectTo="/notfound" path="company">
                                    <><title>Список мероприятий</title><Header /> <CompanyEventList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="students"
                            element={
                                <RequireAuth redirectTo="/notfound" path="company">
                                    <><title>Список студентов</title><Header /> <CompanyStudentList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="main"
                            element={
                                <RequireAuth redirectTo="/notfound" path="company">
                                    <><title>Главная</title><Header /> <Home /></>
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route path='/admin'>
                        <Route
                            path="profile"
                            element={
                                <RequireAuth redirectTo="/notfound" path="admin">
                                    <><title>Профиль администратора</title><Header /> <AdminProfile /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="departments"
                            element={
                                <RequireAuth redirectTo="/notfound" path="admin">
                                    <><title>Список кафедр</title><Header /> <DepartmentList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="employees"
                            element={
                                <RequireAuth redirectTo="/notfound" path="admin">
                                    <><title>Список сотрудников</title><Header /> <EmployeeList /></>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="main"
                            element={
                                <RequireAuth redirectTo="/notfound" path="admin">
                                    <><title>Главная</title><Header /> <Home /></>
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route path='/notfound' element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;