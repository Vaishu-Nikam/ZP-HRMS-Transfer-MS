// src/routes/RosterRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RosterPage from '../pages/roster/RosterPage';

const RosterRoutes = () => {
    return (
        <Routes>
            <Route index element={<RosterPage />} />
        </Routes>
    );
};

export default RosterRoutes;