import api from "./api";

// 📥 DOWNLOAD TEMPLATE
export const downloadEmployeeTemplate = async () => {
  try {
    const response = await api.get("/employee/template", {
      responseType: "blob",
    });

    return response.data;
  } catch (error) {
    console.error("Download Template Error:", error);
    throw error;
  }
};

// 📤 UPLOAD EXCEL
export const uploadEmployeeExcel = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/employee/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload Excel Error:", error);
    throw error;
  }
const getData = (response) => response.data.data || response.data;

/* ================= PERSONAL INFO ================= */

//  GET EMPLOYEES
export const getEmployees = async (params) => {
  const response = await api.get("/system/get_employees", { params });
  return response.data.data || response.data;
};

//  REGISTER
export const registerEmployee = async (data) => {
  const response = await api.post("/auth/register_employee", data);
  return response.data.data || response.data;
};

/* =================Personal STEP 1 ================= */

export const saveStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/personal_info/1", 
    data
  );
  return getData(response);
};

/* ================= Personal STEP 2 ================= */
 
export const saveStep2 = async (data) => {
  const response = await api.post(
    "/employee/profile/personal_info/2",
    data
  );
  return getData(response);
};

/* ================= Personal STEP 3 ================= */
 
export const saveStep3 = async (data) => {
  const response = await api.post(
    "/employee/profile/personal_info/3",
    data
  );
  return getData(response);
};

/* ================= Personal STEP 4 ================= */
 
export const saveStep4 = async (data) => {
  const response = await api.post(
    "/employee/profile/personal_info/4",
    data
  );
  return getData(response);
};

// Step 5 sends multipart/form-data (files + text fields)
// Pass a FormData object — axios sets Content-Type: multipart/form-data automatically
export const saveStep5 = async (formData) => {
  const response = await api.post(
    "/employee/profile/personal_info/5",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return getData(response);
};