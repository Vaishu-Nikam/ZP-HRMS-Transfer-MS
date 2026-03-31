// src/routes/EmployeeRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from '../pages/employees/EmployeeList';
import EmployeeAdd  from '../pages/employees/EmployeeAdd';

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route index element={<EmployeeList />} />
            <Route path="add"      element={<EmployeeAdd />} />
            <Route path="edit/:id" element={<EmployeeAdd />} />
            <Route path="view/:id" element={<EmployeeAdd isViewMode />} />
        </Routes>
    );
};

export default EmployeeRoutes;