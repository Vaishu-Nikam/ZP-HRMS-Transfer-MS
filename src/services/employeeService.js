import api from "./api";
const getData = (response) => response.data.data || response.data;

export const registerEmployee = async (data) => {
  const response = await api.post("/auth/register_employee", data);
  return response.data.data || response.data;
};

export const getEmployees = async (params) => {
  const response = await api.get("/system/get_employees", { params });
  return response.data.data || response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/system/get_employees/${id}`);
  return response.data.data || response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/system/delete_employee/${id}`);
  return response.data;
};

export const downloadEmployeeTemplate = async () => {
  const response = await api.get("/employee/template", { responseType: "blob" });
  return response.data;
};

export const uploadEmployeeExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/employee/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getEmployeeCurrentStep = async (aadhar_number) => {
  const response = await api.post("/employee/continue", { aadhar_number });
  return getData(response);
};

/* ================= PERSONAL INFO STEPS ================= */

export const saveStep1 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/1", data);
  return getData(response);
};

export const saveStep2 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/2", data);
  return getData(response);
};

export const saveStep3 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/3", data);
  return getData(response);
};

export const saveStep4 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/4", data);
  return getData(response);
};

export const saveStep5 = async (formData) => {
  const response = await api.post(
    "/employee/profile/personal_info/5",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return getData(response);
};


export const getMaritalStatuses = async () => {
  const response = await api.get("/masters/marital_status");
  return getData(response);
};

export const getSalutations = async () => {
  const response = await api.get("/masters/salutations");
  return getData(response);
};


export const saveStep6 = async (data) => {
  const response = await api.post(
    "/employee/profile/personal_info/6",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data", // 🔥 override
      },
    }
  );
  return getData(response);
};
// ✅ Step 7 — permanent + current address in ONE call
export const saveStep7 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/7", data);
  return getData(response);
};

export const saveStep8 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/8", data);
  return getData(response);
};

export const saveStep9 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/9", data);
  return getData(response);
};

export const saveStep10 = async (data) => {
  const response = await api.post("/employee/profile/personal_info/10", data);
  return getData(response);
};


export const saveEducationStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/education/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return getData(response); 
};

// STEP 2
export const saveEducationStep2 = async (data) => {
  const response = await api.post(
    "/employee/profile/education/2",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return getData(response);
};

export const saveEducationStep3 = async (data) => {
  const response = await api.post(
    "/employee/profile/education/3",
    data
  );
  return getData(response);
};

export const saveEducationStep4 = async (data) => {
  const response = await api.post(
    "/employee/profile/education/4",
    data
  );
  return getData(response);
};

export const saveEducationStep5 = async (data) => {
  const response = await api.post(
    "/employee/profile/education/5",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return getData(response);
};

export const saveServiceStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/service_info/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return getData(response);
};

export const saveServiceStep2 = async (data) => {
  const response = await api.post(
    "/employee/profile/service_info/2",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return getData(response);
};


export const saveServiceStep3 = async (data) => {
  const response = await api.post(
    "/employee/profile/service_info/3",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return getData(response);
};


export const savePaymentStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/payment_info/1",
    data
  );
  return getData(response);   // ✅
};

export const savePaymentStep2 = async (data) => {
  const response = await api.post(
    "/employee/profile/payment_info/2",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return getData(response);  
};

export const savePaymentStep3 = async (data) => {
  const response = await api.post(
    "/employee/profile/payment_info/3",
    data
  );
  return getData(response);  
};

export const savePaymentStep4 = async (data) => {
  const response = await api.post(
    "/employee/profile/payment_info/4",
    data
  );
  return getData(response);  
};

export const savePaymentStep5 = async (data) => {
  const response = await api.post(
    "/employee/profile/payment_info/5",
    data
  );
  return getData(response);   
};


export const saveTransferStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/transfer_info/1",
    data
  );
  return getData(response);
};

export const saveDiscussionStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/discussion_info/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return getData(response);
};

export const saveDiscussionStep2 = async (data) => {
  const response = await api.post(
    "/employee/profile/discussion_info/2",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return getData(response);  
};

export const saveDiscussionStep3 = async (data) => {
  const response = await api.post(
    "/employee/profile/discussion_info/3",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return getData(response);
};


export const saveDiscussionStep4 = async (data) => {
  const response = await api.post(
    "/employee/profile/discussion_info/4",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return getData(response);
};

export const saveServiceBookStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/service_book/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return getData(response);
};

export const saveMedicalStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/medical_conditions/1",
    data
  );
   return getData(response);
};

export const savePromotionStep1 = async (data) => {
  const response = await api.post(
    "/employee/profile/promotion_info/1",
    data
  );
    return getData(response);
};

export const saveServiceExtension = async (data) => {
  const response = await api.post(
    "/employee/profile/service_extension_info/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
    return getData(response);
};

export const saveDisabilityInfo = async (data) => {
  const response = await api.post(
    "/employee/profile/disability_info/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
    return getData(response);
};

export const saveGroupInsurance = async (data) => {
  const response = await api.post(
    "/employee/profile/group_insurance/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
    return getData(response);
};

export const saveAdvanceInfo = async (data) => {
  const response = await api.post(
    "/employee/profile/advances_info/1",
    data
  );
    return getData(response);
};

export const saveCertificateInfo = async (data) => {
  const response = await api.post(
    "/employee/profile/certificate_info/1",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  getData(response);
};