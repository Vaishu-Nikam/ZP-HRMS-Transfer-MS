// import api from './api';

// const getData = (response) => response.data.data || response.data;

// // --- Districts ---

// export const getDistricts = async (params) => {
//     const response = await api.get('/masters/districts', { params });
//     return getData(response);
// };

// export const getDistrictById = async (id, params) => {
//     const response = await api.get(`/masters/districts/${id}`, { params });
//     return getData(response);
// };

// export const createDistrict = async (data) => {
//     const response = await api.post('/masters/districts', data);
//     return getData(response);
// };

// export const updateDistrict = async (id, data) => {
//     const response = await api.put(`/masters/districts/${id}`, data);
//     return getData(response);
// };

// export const deleteDistrict = async (id) => {
//     await api.delete(`/masters/districts/${id}`);
// };


// // --- Departments ---

// export const getDepartments = async (params) => {
//     const response = await api.get('/masters/departments', { params });
//     return getData(response);
// };

// export const getDepartmentById = async (id, params) => {
//     const response = await api.get(`/masters/departments/${id}`, { params });
//     return getData(response);
// };

// export const createDepartment = async (data) => {
//     const response = await api.post('/masters/departments', data);
//     return getData(response);
// };

// export const updateDepartment = async (id, data) => {
//     const response = await api.put(`/masters/departments/${id}`, data);
//     return getData(response);
// };

// export const deleteDepartment = async (id) => {
//     await api.delete(`/masters/departments/${id}`);
// };



//  MASTER SERVICE (LOCAL STORAGE BASED)

// -------------------- DISTRICTS --------------------

const DISTRICT_KEY = "districts";

export const getDistricts = async () => {
  const data = JSON.parse(localStorage.getItem(DISTRICT_KEY)) || [];
  return {
    districts: data,
    pagination: { totalPages: 1, total: data.length }
  };
};

export const getDistrictById = async (id) => {
  const data = JSON.parse(localStorage.getItem(DISTRICT_KEY)) || [];
  return data.find((d) => d.district_id == id);
};

export const createDistrict = async (payload) => {
  const data = JSON.parse(localStorage.getItem(DISTRICT_KEY)) || [];

  const newItem = {
    district_id: Date.now(),
    ...payload,
  };

  const updated = [...data, newItem];
  localStorage.setItem(DISTRICT_KEY, JSON.stringify(updated));

  return newItem;
};

export const updateDistrict = async (id, payload) => {
  let data = JSON.parse(localStorage.getItem(DISTRICT_KEY)) || [];

  data = data.map((item) =>
    item.district_id == id ? { ...item, ...payload } : item
  );

  localStorage.setItem(DISTRICT_KEY, JSON.stringify(data));

  return payload;
};

export const deleteDistrict = async (id) => {
  let data = JSON.parse(localStorage.getItem(DISTRICT_KEY)) || [];

  data = data.filter((item) => item.district_id !== id);

  localStorage.setItem(DISTRICT_KEY, JSON.stringify(data));

  return { success: true };
};



// -------------------- DEPARTMENTS --------------------

const DEPARTMENT_KEY = "departments";

export const getDepartments = async () => {
  const data = JSON.parse(localStorage.getItem(DEPARTMENT_KEY)) || [];
  return {
    departments: data,
    pagination: { totalPages: 1, total: data.length }
  };
};

export const getDepartmentById = async (id) => {
  const data = JSON.parse(localStorage.getItem(DEPARTMENT_KEY)) || [];
  return data.find((d) => d.department_id == id);
};

export const createDepartment = async (payload) => {
  const data = JSON.parse(localStorage.getItem(DEPARTMENT_KEY)) || [];

  const newItem = {
    department_id: Date.now(),
    ...payload,
  };

  const updated = [...data, newItem];
  localStorage.setItem(DEPARTMENT_KEY, JSON.stringify(updated));

  return newItem;
};

export const updateDepartment = async (id, payload) => {
  let data = JSON.parse(localStorage.getItem(DEPARTMENT_KEY)) || [];

  data = data.map((item) =>
    item.department_id == id ? { ...item, ...payload } : item
  );

  localStorage.setItem(DEPARTMENT_KEY, JSON.stringify(data));

  return payload;
};

export const deleteDepartment = async (id) => {
  let data = JSON.parse(localStorage.getItem(DEPARTMENT_KEY)) || [];

  data = data.filter((item) => item.department_id !== id);

  localStorage.setItem(DEPARTMENT_KEY, JSON.stringify(data));

  return { success: true };
};


// -------------------- CASTES --------------------

const CASTE_KEY = "castes";

export const getCastes = async () => {
  const data = JSON.parse(localStorage.getItem(CASTE_KEY)) || [];
  return {
    castes: data,
    pagination: { totalPages: 1, total: data.length }
  };
};

export const getCasteById = async (id) => {
  const data = JSON.parse(localStorage.getItem(CASTE_KEY)) || [];
  return data.find((c) => c.caste_id == id);
};

