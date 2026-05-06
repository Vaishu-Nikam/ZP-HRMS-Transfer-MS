import { Routes, Route } from "react-router-dom";

import EmployeeList from "../pages/employee/EmployeeList";
import EmployeeAdd from "../pages/employee/EmployeeAdd";
import EmployeeView from "../pages/employee/EmployeeView";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route index element={<EmployeeList />} />
      <Route path="add" element={<EmployeeAdd />} />
       <Route path="edit/:id" element={<EmployeeAdd />} />
      <Route path="view/:id" element={<EmployeeView />} />  {/* 🔥 MUST */}
    </Routes>
  );
};

export default EmployeeRoutes;