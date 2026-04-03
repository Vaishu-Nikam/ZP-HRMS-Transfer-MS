import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ExcelUpload from '../pages/excel-import/ExcelUpload';
import ExcelValidation from '../pages/excel-import/ExcelValidation';
import ExcelPreview from '../pages/excel-import/ExcelPreview';
// import excel-imp

const ExcelImportRoutes = () => {
  return (
    <Routes>
      <Route index element={<ExcelUpload />} />
      <Route path="validation" element={<ExcelValidation />} />
      <Route path="preview" element={<ExcelPreview />} />
    </Routes>
  );
};

export default ExcelImportRoutes;