export const createCaste = async (payload) => {
  const data = JSON.parse(localStorage.getItem(CASTE_KEY)) || [];

  const newItem = {
    caste_id: Date.now(),
    ...payload,
  };

  const updated = [...data, newItem];
  localStorage.setItem(CASTE_KEY, JSON.stringify(updated));

  return newItem;
};

export const updateCaste = async (id, payload) => {
  let data = JSON.parse(localStorage.getItem(CASTE_KEY)) || [];

  data = data.map((item) =>
    item.caste_id == id ? { ...item, ...payload } : item
  );

  localStorage.setItem(CASTE_KEY, JSON.stringify(data));

  return payload;
};

export const deleteCaste = async (id) => {
  let data = JSON.parse(localStorage.getItem(CASTE_KEY)) || [];

  data = data.filter((item) => item.caste_id !== id);

  localStorage.setItem(CASTE_KEY, JSON.stringify(data));

  return { success: true };
};

// -------------------- CADRES --------------------

const CADRE_KEY = "cadres";

export const getCadres = async () => {
  const data = JSON.parse(localStorage.getItem(CADRE_KEY)) || [];
  return {
    cadres: data,
    pagination: { totalPages: 1, total: data.length }
  };
};

export const getCadreById = async (id) => {
  const data = JSON.parse(localStorage.getItem(CADRE_KEY)) || [];
  return data.find((c) => c.cadre_id == id);
};

export const createCadre = async (payload) => {
  const data = JSON.parse(localStorage.getItem(CADRE_KEY)) || [];

  const newItem = {
    cadre_id: Date.now(),
    ...payload,
  };

  const updated = [...data, newItem];
  localStorage.setItem(CADRE_KEY, JSON.stringify(updated));

  return newItem;
};

export const updateCadre = async (id, payload) => {
  let data = JSON.parse(localStorage.getItem(CADRE_KEY)) || [];

  data = data.map((item) =>
    item.cadre_id == id ? { ...item, ...payload } : item
  );

  localStorage.setItem(CADRE_KEY, JSON.stringify(data));

  return payload;
};

export const deleteCadre = async (id) => {
  let data = JSON.parse(localStorage.getItem(CADRE_KEY)) || [];

  data = data.filter((item) => item.cadre_id !== id);

  localStorage.setItem(CADRE_KEY, JSON.stringify(data));

  return { success: true };
};


// -------------------- DESIGNATIONS --------------------

const DESIGNATION_KEY = "designations";

export const getDesignations = async () => {
  const data = JSON.parse(localStorage.getItem(DESIGNATION_KEY)) || [];
  return {
    designations: data,
    pagination: { totalPages: 1, total: data.length }
  };
};

export const getDesignationById = async (id) => {
  const data = JSON.parse(localStorage.getItem(DESIGNATION_KEY)) || [];
  return data.find((d) => d.designation_id == id);
};

export const createDesignation = async (payload) => {
  const data = JSON.parse(localStorage.getItem(DESIGNATION_KEY)) || [];

  const newItem = {
    designation_id: Date.now(),
    ...payload,
  };

  const updated = [...data, newItem];
  localStorage.setItem(DESIGNATION_KEY, JSON.stringify(updated));

  return newItem;
};

export const updateDesignation = async (id, payload) => {
  let data = JSON.parse(localStorage.getItem(DESIGNATION_KEY)) || [];

  data = data.map((item) =>
    item.designation_id == id ? { ...item, ...payload } : item
  );

  localStorage.setItem(DESIGNATION_KEY, JSON.stringify(data));

  return payload;
};

export const deleteDesignation = async (id) => {
  let data = JSON.parse(localStorage.getItem(DESIGNATION_KEY)) || [];

  data = data.filter((item) => item.designation_id !== id);

  localStorage.setItem(DESIGNATION_KEY, JSON.stringify(data));

  return { success: true };
};


// -------------------- OFFICES --------------------

const OFFICE_KEY = "offices";

export const getOffices = async () => {
  const data = JSON.parse(localStorage.getItem(OFFICE_KEY)) || [];
  return {
    offices: data,
    pagination: { totalPages: 1, total: data.length }
  };
};

export const getOfficeById = async (id) => {
  const data = JSON.parse(localStorage.getItem(OFFICE_KEY)) || [];
  return data.find((o) => o.office_id == id);
};

export const createOffice = async (payload) => {
  const data = JSON.parse(localStorage.getItem(OFFICE_KEY)) || [];

  const newItem = {
    office_id: Date.now(),
    ...payload,
  };

  const updated = [...data, newItem];
  localStorage.setItem(OFFICE_KEY, JSON.stringify(updated));

  return newItem;
};

export const updateOffice = async (id, payload) => {
  let data = JSON.parse(localStorage.getItem(OFFICE_KEY)) || [];

  data = data.map((item) =>
    item.office_id == id ? { ...item, ...payload } : item
  );

  localStorage.setItem(OFFICE_KEY, JSON.stringify(data));

  return payload;
};

export const deleteOffice = async (id) => {
  let data = JSON.parse(localStorage.getItem(OFFICE_KEY)) || [];

  data = data.filter((item) => item.office_id !== id);

  localStorage.setItem(OFFICE_KEY, JSON.stringify(data));

  return { success: true };
};