// src/routes/AppraisalRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppraisalList from '../pages/appraisal/AppraisalList';
import AppraisalForm from '../pages/appraisal/AppraisalForm';
import AppraisalView from '../pages/appraisal/AppraisalView';

const AppraisalRoutes = () => {
    return (
        <Routes>
            <Route index element={<AppraisalList />} />
            <Route path="add" element={<AppraisalForm />} />
            <Route path="edit/:id" element={<AppraisalForm />} />
            <Route path="view/:id" element={<AppraisalView />} />
        </Routes>
    );
};

export default AppraisalRoutes;