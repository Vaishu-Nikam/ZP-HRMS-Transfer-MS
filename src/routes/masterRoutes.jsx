import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DistrictList from '../pages/masters/districts/DistrictList';
import DistrictForm from '../pages/masters/districts/DistrictForm';
import DepartmentList from '../pages/masters/departments/DepartmentList';
import DepartmentForm from '../pages/masters/departments/DepartmentForm';

import CasteList from '../pages/masters/caste/casteList';
import CasteForm from '../pages/masters/caste/CasteForm';

import CadreForm from '../pages/masters/cadre/CadreForm';
import CadreList from '../pages/masters/cadre/CadreList';

import DesignationForm from '../pages/masters/designations/designationsForm';
import DesignationList from '../pages/masters/designations/designationsList';

import OfficeForm from '../pages/masters/office/officeform';
import OfficeList from '../pages/masters/office/officeList';
const MasterRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="districts" replace />} />
            {/* Districts */}
            <Route path="districts" element={<DistrictList />} />
            <Route path="districts/add" element={<DistrictForm />} />
            <Route path="districts/edit/:id" element={<DistrictForm />} />
            <Route path="districts/view/:id" element={<DistrictForm isViewMode />} />

            {/* Departments */}
            <Route path="departments" element={<DepartmentList />} />
            <Route path="departments/add" element={<DepartmentForm />} />
            <Route path="departments/edit/:id" element={<DepartmentForm />} />
            <Route path="departments/view/:id" element={<DepartmentForm isViewMode />} />

            {/* ✅ Castes */}
            <Route path="caste" element={<CasteList />} />
            <Route path="caste/add" element={<CasteForm />} />
            <Route path="caste/edit/:id" element={<CasteForm />} />
            <Route path="caste/view/:id" element={<CasteForm isViewMode />} />



            {/* Cadres */}
            <Route path="cadre" element={<CadreList />} />
            <Route path="cadre/add" element={<CadreForm />} />
            <Route path="cadre/edit/:id" element={<CadreForm />} />
            <Route path="cadre/view/:id" element={<CadreForm isViewMode />} />


            {/* Designations */}
            <Route path="designation" element={<DesignationList />} />
            <Route path="designation/add" element={<DesignationForm />} />
            <Route path="designation/edit/:id" element={<DesignationForm />} />
            <Route path="designation/view/:id" element={<DesignationForm isViewMode />} />


            {/* Offices */}
            <Route path="office" element={<OfficeList />} />
            <Route path="office/add" element={<OfficeForm />} />
            <Route path="office/edit/:id" element={<OfficeForm />} />
            <Route path="office/view/:id" element={<OfficeForm isViewMode />} />

        </Routes>
    );
};

export default MasterRoutes;
