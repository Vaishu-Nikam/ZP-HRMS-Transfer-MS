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
};